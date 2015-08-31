// React
import React from 'react';
// Import Router
import {DefaultRoute, NotFoundRoute, Route} from 'react-router'; 

// Import components
import Booklists from './src/app/components/Booklists/Booklists.jsx';
import Owner from './src/app/components/Owner/Owner.jsx';

const routes = (
  <Route name='root' path='/' handler={Booklists} ignoreScrollBehavior>
    <Route name='owner' path='/nypl_bronx_library_ctr' handler={Owner} ignoreScrollBehavior />
  </Route>
);

export default routes;