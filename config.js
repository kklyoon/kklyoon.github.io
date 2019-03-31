let config = {
  title: `My training box`,
  author: 'kklyoon',
  description: "For study",
  siteUrl: 'https://kklyoon.github.io',

  // header config
  titleLogo: () => {
    return require('./src/images/profile.jpg');
  },
  titleLogoShow: true,
  bio: 'Archive',
  bioShow: true,

  // addtional
  googleAnalyticsTrackingId: '',
  disqusShortname: '',
};

/********************************************** */

if (process.env.NODE_ENV === 'development') {
  config.googleAnalyticsTrackingId = '';
  config.disqusShortname = '';
}

module.exports = config;
