// Server Side Request Module
import axios from 'axios';

const mockData = [{
}];

const ApiService = {
	fetchData(source, url) {
		if (source === 'server') {
      return axios.get(url).then(res => res.data);
		}

		if (source === 'client') {

		}

		if (source === 'local') {
			return new Promise((resolve, reject) => {
				resolve(mockData);
			});
		}
	}
};


export default ApiService;


