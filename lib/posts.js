import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 'posts' ෆෝල්ඩරය තිබෙන තැන සොයාගැනීම
const postsDirectory = path.join(process.cwd(), 'posts');

// 1. බ්ලොග් පිටුවේ පෙන්වීමට ලිපි සියල්ල පිළිවෙළට ගැනීම (Date Sorting)
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // ෆයිල් එකේ නමින් '.md' කෑලී අයින් කරලා URL එකට ගැළපෙන නම (id) හැදීම
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // gray-matter මඟින් ලිපියේ Title එක, Date එක වෙන් කිරීම
    const matterResult = matter(fileContents);

    return {
      slug,
      // UI එකට අවශ්‍ය excerpt සහ coverImage ආරක්ෂිතව (safely) ලබා දීම
      excerpt: matterResult.data.description || matterResult.data.excerpt || 'No description available for this article.',
      coverImage: matterResult.data.coverImage || '/images/default-blog-cover.jpg',
      ...matterResult.data,
    };
  });

  // අලුත්ම ලිපිය උඩින්ම පෙන්වීමට දින අනුව පෙළගැස්වීම (Sort by Date)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 2. Next.js වෙත මුළු ලිපි ගණන සහ ඒවායේ ලින්ක් (Slugs) යැවීම
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// 3. එක ලිපියක් මත ක්ලික් කළ විට එහි සම්පූර්ණ අන්තර්ගතය HTML බවට පත් කිරීම
export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  // Markdown අකුරු HTML බවට හැරවීම (remark-html භාවිතයෙන්)
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    excerpt: matterResult.data.description || matterResult.data.excerpt || '',
    coverImage: matterResult.data.coverImage || '/images/default-blog-cover.jpg',
    ...matterResult.data,
  };
}