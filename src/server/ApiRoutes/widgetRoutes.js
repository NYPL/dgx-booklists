import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import {api} from '../../../appConfig.js';

let router = express.Router(),
  listOptions = {
    includes: ['user', 'list-items.item']
  };

parser.setChildrenObjects(listOptions);

function ListID(req, res, next) {
  let listID = req.params.listID,
    endpoint = `${api.root}${api.baseEndpoint}/${listID}${api.includes}`;

  axios
    .get(endpoint)
    .then(data => {
      // Booklist data
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
      console.log('Error calling API widget ListID: ' + error);
      res.locals.data = {
        Store: {
          bookItemList: {}
        }
      };
      next();
    }); /* end Axios call */
}


// router
//   .route('/')
//   .get(BookListUsers);

// router
//   .route('/:username/?')
//   .get(BookListUser);

router
  .route('/:listID/?')
  .get(ListID);


export default router;
