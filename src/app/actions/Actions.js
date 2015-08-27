import alt from '../alt.js';

class Actions {

  fetchData() {
    let self = this;

    // Here we will use the client side AJAX request
    // to fetch data
  }

  updateData(data) {
    this.dispatch(data);
  }

  failedData(errorMessage) {
    this.dispatch(errorMessage);
  }
}

export default alt.createActions(Actions);