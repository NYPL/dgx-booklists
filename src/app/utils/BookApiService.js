// Server Side Request Module
import axios from 'axios';

function getBook (itemId) {
	var url = 'http://dev.refinery.aws.nypl.org/api/nypl/ndo/v0.1/book-lists/book-list-items/'+ itemId + '/links/item';
	return axios.get(url);
}

// getBook('479507199-17217252');
