import Head from 'next/head';
import Link from 'next/link';
import { getAllPostSlugs, getPostData } from '../../lib/posts';

// 1. තියෙන ලිපි ඔක්කොගෙම ලින්ක් (Slugs) ටික හොයාගෙන පිටු සූදානම් කිරීම
export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false, // නොමැති ලින්ක් එකකට ගියොත් 404 Page එක පෙන්වීමට
  };
}

// 2. ක්ලික් කරපු ලින්ක් එකට අදාළ ලිපියේ සම්පූර්ණ විස්තරය (HTML) අරගැනීම
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug);
  return {
    props: {
      postData,
    },
  };
}

// 3. ලිපිය පෙන්වන අච්චුව (Article Template)
export default function Post({ postData }) {
  return (
    <div className="bg-white text-gray-800 font-sans min-h-screen">
      <Head>
        <title>{postData.title} | Rentcalo Authority</title>
        <meta name="description" content={postData.excerpt} />
        {/* SEO සඳහා අමතර Tags */}
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.excerpt} />
        {postData.coverImage && <meta property="og:image" content={`https://rentcalo.com${postData.coverImage}`} />}
      </Head>

      <main className="container mx-auto px-4 py-12 max-w-4xl mt-4">
        {/* Back Button */}
        <div className="mb-10">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-bold flex items-center transition-colors bg-blue-50 w-fit px-4 py-2 rounded-lg">
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Back to all articles
          </Link>
        </div>

        {/* Article Header */}
        <article className="max-w-none">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {postData.title}
            </h1>
            <div className="text-gray-500 font-medium flex items-center justify-center space-x-6 text-sm md:text-base border-b border-gray-100 pb-8">
              <span className="flex items-center"><i className="fa-regular fa-calendar text-blue-500 mr-2 text-lg"></i>{postData.date}</span>
              {postData.author && <span className="flex items-center"><i className="fa-solid fa-pen-nib text-blue-500 mr-2 text-lg"></i>{postData.author}</span>}
            </div>
          </header>

          {/* Cover Image */}
          {postData.coverImage && (
            <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <img src={postData.coverImage} alt={postData.title} className="w-full h-auto object-cover max-h-[550px]" />
            </div>
          )}

          {/* Markdown එකෙන් හැදුණු HTML අන්තර්ගතය මෙතැනට Load වේ */}
          <div 
            className="blog-content text-gray-700 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
          />
        </article>

        {/* Call to Action (සෑම ලිපියක් යටින්ම අමතරව පෙන්වීම) */}
        <div className="mt-16 bg-gray-900 text-white rounded-2xl p-8 text-center shadow-xl border border-gray-800">
            <h3 className="text-2xl font-bold mb-3">Ready to run your numbers?</h3>
            <p className="text-gray-400 mb-6">Stop guessing. Use our professional calculators to predict your exact ROI before investing.</p>
            <div className="flex flex-wrap justify-center gap-4">
                <Link href="/airbnb-arbitrage-calculator" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition-colors">Arbitrage Calculator</Link>
                <Link href="/glamping-and-tiny-house-roi-calculator" className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-xl font-bold transition-colors">Glamping Simulator</Link>
            </div>
        </div>
      </main>

      {/* Blog Typography Styles (Markdown අකුරු ලස්සන කිරීමට) */}
      <style jsx global>{`
        .blog-content h2 {
          font-size: 2.25rem;
          font-weight: 800;
          color: #111827;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .blog-content p {
          margin-bottom: 1.75rem;
        }
        .blog-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.75rem;
        }
        .blog-content li {
          margin-bottom: 0.75rem;
        }
        .blog-content strong {
          color: #111827;
          font-weight: 800;
        }
        .blog-content img {
          border-radius: 1rem;
          margin: 2.5rem auto;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .blog-content a {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 4px;
          font-weight: 600;
        }
        .blog-content a:hover {
          color: #1d4ed8;
        }
      `}</style>
    </div>
  );
}