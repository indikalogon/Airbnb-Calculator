require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const slugify = require('slugify');

// API Keys
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Unsplash Image Fetcher
async function getUnsplashImage(keyword) {
    try {
        const searchQuery = keyword.split(' ').slice(0, 2).join(' ');
        const fetch = (await import('node-fetch')).default;
        const res = await fetch(`https://api.unsplash.com/search/photos?query=vacation+rental+${searchQuery}&client_id=${UNSPLASH_KEY}&orientation=landscape&per_page=1`);
        const data = await res.json();
        
        if (data.results && data.results.length > 0) {
            return data.results[0].urls.regular;
        }
        return '/images/default-blog-cover.jpg'; 
    } catch (error) {
        console.error("Unsplash Error:", error);
        return '/images/default-blog-cover.jpg';
    }
}

// Gemini Content Generator
async function generateArticle(title) {
    // 100% Stable Global Model
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
    You are an expert American real estate investor, Airbnb superhost and Strategic SEO-optimized US Blog Artical Writer with 10 years of experience.
    Write a comprehensive, engaging, and highly informative blog post about: "${title}"
    
    CRITICAL INSTRUCTIONS FOR ADSENSE APPROVAL & SEO:
    1. The article MUST be within 1200 to 1500 words long.
    2. Write in a human, conversational tone (use words like "Well,", "To be honest,", "Here's the thing").
    3. Vary your sentence length. Do not sound robotic.
    4. Include a "Real-World Case Study" or exact numbers/calculations to provide high value.
    5. Include an FAQ section at the bottom.
    6. Format with clear Markdown headings (##, ###), bullet points, and bold text.
    7. Do not include a title at the very top (I will add it in the frontmatter). Just start with the introduction.
    8. End the post with a call-to-action encouraging the reader to use the "Rentcalo Host Free and ROI Calculators".
    9. Blog Artical MUST Writing around Short-Term Rent Investment
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}

// Main Automation Process
async function main() {
    const csvPath = path.join(__dirname, 'blog-titles.csv');
    const postsDir = path.join(__dirname, 'posts');

    if (!fs.existsSync(csvPath)) {
        console.log("Error: blog-titles.csv file not found!");
        return;
    }

    const csvData = fs.readFileSync(csvPath, 'utf8').split('\n');
    let targetIndex = -1;
    let targetTitle = '';

    for (let i = 1; i < csvData.length; i++) {
        const row = csvData[i].trim();
        if (row && row.endsWith(',Pending')) {
            targetIndex = i;
            targetTitle = row.replace(',Pending', '').trim();
            break;
        }
    }

    if (targetIndex === -1) {
        console.log("No pending articles found in the CSV. All done!");
        return;
    }

    console.log(`\n⏳ Generating article for: "${targetTitle}"... (This takes 30-60 seconds)`);

    try {
        const imageUrl = await getUnsplashImage(targetTitle);
        const content = await generateArticle(targetTitle);

        const slug = slugify(targetTitle, { lower: true, strict: true });
        const date = new Date().toISOString().split('T')[0];

        const markdownFile = `---
title: "${targetTitle}"
date: "${date}"
description: "Discover expert insights and a complete guide on ${targetTitle}. Learn how to maximize your short-term rental ROI with Rentcalo."
coverImage: "${imageUrl}"
---

${content}
`;

        if (!fs.existsSync(postsDir)) {
            fs.mkdirSync(postsDir);
        }
        
        fs.writeFileSync(path.join(postsDir, `${slug}.md`), markdownFile);
        console.log(`✅ Success! Article saved as ${slug}.md`);

        csvData[targetIndex] = `${targetTitle},Published`;
        fs.writeFileSync(csvPath, csvData.join('\n'));
        console.log(`✅ CSV updated. Next run will pick the next topic.\n`);
        
    } catch (error) {
        console.error("❌ An error occurred during generation:", error.message);
    }
}

main();