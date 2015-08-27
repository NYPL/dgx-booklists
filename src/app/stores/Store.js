import alt from '../alt.js';
import Actions from '../actions/Actions.js';

class Store {
  constructor(){
    this.Data = [];
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateData: Actions.UPDATE_DATA,
      handleFetchData: Actions.FETCH_DATA,
      handleDataFailedFetch: Actions.FAILED_DATA
    });
  }

  handleUpdateData(data) {
    this.Data = data;
  }

  handleFetchData() {
    this.Data = [];
  }

  handleDataFailedFetch(errorMessage) {
    this.errorMessage =  errorMessage;
  }
}

// Export our newly created Store
export default alt.createStore(Store, 'Store');