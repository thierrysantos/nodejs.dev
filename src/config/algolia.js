exports.appId = process.env.ALGOLIA_APP_ID || process.env.GATSBY_ALGOLIA_APP_ID;
exports.adminKey =
  process.env.ALGOLIA_ADMIN_KEY || process.env.GATSBY_ALGOLIA_ADMIN_KEY;
exports.searchKey =
  process.env.ALGOLIA_SEARCH_KEY || process.env.GATSBY_ALGOLIA_SEARCH_KEY;
exports.apiKey = exports.searchKey || exports.adminKey;
exports.indexName =
  process.env.ALGOLIA_INDEX_NAME || process.env.GATSBY_ALGOLIA_INDEX_NAME;
exports.indexPrefix = `${process.env.ALGOLIA_INDEX_PREFIX ||
  process.env.GATSBY_ALGOLIA_INDEX_PREFIX ||
  exports.indexName ||
  `NodeJS_DEV`}`.replace(/_$/, '');

// exports.indexName = `${exports.indexPrefix}/`;
// exports.indexNames = {
//   learn: `${exports.indexPrefix}/learn/`,
//   docs: `${exports.indexPrefix}/docs/`,
//   download: `${exports.indexPrefix}/download/`,
//   blog: `${exports.indexPrefix}/blog/`,
// };
