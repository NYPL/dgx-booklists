import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import {api} from '../../../appConfig.js';

let router = express.Router(),
  appEnvironment = process.env.APP_ENV || 'production',
  apiRoot = api.root[appEnvironment],
  listOptions = {
    endpoint: '',
    includes: ['user', 'list-items.item']
  };

parser.setChildrenObjects(listOptions);

function ListID(req, res, next) {
  let listID = req.params.listID,
    endpoint = `${apiRoot}${api.baseEndpoint}/${listID}`,
    completeApiUrl;

  listOptions.endpoint = endpoint;
  completeApiUrl = parser.getCompleteApi(listOptions);

  axios
    .get(completeApiUrl)
    .then(data => {
      // Booklist data
      let returnedData = data.data,
        parsed = parser.parse(returnedData);

      res.locals.data = {
        Store: {
          bookItemList: parsed
        },
        completeApiUrl
      };
      next();
    })
    .catch(error => {
      console.log('Error calling API widget ListID: ' + error);
      res.locals.data = {
        Store: {
          bookItemList: {},
          errorInfo: error.data.errors[0]
        },
        completeApiUrl: ''
      };
      next();
    }); /* end Axios call */
}

router
  .route('/:listID/?')
  .get(ListID);


export default router;
