// React
import React from 'react';
// Import Router
import {DefaultRoute, NotFoundRoute, Route} from 'react-router'; 

// Import components
import Booklists from './src/app/components/Booklists/Booklists.jsx';
import Ownerlists from './src/app/components/Ownerlists/Ownerlists.jsx';

const routes = (
  <Route name='root' path='/' handler={Ownerlists} ignoreScrollBehavior>
    <Route name='owner' path='/:owner' handler={Ownerlists} ignoreScrollBehavior />
  </Route>
);

export default routes;