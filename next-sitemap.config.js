/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.rentcalo.com',
  generateRobotsTxt: true, // robots.txt ගොනුව ස්වයංක්‍රීයව නිර්මාණය කරයි
  generateIndexSitemap: true, // කුඩා වෙබ් අඩවි සඳහා එක sitemap.xml එකක් පමණක් සෑදීමට
  trailingSlash: false, // Redirect errors වළක්වා ගැනීමට මෙය අත්‍යවශ්‍යයි
  outDir: 'public', // Sitemap එක public ෆෝල්ඩරයට යැවීමට
  exclude: ['/404', '/500'], // Error pages sitemap එකෙන් ඉවත් කිරීමට
  
  // පිටු අනුව Priority එක සහ Change Frequency එක වෙනස් කිරීම
  transform: async (config, path) => {
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/blog') {
      priority = 0.9;
      changefreq = 'daily';
    } else if (path.includes('/blog/')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.includes('-calculator')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else {
        priority = 0.7;
        changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq: changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
}