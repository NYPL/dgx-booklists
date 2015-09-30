import alt from '../alt.js';

class Actions {
  updateAllUsersList(data) {
    this.dispatch(data);
  }

  updateUserLists(data) {
    this.dispatch(data);
  }

  updateBookList(data) {
    this.dispatch(data);
  }

  failedData(errorMessage) {
    this.dispatch(errorMessage);
  }
}

export default alt.createActions(Actions);
