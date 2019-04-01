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
  googleAnalyticsTrackingId: 'UA-137430673-1',
  disqusShortname: 'kklyoon',
};

/********************************************** */

if (process.env.NODE_ENV === 'development') {
  config.googleAnalyticsTrackingId = '';        // 개발 모드일땐 트래킹 및 disqus 비활성화
  config.disqusShortname = '';
}

module.exports = config;
