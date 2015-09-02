// React
import React from 'react';
// Import Router
import {DefaultRoute, NotFoundRoute, Route} from 'react-router'; 

// Import components
import Application from './app/components/Application/Application.jsx'
import Booklists from './app/components/Booklists/Booklists.jsx';
import Ownerlists from './app/components/Ownerlists/Ownerlists.jsx';

const routes = (
  <Route name='root' path='/' handler={Application} ignoreScrollBehavior>
	  <Route name='booklists' path='/' handler={Booklists} ignoreScrollBehavior />
    <Route name='owner' path='/:owner' handler={Ownerlists} ignoreScrollBehavior />
  </Route>
);

export default routes;