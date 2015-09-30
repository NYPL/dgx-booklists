import alt from '../alt.js';
import Actions from '../actions/Actions.js';

class Store {
  constructor(){
    this.allUsersList = [];
    this.userLists = [];
    this.bookList = {};
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateAllUsersList: Actions.UPDATE_ALL_USERS_LIST,
      handleUpdateUserLists: Actions.UPDATE_USER_LISTS,
      handleUpdateBookList: Actions.UPDATE_BOOK_LIST,
      handleDataFailedFetch: Actions.FAILED_DATA
    });
  }

  handleUpdateAllUsersList(data) {
    this.allUsersList = data;
  }

  handleUpdateUserLists(data) {
    this.userLists = data;
  }

  handleUpdateBookList(data) {
    this.bookList = data;
  }

  handleDataFailedFetch(errorMessage) {
    this.errorMessage =  errorMessage;
  }
}

// Export our newly created Store
export default alt.createStore(Store, 'Store');