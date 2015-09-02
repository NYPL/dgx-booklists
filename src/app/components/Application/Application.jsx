// Import React Libraries
import React from 'react';

// Import Router
import Router from 'react-router';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import Header from '../Header/Header.jsx';
// import Footer from '../Footer/Footer.jsx';


// Set up the handler for route
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

// Create the class
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
      </div>
    );
  }
};


Application.defaultProps = {
  lang: 'en'
};

const styles = {
};

export default Application;
