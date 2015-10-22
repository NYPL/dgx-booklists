// Import libraries
import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import {api, headerApi} from '../../../appConfig.js';
import Model from '../../app/utils/HeaderItemModel.js';

// Set up variables for routing and its options
let router = express.Router(),
  appEnvironment = process.env.APP_ENV || 'production',
  apiRoot = api.root[appEnvironment],
  listOptions = {
    endpoint: '',
    includes: []
  },
  headerOptions = {
    endpoint: `${apiRoot}${headerApi.endpoint}`,
    includes: headerApi.includes,
    filters: headerApi.filters
  },
  errorMessage = 'Unable to complete this request. Something might be wrong with the server.';

function getHeaderData() {
  let completeApiUrl = parser.getCompleteApi(headerOptions);
  return fetchApiData(completeApiUrl);
}

function fetchApiData(url) {
  return axios.get(url);
}

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
  let completeApiUrl;

  listOptions.endpoint = `${apiRoot}${api.baseEndpoint}${api.bookListUserEndpoint}`;
  listOptions.includes = [];

  completeApiUrl = parser.getCompleteApi(listOptions);

  axios.all([getHeaderData(), fetchApiData(completeApiUrl)])
    .then(axios.spread((headerData, allUsersList) => {
      // Booklist data
      let returnedData = allUsersList.data,
        HeaderParsed = parser.parse(headerData.data, headerOptions),
        parsed = parser.parse(returnedData, listOptions),
        // Header data
        modelData = Model.build(HeaderParsed);

      // put the data in Store
      res.locals.data = {
        Store: {
          allUsersList: parsed
        },
        HeaderStore: {
          headerData: modelData,
          subscribeFormVisible: false
        },
        completeApiUrl
      };
      next();
    }))
    // console error messages
    .catch(error => {
      console.log('Error calling API BookListUsers: ' + error);
      res.locals.data = {
        Store: {
          allUsersList: [],
          errorMessage : errorMessage
        },
        HeaderStore: {
          headerData: [],
          subscribeFormVisible: false
        },
        completeApiUrl: ''
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
  let username = req.params.username,
    completeApiUrl;

  listOptions.endpoint = `${apiRoot}${api.baseEndpoint}${api.bookListUserEndpoint}/` +
        `${username}/links/book-lists`;
  listOptions.includes = api.includes;
  
  completeApiUrl = parser.getCompleteApi(listOptions, `${api.pageSize}${api.pageNumber}`);

  axios.all([getHeaderData(), fetchApiData(completeApiUrl)])
    .then(axios.spread((headerData, userListsData) => {
      // Booklist data
      let returnedData = userListsData.data,
        HeaderParsed = parser.parse(headerData.data, headerOptions),
        parsed = parser.parse(returnedData, listOptions),
        listsNumber = returnedData.meta.count,
        // Header data
        modelData = Model.build(HeaderParsed);

      // Put the parsed data into Store
      res.locals.data = {
        Store: {
          userLists: parsed,
          listsNumber: listsNumber
        },
        HeaderStore: {
          headerData: modelData,
          subscribeFormVisible: false
        },
        completeApiUrl
      };
      next();
    }))
    // console error messages
    .catch(error => {
      console.log('Error calling API BookListUser: ' + error.error);
      res.locals.data = {
        Store: {
          userLists: [],
          listsNumber: 0,
          errorMessage : errorMessage
        },
        HeaderStore: {
          headerData: [],
          subscribeFormVisible: false
        },
        completeApiUrl: ''
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
  let listID = req.params.listID,
    completeApiUrl;

  listOptions.endpoint = `${apiRoot}${api.baseEndpoint}/${listID}`;
  listOptions.includes = api.includes;
  
  completeApiUrl = parser.getCompleteApi(listOptions);

  axios.all([getHeaderData(), fetchApiData(completeApiUrl)])
    .then(axios.spread((headerData, userList) => {
      // Booklist data
      let returnedData = userList.data,
        HeaderParsed = parser.parse(headerData.data, headerOptions),
        parsed = parser.parse(returnedData, listOptions),
        // Header data
        modelData = Model.build(HeaderParsed);

      res.locals.data = {
        Store: {
          bookItemList: parsed
        },
        HeaderStore: {
          headerData: modelData,
          subscribeFormVisible: false
        },
        completeApiUrl
      };
      next();
    }))
    .catch(error => {
      console.log('Error calling API ListID: ' + error);
      res.locals.data = {
        Store: {
          bookItemList: {},
          errorMessage : errorMessage
        },
        HeaderStore: {
          headerData: [],
          subscribeFormVisible: false
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
  let username = req.params.username,
    pageSize = `&page[size]=${req.params.pageSize}`,
    pageNumber = `&page[number]=${req.params.pageNumber}`,
    completeApiUrl;

  listOptions.endpoint = `${apiRoot}${api.baseEndpoint}${api.bookListUserEndpoint}/` +
      `${username}/links/book-lists`;
  listOptions.includes = api.includes;
  
  completeApiUrl = parser.getCompleteApi(listOptions, `${pageSize}${pageNumber}`);

  axios
    .get(completeApiUrl)
    .then(data => {
      let returnedData = data.data,
        parsed = parser.parse(returnedData, listOptions),
        listsNumber = returnedData.meta.count;

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
        errorTitle: error.data.errors[0].title,
        errorStatus: error.data.errors[0].status,
        errorMessage: errorMessage
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
  let listID = req.params.listID,
    completeApiUrl;

  listOptions.endpoint = `${apiRoot}${api.baseEndpoint}/${listID}`;
  listOptions.includes = api.includes;
  
  completeApiUrl = parser.getCompleteApi(listOptions);

  axios
    .get(completeApiUrl)
    .then(data => {
      let returnedData = data.data,
        parsed = parser.parse(returnedData, listOptions);

      res.json({
        listID: listID,
        data: parsed
      });
    })
    .catch(error => {
      console.log('Error calling API: AjaxListID');
      res.json({'error': 'error calling API'});
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
