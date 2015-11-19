import alt from 'dgx-alt-center';

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

  updateListsNumber(data) {
    this.dispatch(data);
  }

  failedData(errorInfo) {
    this.dispatch(errorInfo);
  }
}

export default alt.createActions(Actions);
