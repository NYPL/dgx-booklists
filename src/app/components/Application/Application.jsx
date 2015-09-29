// Import React Libraries
import React from 'react';

// Import Router
import Router from 'react-router';

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
    // Render the main components
    return (
      <div className='app-container'>
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
