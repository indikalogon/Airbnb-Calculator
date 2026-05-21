import Head from 'next/head';
import Link from 'next/link';
import { getAllPostSlugs, getPostData } from '../../lib/posts';

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug);
  return {
    props: {
      postData,
      slug: params.slug, 
    },
  };
}

export default function Post({ postData, slug }) {
  const domain = "https://www.rentcalo.com"; 
  const articleUrl = `${domain}/blog/${slug}`;
  const imageUrl = postData.coverImage ? `${domain}${postData.coverImage}` : `${domain}/images/default-blog-cover.jpg`;

  // යාවත්කාලීන කළ සම්පූර්ණ Article Schema එක
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "headline": postData.title,
    "description": postData.excerpt || postData.description,
    "image": [imageUrl],
    "datePublished": postData.date,
    "author": [{
      "@type": "Organization",
      "name": postData.author || "Rentcalo Research Team",
      "url": "https://www.rentcalo.com"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Rentcalo",
      "logo": {
        "@type": "ImageObject",
        "url": `${domain}/favicon-32x32.png`
      }
    }
  };

  return (
    <div className="bg-white text-gray-800 font-sans min-h-screen flex flex-col">
      <Head>
        <title>{postData.title} | Rentcalo Authority</title>
        <meta name="description" content={postData.excerpt || postData.description} />
        <link rel="canonical" href={articleUrl} />
        
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.excerpt || postData.description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="Rentcalo" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={postData.title} />
        <meta name="twitter:description" content={postData.excerpt || postData.description} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Schema Markup Injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-gradient-to-b from-blue-900 to-indigo-900 text-white pt-12 pb-16 px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="container mx-auto max-w-5xl mb-8">
          <Link href="/blog" className="text-blue-200 hover:text-white font-semibold flex items-center transition-colors w-fit">
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Back to all articles
          </Link>
        </div>
        
        <div className="container mx-auto max-w-5xl text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            {postData.title}
          </h1>
          <div className="text-blue-200 font-medium flex items-center justify-start space-x-6 text-sm md:text-base">
            <span className="flex items-center"><i className="fa-regular fa-calendar mr-2"></i>{postData.date}</span>
            <span className="flex items-center"><i className="fa-solid fa-pen-nib mr-2"></i>{postData.author || "Rentcalo Research Team"}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-5xl flex-grow">
        
        {postData.coverImage && (
          <div className="mb-14 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <img src={postData.coverImage} alt={postData.title} className="w-full h-auto object-cover max-h-[600px]" />
          </div>
        )}

        <div 
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />

        <div className="mt-24 bg-gray-900 text-white rounded-3xl p-10 text-center shadow-xl border border-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
            <h3 className="text-3xl font-bold mb-4 tracking-tight">Ready to run your numbers?</h3>
            <p className="text-gray-400 mb-8 text-lg">Stop guessing. Use our professional calculators to predict your exact ROI before investing.</p>
            <div className="flex flex-wrap justify-center gap-4">
                <Link href="/airbnb-arbitrage-calculator" className="bg-blue-600 hover:bg-blue-700 px-8 py-3.5 rounded-xl font-bold transition-all hover:-translate-y-1">Arbitrage Calculator</Link>
                <Link href="/glamping-and-tiny-house-roi-calculator" className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3.5 rounded-xl font-bold transition-all hover:-translate-y-1">Glamping Simulator</Link>
            </div>
        </div>
      </main>

      <style jsx global>{`
        .blog-content {
          font-family: 'Lora', Georgia, serif;
          font-size: 1.25rem; 
          line-height: 1.6; 
          color: #242424; 
          letter-spacing: -0.003em;
        }

        .blog-content h2, 
        .blog-content h3, 
        .blog-content h4 {
          font-family: 'Inter', sans-serif;
        }

        .blog-content h2 {
          font-size: 2.25rem; 
          font-weight: 800;
          color: #111827;
          line-height: 1.25;
          letter-spacing: -0.02em; 
          margin-top: 4rem;
          margin-bottom: 1.25rem;
        }

        .blog-content h3 {
          font-size: 1.75rem; 
          font-weight: 700;
          color: #1f2937;
          line-height: 1.3;
          letter-spacing: -0.01em;
          margin-top: 3rem;
          margin-bottom: 1rem;
        }

        .blog-content h4 {
          font-size: 1.375rem; 
          font-weight: 600;
          color: #374151;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }

        .blog-content p {
          margin-bottom: 2rem;
        }

        .blog-content ul, .blog-content ol {
          padding-left: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .blog-content ul {
          list-style-type: disc;
        }
        
        .blog-content ol {
          list-style-type: decimal;
        }
        
        .blog-content li {
          margin-bottom: 0.75rem;
          padding-left: 0.5rem;
        }

        .blog-content strong {
          color: #111827;
          font-weight: 700;
        }

        .blog-content blockquote {
          font-style: italic;
          border-left: 4px solid #2563eb;
          padding-left: 1.5rem;
          margin-left: 0;
          margin-right: 0;
          color: #4b5563;
          font-size: 1.375rem;
        }

        .blog-content img {
          display: block;
          margin-left: auto;
          margin-right: auto;
          margin-top: 3.5rem;
          margin-bottom: 3.5rem;
          border-radius: 1rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
          max-height: 600px;
          object-fit: cover;
        }

        .blog-content a {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-thickness: 1px;
          font-weight: 500;
          transition: all 0.2s ease-in-out;
        }
        
        .blog-content a:hover {
          color: #1e40af; 
          text-decoration-thickness: 2px;
        }
      `}</style>
    </div>
  );
}