import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import {api} from '../../../appConfig.js';

let router = express.Router();
let options = {
  includes: ['user', 'list-items.item']
};

parser.setChildrenObjects(options);

function BookListUsers(req, res, next) {
  let endpoint = api.root + api.baseEndpoint + api.bookListUserEndpoint;

  axios
    .get(endpoint)
    .then(data => {
      let returnedData = data.data,
        // parse the data
        parsed = parser.parse(returnedData);

      res.locals.data = {
        Store: {
          Data: parsed
        }
      };

      next();
    }); /* end Axios call */
}

function BookListUser(req, res, next) {
  let username = req.params.username,
    endpoint = api.root + api.baseEndpoint + api.bookListUserEndpoint + '/' +
      username + '/links/book-lists' + api.includes;

  axios
    .get(endpoint)
    .then(data => {
      let returnedData = data.data,
        parsed = parser.parse(returnedData);

      res.locals.data = {
        Store: {
          Data: parsed
        }
      };
      next();
    }); /* end axios call */
}

function ListID(req, res, next) {
  let listID = req.params.listID,
    endpoint = api.root + api.baseEndpoint + '/' + listID  + api.includes;

  axios
    .get(endpoint)
    .then(data => {
      let returnedData = data.data,
        parsed = parser.parse(returnedData);

      res.locals.data = {
        Store: {
          Data: parsed
        }
      };
      next();
    }); /* end axios call */
}

function AjaxBookListUser(req, res, next) {
  let username = req.params.username,
    endpoint = api.root + api.baseEndpoint + api.bookListUserEndpoint + '/' +
      username + '/links/book-lists' + api.includes;

  axios
    .get(endpoint)
    .then(data => {
      let returnedData = data.data,
        parsed = parser.parse(returnedData);

      res.json({
        user: username,
        data: parsed
      });
    }); /* end axios call */
}

function AjaxListID(req, res, next) {
  let listID = req.params.listID,
    endpoint = api.root + api.baseEndpoint + '/' + listID  + api.includes;

  axios
    .get(endpoint)
    .then(data => {
      let returnedData = data.data,
        parsed = parser.parse(returnedData);

      res.json({
        listID: listID,
        data: parsed
      });
    }); /* end axios call */
}

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
