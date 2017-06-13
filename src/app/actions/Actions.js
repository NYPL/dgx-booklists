import alt from 'dgx-alt-center';

class Actions {
  updateAllUsersList(data) {
    return data;
  }

  updateUserLists(data) {
    return data;
  }

  updateBookList(data) {
    return data;
  }

  updateListsNumber(data) {
    return data;
  }

  failedData(errorInfo) {
    return errorInfo;
  }
}

export default alt.createActions(Actions);
