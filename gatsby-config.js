require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config = require('./src/config');

const learnQuery = `
{
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
          description
        }
        fields {
          slug
        }
        html
      }
    }
  }
}`;

// Note we are not able to get HTML because it exceeds the community limit for data.
// AlgoliaSearchError  Record at the position 38 is too big size=51151 bytes. Contact us if you need an extended quota
const flatten = arr =>
  arr.map(({ node: { frontmatter, fields } }) => ({
    ...frontmatter,
    ...fields,
  }));
const queries = [
  {
    indexName: `Learn`,
    query: learnQuery,
    transformer: ({ data }) => flatten(data.allMarkdownRemark.edges),
  },
];

module.exports = {
  pathPrefix: process.env.PATH_PREFIX,
  siteMetadata: {
    title: config.title,
    description: config.description,
    featuredImage: config.featuredImage,
    siteUrl: config.siteUrl,
    siteUrlNoSlash: config.siteUrlNoSlash,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries,
        chunkSize: 1000,
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: config.siteUrl,
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'learn',
        path: `${__dirname}/src/documentation/`,
        include: ['**/*.md'], // ignore files starting with a dot
      },
    },

    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.title,
        shortName: config.title,
        startUrl: config.siteUrlNoSlash,
        backgroundColor: config.color,
        themeColor: config.color,
        display: config.display,
        icon: config.icon,
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: '125',
              icon:
                '<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>',
              className: 'autolink-headers',
              maintainCase: false,
              removeAccents: true,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: { js: 'javascript', sh: 'shell', txt: 'text' },
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        siteUrl: config.siteUrlNoSlash,
        output: '/sitemap.xml',
      },
    },
    {
      resolve: 'gatsby-plugin-emotion',
    },
  ],
};
