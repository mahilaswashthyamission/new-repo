/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mahilaswashthyamission.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/studio/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/'],
      },
    ],
  },
};
