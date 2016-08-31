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
    <Route component={Application}>
      <Route path='/books-music-dvds/recommendations/lists' component={AllUsersList} />
      <Route path='/books-music-dvds/recommendations/lists/:UserLists' component={UserLists} />
      <Route path='/books-music-dvds/recommendations/lists/:UserLists/:id' component={BookItemList} />
    </Route>
  ),
  server: (
    <Route component={Application}>
      <Route path='/' component={AllUsersList} />
      <Route path='/:UserLists' component={UserLists} />
      <Route path='/:UserLists/:id' component={BookItemList} />
    </Route>
  )
};

export default routes;
