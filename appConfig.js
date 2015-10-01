const config = {
	appTitle: 'NYPL | Booklists',
	appName: 'DGX Booklists',
	port: 3001,
	webpackDevServerPort: 3000,
	favIconPath: 'http://ux-static.nypl.org.s3-website-us-east-1.amazonaws.com/images/favicon.ico',
  api: {
    root: 'http://dev.refinery.aws.nypl.org',
    baseEndpoint: '/api/nypl/ndo/v0.1/book-lists',
    bookListUserEndpoint: '/book-list-users',
    fields: '',
    // default setting is loading five items at first
    pageSize: '&page[size]=5',
    pageNumber: '&page[number]=1',
    includes: '?include=list-items.item,user'
  }
};

export default config;
