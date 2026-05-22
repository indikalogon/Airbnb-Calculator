import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';

// 1. පිටුව හැදෙන වෙලාවෙම (Build time) ලිපි ටික අරගැනීම
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

// 2. Blog පිටුවේ නව Premium සැලසුම
export default function Blog({ allPostsData }) {
  // SEO Schema Markup (Blog Collection)
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Insights & Guides",
    "url": "https://www.rentcalo.com/blog",
    "description": "Expert advice, tax guides, and financial strategies for short-term rental hosts and real estate investors.",
    "publisher": {
      "@type": "Organization",
      "name": "Rentcalo"
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen pb-20">
      <Head>
        <title>Short-Term Rental Insights & Guides | Rentcalo</title>
        <meta name="description" content="Expert guides on Airbnb arbitrage, glamping ROI, and short-term rental property management." />
        <link rel="canonical" href="https://www.rentcalo.com/blog" />
        {/* FontAwesome for icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        {/* Schema Injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
      </Head>

      {/* Header Section (Modern Gradient) */}
      <div className="bg-gradient-to-b from-blue-900 to-indigo-900 text-white py-20 px-4 text-center">
        <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 inline-block shadow-md uppercase tracking-wider">
          Investor Hub
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Insights & Guides
        </h1>
        <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto">
          Master the business of short-term rentals. Data-driven strategies, ROI breakdowns, and market analysis for modern hosts.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="container mx-auto px-4 max-w-5xl -mt-10 relative z-10">
        {/* lg:grid-cols-3 දැමූ බැවින් දැන් කාඩ්පත් 3ක් එක පේළියට පෙන්වයි */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* මෙහි coverImage යන්නද එකතු කර ඇත */}
          {allPostsData.map(({ slug, date, title, excerpt, coverImage }) => (
            <Link href={`/blog/${slug}`} key={slug}>
              <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col h-full cursor-pointer relative">
                
                {/* Glassmorphism Gradient Background overlay (Subtle effect on hover) */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/40 to-purple-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

                {/* Image Section with Hover Zoom */}
                <div className="relative h-56 w-full overflow-hidden z-10 bg-gray-200">
                  <img 
                    src={coverImage || '/images/default-blog-cover.jpg'} 
                    alt={title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-blue-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    <i className="fa-regular fa-calendar mr-1.5"></i>
                    {date}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow z-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                    {excerpt}
                  </p>
                  
                  {/* Read More Button Area */}
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-blue-600 font-semibold text-sm group-hover:text-blue-800 transition-colors">
                      Read Article
                    </span>
                    <span className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
                      <i className="fa-solid fa-arrow-right text-sm"></i>
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          ))}

        </div>

        {/* ලිපි කිසිවක් නොමැති නම් පෙන්වන කොටස */}
        {allPostsData.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 mt-10">
            <i className="fa-solid fa-pen-fancy text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-700">Articles are on the way!</h3>
            <p className="text-gray-500 mt-2">Our auto-generator is crafting the first post.</p>
          </div>
        )}

      </div>
    </div>
  );
}