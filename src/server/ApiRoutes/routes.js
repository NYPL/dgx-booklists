import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import {api} from '../../../appConfig.js';
import Model from '../../app/utils/HeaderItemModel.js';

let router = express.Router(),
  options = {
    includes: ['user', 'list-items.item']
  };

parser.setChildrenObjects(options);

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
    .catch(error => {
      console.log('Error calling API BookListUsers: ' + error);
      console.log('Attempted to call : ' + endpoint);
      res.locals.data = {
        Store: {
          allUsersList: []
        }
      };
      next();
    }); /* end Axios call */
}

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
        // Header data
        HeaderParsed = parser.parse(headerData.data),
        modelData = Model.build(HeaderParsed);

      res.locals.data = {
        Store: {
          userLists: parsed
        },
        HeaderStore: {
          headerData: modelData,
          subscribeFormVisible: false
        }
      };
      next();
    }))
    .catch(error => {
      console.log('Error calling API BookListUser: ' + error.error);
      console.log('Attempted to call : ' + endpoint);
      res.locals.data = {
        Store: {
          userLists: []
        }
      };
      next();
    }); /* end Axios call */
}

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
      console.log('Attempted to call : ' + endpoint);
      res.locals.data = {
        Store: {
          bookItemList: {}
        }
      };
      next();
    }); /* end Axios call */
}

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
    }); /* end Axios call */
}

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
    }); /* end Axios call */
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
