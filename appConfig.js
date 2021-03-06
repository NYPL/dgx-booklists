const config = {
  appTitle: 'NYPL | Booklists',
  appName: 'DGX Booklists',
  port: 3001,
  webpackDevServerPort: 3000,
  favIconPath: 'http://d2znry4lg8s0tq.cloudfront.net/images/favicon.ico',
  api: {
    root: {
      development: 'https://dev-refinery.nypl.org',
      qa: 'https://qa-refinery.nypl.org',
      production: 'https://refinery.nypl.org',
    },
    baseEndpoint: '/api/nypl/ndo/v0.1/book-lists',
    bookListUserEndpoint: '/book-list-users',
    fields: '',
    // default setting is loading five items at first
    pageSize: '&page[size]=5',
    pageNumber: '&page[number]=1',
    includes: ['list-items.item', 'user'],
  },
  metaTags: [
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:image:type',
      content: 'image/png',
    },
    {
      property: 'og:image:width',
      content: '400',
    }, {
      property: 'og:image:height',
      content: '300',
    }, {
      property: 'og:site_name',
      content: 'Lists | The New York Public Library',
    }, {
      name: 'twitter:card',
      content: 'summary_large_image',
    }, {
      name: 'twitter:site',
      content: '@nypl',
    }, {
      name: 'twitter:creator',
      content: '@nypl',
    },
  ],
};

export default config;
