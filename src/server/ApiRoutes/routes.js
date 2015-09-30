// Import libraries
import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import {api} from '../../../appConfig.js';

// Set up variables for routing and its options
let router = express.Router(),
  options = {
    includes: ['user', 'list-items.item']
  };

// Have parser to take the options
parser.setChildrenObjects(options);

/**
* BookListUsers(req, res, next)
* The route for rendering the page of all BookListUsers/Owners.
* It utilizes the method of promise.
*
* @param (HTTP methods)
*/
function BookListUsers(req, res, next) {
  let endpoint = `${api.root}${api.baseEndpoint}${api.bookListUserEndpoint}`;

  // get data from the endpoint
  axios
    .get(endpoint)
    .then(data => {
      let returnedData = data.data,
        // parse the data
        parsed = parser.parse(returnedData);
      // put the data in Store
      res.locals.data = {
        Store: {
          allUsersList: parsed
        }
      };

      next();
    })
    // console error messages
    .catch(error => {
      console.log('Error calling API BookListUsers: ' + error);
      console.log('Attempted to call : ' + endpoint);
      res.locals.data = {
        Store: {
          allUsersList: []
        }
      };
      next();
    }); // end Axios call
}

/**
* BookListUser(req, res, next)
* The route for rendering the page of one BookListUsers/Owners.
* It utilizes the method of promise.
*
* @param (HTTP methods)
*/
function BookListUser(req, res, next) {
  let username = req.params.username,
    endpoint = `${api.root}${api.baseEndpoint}${api.bookListUserEndpoint}/` +
      `${username}/links/book-lists${api.includes}`;

  axios
    .get(endpoint)
    .then(data => {
      let returnedData = data.data,
        parsed = parser.parse(returnedData);

      res.locals.data = {
        Store: {
          userLists: parsed
        }
      };
      next();
    })
    // console error messages
    .catch(error => {
      console.log('Error calling API BookListUser: ' + error.error);
      console.log('Attempted to call : ' + endpoint);
      res.locals.data = {
        Store: {
          userLists: []
        }
      };
      next();
    }); // end Axios call
}

/**
* ListID(req, res, next)
* The route for rendering the page of Singlelist.
* It utilizes the method of promise.
*
* @param (HTTP methods)
*/
function ListID(req, res, next) {
  let listID = req.params.listID,
    endpoint = `${api.root}${api.baseEndpoint}/${listID}${api.includes}`;

  axios
    .get(endpoint)
    .then(data => {
      let returnedData = data.data,
        parsed = parser.parse(returnedData);

      res.locals.data = {
        Store: {
          bookItemList: parsed
        }
      };
      next();
    })
    .catch(error => {
      console.log('Error calling API ListID: ' + error);
      console.log('Attempted to call : ' + endpoint);
      res.locals.data = {
        Store: {
          bookItemList: {}
        }
      };
      next();
    }); // end Axios call
}

/**
* AjaxBookListUser(req, res, next)
* The AJAX call for internal browsing to the page of one BookListUsers/Owners.
* It utilizes the method of promise.
*
* @param (HTTP methods)
*/
function AjaxBookListUser(req, res, next) {
  let username = req.params.username,
    endpoint = `${api.root}${api.baseEndpoint}${api.bookListUserEndpoint}/` +
      `${username}/links/book-lists${api.includes}`;

  axios
    .get(endpoint)
    .then(data => {
      let returnedData = data.data,
        parsed = parser.parse(returnedData);

      res.json({
        user: username,
        data: parsed
      });
    })
    .catch(error => {
      console.log('Error calling API: AjaxBookListUser');
      res.json({'error': 'error calling API'});
    }); // end Axios call
}

/**
* AjaxListID(req, res, next)
* The AJAX call for internal browsing to the page of one Singlelist.
* It utilizes the method of promise.
*
* @param (HTTP methods)
*/
function AjaxListID(req, res, next) {
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
  .route('/api/ajax/username/:username')
  .get(AjaxBookListUser);

router
  .route('/api/ajax/listID/:listID')
  .get(AjaxListID);


export default router;
