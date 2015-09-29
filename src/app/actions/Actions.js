import alt from '../alt.js';

class Actions {

  fetchData() {
    let self = this;

    // this.dispatch();

    // Fetcher.fetch()
    //   .then((data) => {
    //   this.actions.updateData(data);
    // })
    // .catch((errorMessage) => {
    //   this.actions.failedData(errorMessage);
    // });

    // Here we will use the client side AJAX request
    // to fetch data
  }

  updateUserLists(data) {
    this.dispatch(data);
  }

  updateBookList(data) {
    this.dispatch(data);
  }

  updateData(data) {
    this.dispatch(data);
  }

  failedData(errorMessage) {
    this.dispatch(errorMessage);
  }
}

export default alt.createActions(Actions);