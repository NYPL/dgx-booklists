import alt from '../alt.js';
import Actions from '../actions/Actions.js';

class Store {
  constructor(){
    this.allUsersList = [];
    this.userLists = [];
    this.bookList = [];
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateUserLists: Actions.UPDATE_USER_LISTS,
      handleUpdateBookList: Actions.UPDATE_BOOK_LIST,
      handleFetchData: Actions.FETCH_DATA,
      handleDataFailedFetch: Actions.FAILED_DATA
    });
  }

  handleUpdateUserLists(data) {
    this.userLists = data;
  }

  handleUpdateBookList(data) {
    this.bookList = data;
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