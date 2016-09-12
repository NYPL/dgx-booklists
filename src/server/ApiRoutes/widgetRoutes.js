import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import appConfig from '../../../appConfig.js';

let router = express.Router(),
  appEnvironment = process.env.APP_ENV || 'production',
  apiRoot = appConfig.api.root[appEnvironment],
  listOptions = {
    endpoint: '',
    includes: ['user', 'list-items.item']
  };


function ListID(req, res, next) {
  let listID = req.params.listID,
    endpoint = `${apiRoot}${appConfig.api.baseEndpoint}/${listID}`,
    completeApiUrl;

  listOptions.endpoint = endpoint;
  completeApiUrl = parser.getCompleteApi(listOptions);

  axios
    .get(completeApiUrl)
    .then(data => {
      // Booklist data
      let returnedData = data.data,
        parsed = parser.parse(returnedData, listOptions);

      res.locals.data = {
        ListStore: {
          bookItemList: parsed
        },
        completeApiUrl
      };
      next();
    })
    .catch(error => {
      console.log('Error calling API widget ListID: ' + error);
      res.locals.data = {
        ListStore: {
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
