let config = {
  title: `My Box`,
  author: 'kklyoon',
  description: "이것저것 모음",
  siteUrl: 'https://kklyoon.github.io',

  // header config
  titleLogo: () => {
    return require('./src/images/profile.png');
  },
  titleLogoShow: true,
  //bio: './conifg.js 에서 설정을 수정해주세요',
  //bioShow: true,

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
