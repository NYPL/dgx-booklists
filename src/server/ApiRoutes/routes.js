// Import libraries
import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import {api} from '../../../appConfig.js';
import Model from '../../app/utils/HeaderItemModel.js';

// Set up variables for routing and its options
let router = express.Router(),
  options = {
    includes: ['user', 'list-items.item']
  };

// Have parser to take the options
parser.setChildrenObjects(options);

/**
* BookListUsers(req, res, next)
* This route is for rendering the page of AllUsersList.
* It utilizes the method of promise.
*
* @param (HTTP methods) req
* @param (HTTP methods) res
* @param (Express function) next - call the next function after the previous function has coompleted
*/
function getHeaderData() {
  let options = {
    endpoint: 'http://dev.refinery.aws.nypl.org/api/nypl/ndo/v0.1/site-data/' +
      'header-items?filter\[relationships\]\[parent\]=null&include=' +
      'children,' +
      'related-mega-menu-panes.current-mega-menu-item.images,' +
      'related-mega-menu-panes.current-mega-menu-item.related-content.authors.nypl-location,' +
      'related-mega-menu-panes.current-mega-menu-item.related-content.location,' +
      'related-mega-menu-panes.default-mega-menu-item.images,' +
      'related-mega-menu-panes.default-mega-menu-item.related-content.authors.nypl-location,' +
      'related-mega-menu-panes.default-mega-menu-item.related-content.location',
    includes: [
      'children',
      'related-mega-menu-panes.current-mega-menu-item.images',
      'related-mega-menu-panes.current-mega-menu-item.related-content.authors.nypl-location',
      'related-mega-menu-panes.current-mega-menu-item.related-content.location',
      'related-mega-menu-panes.default-mega-menu-item',
      'related-mega-menu-panes.default-mega-menu-item.related-content.authors.nypl-location',
      'related-mega-menu-panes.default-mega-menu-item.related-content.location'],
    filters: {
      'relationships': {'parent': 'null'}
    }
  };

  // Set the actual children relationships you want to create
  // for the embedded properties.
  parser.setChildrenObjects(options);

  return axios.get(options.endpoint);
}

function BookListUsers(req, res, next) {
  function getAllUsers() {
    let endpoint = `${api.root}${api.baseEndpoint}${api.bookListUserEndpoint}`;
    return axios.get(endpoint)
  }

  axios.all([getHeaderData(), getAllUsers()])
    .then(axios.spread((headerData, allUsersList) => {
      // Booklist data
      let returnedData = allUsersList.data,
        parsed = parser.parse(returnedData),
        // Header data
        HeaderParsed = parser.parse(headerData.data),
        modelData = Model.build(HeaderParsed);

      // put the data in Store
      res.locals.data = {
        Store: {
          allUsersList: parsed
        },
        HeaderStore: {
          headerData: modelData,
          subscribeFormVisible: false
        }
      };
      next();
    }))
    // console error messages
    .catch(error => {
      console.log('Error calling API BookListUsers: ' + error);
      res.locals.data = {
        Store: {
          allUsersList: []
        },
        HeaderStore: {
          headerData: [],
          subscribeFormVisible: false
        }
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
  function getUserLists() {
    let username = req.params.username,
      endpoint = `${api.root}${api.baseEndpoint}${api.bookListUserEndpoint}/` +
        `${username}/links/book-lists${api.includes}`;

    return axios.get(endpoint);
  }

  axios.all([getHeaderData(), getUserLists()])
    .then(axios.spread((headerData, userListsData) => {
      // Booklist data
      let returnedData = userListsData.data,
        parsed = parser.parse(returnedData),
        listsNumber = returnedData.meta.count,
        // Header data
        HeaderParsed = parser.parse(headerData.data),
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
        }
      };
      next();
    }))
    // console error messages
    .catch(error => {
      console.log('Error calling API BookListUser: ' + error.error);
      res.locals.data = {
        Store: {
          userLists: [],
          listsNumber: 1
        },
        HeaderStore: {
          headerData: [],
          subscribeFormVisible: false
        }
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

  function getList() {
    let listID = req.params.listID,
      endpoint = `${api.root}${api.baseEndpoint}/${listID}${api.includes}`;

    return axios.get(endpoint);
  }

  axios.all([getHeaderData(), getList()])
    .then(axios.spread((headerData, userList) => {
      // Booklist data
      let returnedData = userList.data,
        parsed = parser.parse(returnedData),
        // Header data
        HeaderParsed = parser.parse(headerData.data),
        modelData = Model.build(HeaderParsed);

      res.locals.data = {
        Store: {
          bookItemList: parsed
        },
        HeaderStore: {
          headerData: modelData,
          subscribeFormVisible: false
        }
      };
      next();
    }))
    .catch(error => {
      console.log('Error calling API ListID: ' + error);
      res.locals.data = {
        Store: {
          bookItemList: {}
        },
        HeaderStore: {
          headerData: [],
          subscribeFormVisible: false
        }
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
    endpoint = `${api.root}${api.baseEndpoint}${api.bookListUserEndpoint}/` +
      `${username}/links/book-lists${api.includes}${pageSize}${pageNumber}`;

  axios
    .get(endpoint)
    .then(data => {
      let returnedData = data.data,
        parsed = parser.parse(returnedData),
        listsNumber = returnedData.meta.count;

      // Return the data as a JSON, it will be updated to Store at UserLists component
      res.json({
        user: username,
        userLists: parsed,
        listsNumber: listsNumber
      });
    })
    .catch(error => {
      console.log('Error calling API: AjaxBookListUser');
      res.json({'error': 'error calling API'});
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
    endpoint = `${api.root}${api.baseEndpoint}/${listID}${api.includes}`;

  axios
    .get(endpoint)
    .then(data => {
      let returnedData = data.data,
        parsed = parser.parse(returnedData);

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


export default router;
