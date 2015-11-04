import alt from '../alt.js';
import Actions from '../actions/Actions.js';

class Store {
  constructor(){
    this.bindListeners({
      handleUpdateAllUsersList: Actions.UPDATE_ALL_USERS_LIST,
      handleUpdateUserLists: Actions.UPDATE_USER_LISTS,
      handleUpdateBookList: Actions.UPDATE_BOOK_LIST,
      handleUpdateListsNumber: Actions.UPDATE_LISTS_NUMBER,
      handleDataFailedFetch: Actions.FAILED_DATA
    });

    this.exportPublicMethods({
      getUserLists: this.getUserLists
    });

    this.on('init', () => {
      this.allUsersList = [];
      this.userLists = [];
      this.bookItemList = {};
      this.listsNumber = 0;
      this.errorInfo = {};
    });
  }

  handleUpdateAllUsersList(data) {
    this.allUsersList = data;
  }

  handleUpdateUserLists(data) {
    this.userLists = data;
  }

  handleUpdateBookList(data) {
    this.bookItemList = data;
  }

  handleUpdateListsNumber(data) {
    this.listsNumber = data;
  }

  handleDataFailedFetch(errorInfo) {
    this.errorInfo = errorInfo;
  }

  // Remember to use this.state when returning exposing store data.
  getUserLists() {
    return this.state.userLists;
  }
}

// Export our newly created Store
export default alt.createStore(Store, 'Store');
