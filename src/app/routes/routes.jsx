// React libraries
import React from 'react';
// Import Router
import {DefaultRoute, NotFoundRoute, Route} from 'react-router'; 
// Import components
import Application from '../components/Application/Application.jsx'
import Booklists from '../components/Booklists/Booklists.jsx';
import Ownerlists from '../components/Ownerlists/Ownerlists.jsx';
import Singlelist from '../components/Singlelist/Singlelist.jsx';

// Routes we need
const routes = (
  <Route name='root' handler={Application} ignoreScrollBehavior>
	  <Route name='booklists' path='/' handler={Booklists} ignoreScrollBehavior />
    <Route name='ownerlists' path='/:ownerlists' handler={Ownerlists} ignoreScrollBehavior />
    <Route name='singlelist' path='/:ownerlists/:id' handler={Singlelist} ignoreScrollBehavior />
  </Route>
);

export default routes;