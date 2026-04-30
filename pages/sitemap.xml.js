import { getAllPostSlugs } from '../lib/posts';

const EXTERNAL_DATA_URL = 'https://www.rentcalo.com';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     
     <!-- 1. ප්‍රධාන ස්ථාවර පිටු (Static Pages) -->
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/blog</loc>
       <changefreq>daily</changefreq>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/airbnb-arbitrage-calculator</loc>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/glamping-and-tiny-house-roi-calculator</loc>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>

     <!-- 2. ස්වයංක්‍රීයව එකතු වන Blog ලිපි (Dynamic Blog Posts) -->
     ${posts
       .map(({ params }) => {
         return `
       <url>
           <loc>${EXTERNAL_DATA_URL}/blog/${params.slug}</loc>
           <changefreq>weekly</changefreq>
           <priority>0.7</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  // ඔබගේ lib/posts.js එකෙන් සියලුම ලිපි වල Slugs ලබා ගැනීම
  const posts = getAllPostSlugs();

  // XML Sitemap එක නිර්මාණය කිරීම
  const sitemap = generateSiteMap(posts);

  // මෙය සාමාන්‍ය Web Page එකක් නොව XML ෆයිල් එකක් බව Browser එකට දැනුම් දීම
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {
  // getServerSideProps මගින් සියලු දේ සිදුවන බැවින් මෙහි කිසිවක් පෙන්වීමට අවශ්‍ය නැත
}