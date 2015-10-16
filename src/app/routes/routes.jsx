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
const routes = {
  client: (
    <Route name='root' handler={Application}>
      <Route name='AllUsersList' path='/browse/recommendations/lists/?' handler={AllUsersList} />
      <Route name='UserLists' path='/browse/recommendations/lists/:UserLists?/?' handler={UserLists} />
      <Route name='BookItemList' path='/browse/recommendations/lists/:UserLists/:id?/?' handler={BookItemList} />
    </Route>
  ),
  server: (
    <Route name='root' handler={Application}>
      <Route name='AllUsersList' path='/?' handler={AllUsersList} />
      <Route name='UserLists' path='/:UserLists?/?' handler={UserLists} />
      <Route name='BookItemList' path='/:UserLists/:id?/?' handler={BookItemList} />
    </Route>
  )
};

export default routes;
