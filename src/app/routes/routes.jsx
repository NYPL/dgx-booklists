// React libraries
import React from 'react';
// Import Router
import {DefaultRoute, NotFoundRoute, Route} from 'react-router'; 

// Import components
import Application from '../components/Application/Application.jsx'
import AllUsersList from '../components/AllUsersList/AllUsersList.jsx';
import UserLists from '../components/UserLists/UserLists.jsx';
import BookItemList from '../components/BookItemList/BookItemList.jsx';

// Routes we need
const routes = (
  <Route name='root' handler={Application} ignoreScrollBehavior>
	  <Route name='AllUsersList' path='/' handler={AllUsersList} ignoreScrollBehavior />
    <Route name='UserLists' path='/:UserLists?/?' handler={UserLists} ignoreScrollBehavior />
    <Route name='BookItemList' path='/:UserLists/:id?/?' handler={BookItemList} ignoreScrollBehavior />
  </Route>
);

export default routes;
