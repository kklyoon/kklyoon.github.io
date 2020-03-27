require('dotenv').config();
const config = require('./config');

module.exports = {
  siteMetadata: {
    title: config.title,
    author: config.author,
    description: config.description,
    siteUrl: config.siteUrl,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-sass`,
      options: {},
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/_posts`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
            },
          },
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              active: true,
              class: 'emoji-icon',
              size: 64,
              styles: {
                display: 'inline',
                margin: '0',
                'margin-top': '1px',
                position: 'relative',
                top: '5px',
                width: '25px',
              },
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-robots-txt',
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: config.googleAnalyticsTrackingId,
      },
    },
    // {
    //   resolve: "gatsby-plugin-firebase",
    //   options: {
    //     features: {
    //       auth: false,
    //       database: false,
    //       firestore: false,
    //       storage: false,
    //       messaging: false,
    //       functions: true,
    //     },
    //   },
    // },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          authDomain: "kklyoon-github-io.firebaseapp.com",
          databaseURL: "https://kklyoon-github-io.firebaseio.com",
          projectId: "kklyoon-github-io",
          storageBucket: "kklyoon-github-io.appspot.com",
          messagingSenderId: "931868777399",
          appId: "1:931868777399:web:3fc9f49e9509942c15a632",
          measurementId: "G-S25Y2JCZ8H"
        }
      }
    }
  ],
};
