const config = {
	appTitle: 'NYPL | Booklists',
	appName: 'DGX Booklists',
	port: 3001,
	webpackDevServerPort: 3000,
	favIconPath: 'http://ux-static.nypl.org.s3-website-us-east-1.amazonaws.com/images/favicon.ico',
  alertsApiUrl: 'https://refinery.nypl.org/api/nypl/ndo/v0.1/content/alerts?filter%5Bscope%5D=all',
  api: {
    root: 'http://dev.refinery.aws.nypl.org',
    baseEndpoint: '/api/nypl/ndo/v0.1/book-lists',
    bookListUserEndpoint: '/book-list-users',
    fields: '',
    // default setting is loading five items at first
    pageSize: '&page[size]=5',
    pageNumber: '&page[number]=1',
    includes: '?include=list-items.item,user'
  },
  navTopLinks: [
    {
      id: '29a4b824-e084-4771-aafc-52b3586c5e49',
      link: {
        en: {
          text: 'browse',
          type: 'text-single'
        }
      },
      name: {
        en: {
          text: 'Browse',
          type: 'text-single'
        }
      },
      sort: 105,
      type: 'header-item'
    },
    {
      id: '925d1fa9-1138-403c-9990-38861902b02d',
      link: {
        en: {
          text: 'learn',
          type: 'text-single'
        }
      },
      name: {
        en: {
          text: 'Learn',
          type: 'text-single'
        }
      },
      sort: 106,
      type: 'header-item'
    },
    {
      id: '851ed351-08f5-43f0-9011-9c317f85f0ca',
      link: {
        en: {
          text: 'attend',
          type: 'text-single'
        }
      },
      name: {
        en: {
          text: 'Attend',
          type: 'text-single'
        }
      },
      sort: 107,
      type: 'header-item'
    },
    {
      id: '4bd4f525-3f5c-4c45-b7a7-0ee6bbd301e9',
      link: {
        en: {
          text: 'research',
          type: 'text-single'
        }
      },
      name: {
        en: {
          text: 'Research',
          type: 'text-single'
        }
      },
      sort: 108,
      type: 'header-item'
    },
    {
      id: 'df621833-4dd1-4223-83e5-6ad7f98ad26a',
      link: {
        en: {
          text: '//www.nypl.org/locations/map',
          type: 'text-single'
        }
      },
      name: {
        en: {
          text: 'Find Us',
          type: 'text-single'
        }
      },
      sort: 109,
      type: 'header-item'
    },
    {
      id: '1d9ea0ec-6ca3-4577-9dd1-e8de1f2a8bb1',
      link: {
        en: {
          text: 'give',
          type: 'text-single'
        }
      },
      name: {
        en: {
          text: 'Give',
          type: 'text-single'
        }
      },
      sort: 110,
      type: 'header-item'
    },
    {
      id: '13d95ad5-f117-4415-ba2c-5c0b9618984d',
      link: {
        en: {
          text: 'get-help',
          type: 'text-single'
        }
      },
      name: {
        en: {
          text: 'Get Help',
          type: 'text-single'
        }
      },
      sort: 111,
      type: 'header-item'
    }
  ],
  socialMediaLinks: {
    facebook: 'https://www.facebook.com/nypl',
    twitter: 'https://twitter.com/nypl',
    instagram: 'https://instagram.com/nypl',
    tumblr: 'http://nypl.tumblr.com/',
    youtube: 'https://www.youtube.com/user/NewYorkPublicLibrary',
    soundcloud: 'https://soundcloud.com/nypl'
  },
  donationLinks: [
    {
      url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=55&s_src=FRQ16ZZ_TNN',
      amount: '$55'
    },
    {
      url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=115&s_src=FRQ16ZZ_TNN',
      amount: '$115'
    },
    {
      url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=250&s_src=FRQ16ZZ_TNN',
      amount: '$250'
    },
    {
      url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=0&s_src=FRQ16ZZ_TNN',
      amount: 'Other'
    }
  ],
  metaTags: [
    {property: "og:type", content: 'website'},
    {property: "og:image:type", content: 'image/png'},
    // Just examples of width and height:
    {property: "og:image:width", content: '400'},
    {property: "og:image:height", content: '300'},
    {property: "og:site_name", content: 'Lists | The New York Public Library'},
    {name: "twitter:card", content: 'summary_large_image'},
    {name: "twitter:site", content: '@nypl'},
    {name: "twitter:creator", content: '@nypl'},
    {name: "twitter:title", content: 'List | The New York Public Library'}
  ]
};

export default config;
