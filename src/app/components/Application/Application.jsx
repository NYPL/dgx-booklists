// Import React Libraries
import React from 'react';

// Import Router
import { Router } from 'react-router';
import DocMeta from 'react-doc-meta';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import { Header, navConfig } from 'dgx-header-component';
import Footer from 'dgx-react-footer';

import utils from '../../utils/utils.js';

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
    let description = 'Love a good list? So do we. Peruse book, music, and movie recommendations from our librart staff.',
      pageTags = [
        // Required OG meta tags
        {property: "og:title", content: 'Lists | The New York Public Library'},
        {property: "og:url", content: 'http://www.nypl.org/books-music-dvds/recommendations/lists/'},
        {property: "og:image", content: ''},
        {property: "og:description", content: description},
        {name: "twitter:description", content: description},
        {name: "twitter:image", content: ''}
      ],
      tags = utils.metaTagUnion(pageTags);

    // Render the main components
    return (
      <div className='app-container'>
        <DocMeta tags={tags} />
        <Header navData={navConfig.current} />
        {this.props.children}
        <Footer id="footer" className="footer" />
      </div>
    );
  }
};


Application.defaultProps = {
  lang: 'en'
};

export default Application;
