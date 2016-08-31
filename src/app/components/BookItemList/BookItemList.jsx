// Import React Libraries
import React from 'react';

import DocMeta from 'react-doc-meta';
import axios from 'axios';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import Hero from '../Hero/Hero';
import BookItem from '../BookItem/BookItem';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import BackButton from '../BackButton/BackButton';

import utils from '../../utils/utils.js';

// Create the class. Use ES5 for react-router Navigation
class BookItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.getState();
    this.onChange = this.onChange.bind(this);
  }
  // Listen to the change from data
  componentDidMount() {
    Store.listen(this.onChange.bind(this));
    // As a fallback, we check if the app fails to fetch the data.
    // If so, the app will attempt to make a call on client-side one more time.
    // Also, if the users browse the app with backward button or forward button,
    // we need to check if they have refreshed the page and lost the data in the Store.
    if (!this.state.bookItemList) {
      this.fetchBookData();
    }
  }
  // Stop listening
  componentWillUnmount() {
    // Store.unlisten(this._onChange.bind(this));
  }
  // Change the this.state here if find any different
  onChange() {
    this.setState(Store.getState());
  }

  /**
  * fetchUserLists(userId, pageSize, pageNumber)
  * Fetch the data we need for UserLists
  * before the app transit us to UserLists page
  *
  * @param (String) userId
  * @param (String) pageSize
  * @param (String) pageNumber
  */
  fetchUserLists(userId, pageSize, pageNumber) {
    if (!userId || !pageSize || !pageNumber) {
      console.log('Unavailable parameters for the request.');
      return;
    }

    utils._trackLists('Go back to...', userId);

    if (!Store.getUserLists()) {
      // First fetch the data and then transition. Must also handle errors.
      axios
        .get(`/books-music-dvds/recommendations/lists/api/ajax/username/${userId}&${pageSize}&${pageNumber}`)
        .then(response => {
          const list = response.data;
          // Update the store for the list of lists a user has.
          Actions.updateUserLists(list.data);
          Actions.updateListsNumber(list.listsNumber);
          // Check if any error from the Refinery
          if (list.errorInfo) {
            Actions.failedData(list.errorInfo);
            console.warn(
              `Server returned a ${list.errorInfo.status} status. ${list.errorInfo.title}.`
            );
          }
        })
        .then(() => {
          this.context.router.push(`/books-music-dvds/recommendations/lists/${userId}`);
        });
    } else {
      this.context.router.push(`/books-music-dvds/recommendations/lists/${userId}`);
    }
  }

  /**
  * fetchBookData()
  * This function calls the API to fetch the data of BookItemList.
  * It could be used as a fallback if the app fails to fetch data from the sever.
  * Also, for the case if the users navigate the app with backward or
  * forward button, and refresh the page at some point of time,
  * the app will lose all the data in the Store.
  * Thus, this function is here for the app to fetch the data again.
  */
  fetchBookData() {
    const urlBookItemList = (window.location.pathname).split('/');
    const urlBookItemListId = urlBookItemList[5];

    axios
      .get(`/books-music-dvds/recommendations/lists/api/ajax/listID/${urlBookItemListId}`)
      .then(response => {
        // Update the Store for a specific list of books:
        Actions.updateBookList(response.data.data);
        // Check if any error from the Refinery
        if (response.data.errorInfo) {
          Actions.failedData(response.data.errorInfo);
          console.warn(
            `Server returned a ${response.data.errorInfo.status} status. ${response.data.errorInfo.title}.`
          );
        }
      });
  }

  // Render DOM
  render() {
    // The variable to store the data from Store
    const bookItemList = this.state.bookItemList ? this.state.bookItemList : [];
    const listId = bookItemList.id || '';
    const listItems = bookItemList['list-items'] ? bookItemList['list-items'] : [];
    const encoreUrl = 'http://browse.nypl.org/iii/encore/record/C__Rb';
    let userId = bookItemList.user ? bookItemList.user.id : '';
    let userDisplayName = bookItemList.user ? bookItemList.user.attributes.name : '';
    let listName = bookItemList.attributes ? bookItemList.attributes['list-name'] : '';
    let listIntro = bookItemList.attributes ? bookItemList.attributes['list-description'] : '';
    const description = listIntro || 'A list created by staff at The New York Public Library';
    const pageTags = [
      // Required OG meta tags
      { property: 'og:title', content: `${listName} | The New York Public Library` },
      { property: 'og:url', content: `http://www.nypl.org/books-music-dvds/recommendations/lists/${userId}/${listId}` },
      { property: 'og:image', content: '' },
      { property: 'og:description', content: description },
      { name: 'twitter:title', content: `${listName} | The New York Public Library` },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: '' },
    ];
    let tags = utils.metaTagUnion(pageTags);
    let bookItems = (listItems && listItems.length) ?
      listItems.map((element, i) => {
        let target = `${encoreUrl}${element.item.id}?lang=eng`;
        let itemId = element.item.id;
        let bookItemName = element.item.attributes.title;
        let bookItemDescription = element.attributes.annotation;
        let bookCoverIsbn = element.item.attributes.isbns[0];
        let authors = (element.item.attributes.authors.length) ?
            `By ${element.item.attributes.authors}` : 'The author of this item is not available';
        const publishedDate = (element.item.attributes['publication-date'] && !undefined) ?
          element.item.attributes['publication-date'] : 'publish date is not available';
        let catalogInfo = `${element.item.attributes.format} - ${publishedDate}`;

        return (
          <BookItem
            id="bookItem"
            className="bookItem"
            key={i}
            itemId={itemId}
            target={target}
            catalogInfo={catalogInfo}
            bookItemName={bookItemName}
            bookItemDescription={bookItemDescription}
            bookCoverIsbn={bookCoverIsbn}
            authors={authors}
          />
        );
      })
      : (
      <ErrorMessage
        errorClass="book-item-list-error no-data"
        messageContent={this.props.errorMessage.noData}
      />);
    let content = (
      <div className="bookItemList-wrapper">
        <BackButton
          userId={userId}
          userDisplayName={userDisplayName}
        />
        <div id={this.props.id} className={this.props.className}>
          <div
            id={`${this.props.id}__${listName}`}
            className={`${this.props.className}__content`}
          >
            <a
              id="title-button"
              className="title-button"
              onClick={() => this.fetchUserLists(userId, 5, 1)}
            >
              {userDisplayName}
            </a>
            {bookItems}
          </div>
        </div>
      </div>);
    const errorInfo = this.state.errorInfo;
    let errorStatus;
    let errorTitle;

    // Throw error message if something's wrong
    if (errorInfo) {
      errorStatus = errorInfo.status;
      errorTitle = errorInfo.title;
      content = (
        <div className="bookItemList-wrapper">
          <ErrorMessage
            errorClass="book-item-list-error"
            messageContent={this.props.errorMessage.failedRequest}
          />
        </div>
        );
      console.warn(`Server returned a ${errorStatus} status. ${errorTitle}.`);
    }

    // Render the list of owners on DOM
    return (
      <div id="main">
        <DocMeta tags={tags} />
        <Hero
          name={listName}
          intro={listIntro}
        />
        {content}
      </div>
    );
  }
}

BookItemList.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

BookItemList.defaultProps = {
  lang: 'en',
  id: 'bookItemList',
  className: 'bookItemList',
  errorMessage: {
    noData: 'No book in this list.',
    failedRequest: 'Unable to complete this request. Something might be wrong with the server.',
  },
};

export default BookItemList;
