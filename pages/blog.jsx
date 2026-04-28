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

// 2. Blog පිටුවේ සැලසුම
export default function Blog({ allPostsData }) {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
      <Head>
        <title>Short-Term Rental Insights & Guides | Rentcalo</title>
        <meta name="description" content="Expert guides on Airbnb arbitrage, glamping ROI, and short-term rental property management." />
        <link rel="canonical" href="https://rentcalo.com/blog" />
      </Head>

      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-16">
          <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 inline-block shadow-md">Investor Hub</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Insights & Guides
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master the business of short-term rentals. Data-driven strategies, ROI breakdowns, and market analysis for modern hosts.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allPostsData.map(({ slug, date, title, excerpt }) => (
            <article 
              key={slug} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="p-8 flex flex-col flex-grow">
                <div className="text-sm text-blue-600 font-semibold mb-3">
                  <i className="fa-regular fa-calendar mr-2"></i>
                  {date}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  <Link href={`/blog/${slug}`} className="hover:text-blue-600 transition-colors">
                    {title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                  {excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link 
                    href={`/blog/${slug}`} 
                    className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors group"
                  >
                    Read Full Article
                    <i className="fa-solid fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}