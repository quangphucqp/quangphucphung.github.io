import { GatsbyConfig } from 'gatsby';
import { GOOGLE_ANALYTICS_ID } from './src/config/analytics';
import { siteMetadata } from './src/data/siteMetadata';

const gatsbyConfig: GatsbyConfig = {
  siteMetadata,

  flags: {
    // Use DEV_SSR to debug the SSR related issues locally (i.e. hydration related ones).
    DEV_SSR: false,
  },

  plugins: [
    // @see: https://www.gatsbyjs.com/plugins/gatsby-plugin-postcss/
    'gatsby-plugin-postcss',

    // @see: https://www.gatsbyjs.com/plugins/gatsby-plugin-image/
    'gatsby-plugin-image',

    // @see: https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/
    'gatsby-plugin-react-helmet',

    // @see: https://www.npmjs.com/package/gatsby-plugin-sharp
    'gatsby-plugin-sharp',

    // @see: https://www.gatsbyjs.com/plugins/gatsby-transformer-sharp/
    {
      resolve: 'gatsby-transformer-sharp',
      options: {
        // Suppress the "You can't use childImageSharp together with 02-demo.gif —
        // use publicURL instead." warning.
        checkSupportedExtensions: false,
      },
    },

    // @see: https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },

    // @see: https://www.gatsbyjs.com/plugins/gatsby-plugin-google-gtag/
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        // You can add multiple tracking ids and a page-view event will be fired for all of them.
        trackingIds: [
          GOOGLE_ANALYTICS_ID,
        ],
      },
    },
  ],
};

export default gatsbyConfig;
