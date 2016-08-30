// Import libraries
import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import appConfig from '../../../appConfig.js';
const { api } = appConfig;

// Set up variables for routing and its options
const router = express.Router();
const appEnvironment = process.env.APP_ENV || 'production';
const apiRoot = api.root[appEnvironment];
const listOptions = {
  endpoint: '',
  includes: [],
};

/**
* BookListUsers(req, res, next)
* This route is for rendering the page of AllUsersList.
* It utilizes the method of promise.
*
* @param (HTTP methods) req
* @param (HTTP methods) res
* @param (Express function) next - call the next function after the previous function has coompleted
*/
function BookListUsers(req, res, next) {
  listOptions.endpoint = `${apiRoot}${api.baseEndpoint}${api.bookListUserEndpoint}`;
  listOptions.includes = [];
  const completeApiUrl = parser.getCompleteApi(listOptions);

  axios
    .get(completeApiUrl)
    .then((allUsersList) => {
      // Booklist data
      const returnedData = allUsersList.data;
      const parsed = parser.parse(returnedData, listOptions);

      res.locals.data = {
        HeaderStore: {
          subscribeFormVisible: false,
          myNyplVisible: false,
        },
        ListStore: {
          allUsersList: parsed,
        },
        completeApiUrl,
      };

      next();
    })
    // console error messages
    .catch(error => {
      console.log('Error calling API BookListUsers: ' + error);
      res.locals.data = {
        HeaderStore: {
          subscribeFormVisible: false,
          myNyplVisible: false,
        },
        ListStore: {
          allUsersList: [],
          errorInfo: error.data.errors[0],
        },
        completeApiUrl: '',
      };
      next();
    }); // end Axios call
}

/**
* BookListUser(req, res, next)
* This route is for rendering the page of UserLists.
* It utilizes the method of promise.
*
* @param (HTTP methods) req
* @param (HTTP methods) res
* @param (Express function) next - call the next function after the previous function has coompleted
*/
function BookListUser(req, res, next) {
  const username = req.params.username;
  listOptions.endpoint = `${apiRoot}${api.baseEndpoint}${api.bookListUserEndpoint}/` +
        `${username}/links/book-lists`;
  listOptions.includes = api.includes;
  const completeApiUrl = parser.getCompleteApi(listOptions, `${api.pageSize}${api.pageNumber}`);

  axios
    .get(completeApiUrl)
    .then((userListsData) => {
      // Booklist data
      const returnedData = userListsData.data;
      const parsed = parser.parse(returnedData, listOptions);
      const listsNumber = returnedData.meta.count || 0;

      // Put the parsed data into Store
      res.locals.data = {
        HeaderStore: {
          subscribeFormVisible: false,
          myNyplVisible: false,
        },
        ListStore: {
          userLists: parsed,
          listsNumber,
        },
        completeApiUrl,
      };
      next();
    })
    .catch(error => {
      console.log('Error calling API BookListUser: ' + error.error);
      res.locals.data = {
        HeaderStore: {
          subscribeFormVisible: false,
          myNyplVisible: false,
        },
        ListStore: {
          userLists: [],
          listsNumber: 0,
          errorInfo: error.data.errors[0],
        },
        completeApiUrl: '',
      };
      next();
    }); // end Axios call
}

/**
* ListID(req, res, next)
* This route is for rendering the page of BookItemList.
* It utilizes the method of promise.
*
* @param (HTTP methods) req
* @param (HTTP methods) res
* @param (Express function) next - call the next function after the previous function has coompleted
*/
function ListID(req, res, next) {
  const listID = req.params.listID;
  listOptions.endpoint = `${apiRoot}${api.baseEndpoint}/${listID}`;
  listOptions.includes = api.includes;
  const completeApiUrl = parser.getCompleteApi(listOptions);

  axios
    .get(completeApiUrl)
    .then((userList) => {
      // Booklist data
      const returnedData = userList.data;
      const parsed = parser.parse(returnedData, listOptions);

      res.locals.data = {
        HeaderStore: {
          subscribeFormVisible: false,
          myNyplVisible: false,
        },
        ListStore: {
          bookItemList: parsed,
        },
        completeApiUrl,
      };
      next();
    })
    .catch(error => {
      console.log('Error calling API ListID: ' + error);
      res.locals.data = {
        HeaderStore: {
          subscribeFormVisible: false,
          myNyplVisible: false,
        },
        ListStore: {
          bookItemList: {},
          errorInfo: error.data.errors[0],
        },
        completeApiUrl: ''
      };
      next();
    }); // end Axios call
}

/**
* AjaxBookListUser(req, res)
* The AJAX call for internal browsing to the page of UserLists.
* It utilizes the method of promise.
*
* @param (HTTP methods) req
* @param (HTTP methods) res
*/
function AjaxBookListUser(req, res) {
  const username = req.params.username;
  const pageSize = `&page[size]=${req.params.pageSize}`;
  const pageNumber = `&page[number]=${req.params.pageNumber}`;
  listOptions.endpoint = `${apiRoot}${api.baseEndpoint}${api.bookListUserEndpoint}/` +
      `${username}/links/book-lists`;
  listOptions.includes = api.includes;
  const completeApiUrl = parser.getCompleteApi(listOptions, `${pageSize}${pageNumber}`);

  axios
    .get(completeApiUrl)
    .then((data) => {
      const returnedData = data.data;
      const parsed = parser.parse(returnedData, listOptions);
      const listsNumber = returnedData.meta.count || 0;

      // Return the data as a JSON, it will be updated to Store at UserLists component
      res.json({
        user: username,
        data: parsed,
        listsNumber: listsNumber
      });
    })
    .catch(error => {
      console.log('Error calling API: AjaxBookListUser');
      res.json({
        errorInfo: error.data.errors[0]
      });
    }); // end Axios call
}

/**
* AjaxListID(req, res)
* The AJAX call for internal browsing to the page of BookItemList.
* It utilizes the method of promise.
*
* @param (HTTP methods) req
* @param (HTTP methods) res
*/
function AjaxListID(req, res) {
  const listID = req.params.listID;
  listOptions.endpoint = `${apiRoot}${api.baseEndpoint}/${listID}`;
  listOptions.includes = api.includes;
  const completeApiUrl = parser.getCompleteApi(listOptions);

  axios
    .get(completeApiUrl)
    .then(data => {
      const returnedData = data.data;
      const parsed = parser.parse(returnedData, listOptions);

      res.json({
        listID,
        data: parsed,
      });
    })
    .catch(error => {
      console.log('Error calling API: AjaxListID');
      res.json({
        errorInfo: error.data.errors[0]
      });
    }); // end Axios call
}

// Express routing methods, execute the methods via URL to render the pages
router
  .route('/')
  .get(BookListUsers);

router
  .route('/:username/?')
  .get(BookListUser);

router
  .route('/:username/:listID/?')
  .get(ListID);

router
  .route('/api/ajax/username/:username&:pageSize&:pageNumber')
  .get(AjaxBookListUser);

router
  .route('/api/ajax/listID/:listID')
  .get(AjaxListID);

// Reverse Proxy routes.
router
  .route('/browse/recommendations/lists/')
  .get(BookListUsers);

router
  .route('/browse/recommendations/lists/:username/?')
  .get(BookListUser);

router
  .route('/browse/recommendations/lists/:username/:listID/?')
  .get(ListID);

router
  .route('/browse/recommendations/lists/api/ajax/username/:username&:pageSize&:pageNumber')
  .get(AjaxBookListUser);

router
  .route('/browse/recommendations/lists/api/ajax/listID/:listID')
  .get(AjaxListID);


export default router;
