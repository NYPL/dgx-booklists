// Import React Libraries
import React from 'react';

// Import Router
import Router from 'react-router';
import DocMeta from 'react-doc-meta';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
// import Footer from 'dgx-react-footer';

// Set up the handler for route
const RouteHandler = Router.RouteHandler,
  Link = Router.Link;

class Application extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  // Render DOM
  render () {
    let tags = [
      // Required OG meta tags
      {property: "og:title", content: 'Lists | The New York Public Library'},
      {property: "og:type", content: 'website'},
      {property: "og:url", content: 'http://www.nypl.org/browse/recommendations/lists/'},
      {property: "og:image", content: ''},
      {property: "og:image:type", content: 'image/png'},
      // Just examples of width and height:
      {property: "og:image:width", content: '400'},
      {property: "og:image:height", content: '300'},
      // Optional OG meta tags
      {property: "og:description", content: 'Love a good list? So do we. Peruse book, music, and movie recommendations from our librart staff.'},
      {property: "og:site_name", content: 'Lists | The New York Public Library'},
      {name: "twitter:card", content: 'summary_large_image'},
      {name: "twitter:site", content: '@nypl'},
      {name: "twitter:creator", content: '@nypl'},
      {name: "twitter:title", content: 'List | The New York Public Library'},
      {name: "twitter:description", content: 'Love a good list? So do we. Peruse book, music, and movie recommendations from our librart staff.'},
      {name: "twitter:image", content: ''}
    ];

    // Render the main components
    return (
      <div className='app-container'>
        <DocMeta tags={tags} />
        <Header />
        <RouteHandler />
        <Footer />
      </div>
    );
  }
};


Application.defaultProps = {
  lang: 'en'
};

export default Application;
