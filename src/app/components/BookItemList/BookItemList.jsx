// Import React Libraries
import React from 'react';

// Import Router and it's navigation
import Router from 'react-router';

import DocMeta from 'react-doc-meta';
import axios from 'axios';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import Hero from '../Hero/Hero';
import SimpleButton from '../Buttons/SimpleButton';
import BookCover from '../BookCover/BookCover';
import BookItem from '../BookItem/BookItem';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import BackButton from '../BackButton/BackButton';

import utils from '../../utils/utils.js';

// Create the class. Use ES5 for react-router Navigation
let BookItemList = React.createClass({
  getInitialState() {
    return Store.getState();
  },
  // Listen to the change from data
  componentDidMount() {
    //Store.listen(this._onChange.bind(this));
    // As a fallback, we check if the app fails to fetch the data.
    // If so, the app will attempt to make a call on client-side one more time.
    // Also, if the users browse the app with backward button or forward button,
    // we need to check if they have refreshed the page and lost the data in the Store.
    if(!this.state.bookItemList) {
      this._fetchBookData();
    }
  },
  // Stop listening
  componentWillUnmount() {
    //Store.unlisten(this._onChange.bind(this));
  },
  // Change the this.state here if find any different
  _onChange() {
    this.setState(Store.getState());
  },
  // Render DOM
  render() {
    // The variable to store the data from Store
    let bookItemList = this.state.bookItemList ? this.state.bookItemList : [],
      userId = bookItemList.user ? bookItemList.user.id : '',
      userDisplayName = bookItemList.user ? bookItemList.user.attributes.name : '',
      listId = bookItemList.id || '',
      listItems = bookItemList['list-items'] ? bookItemList['list-items'] : [],
      listName = bookItemList.attributes ? bookItemList.attributes['list-name'] : '',
      listIntro = bookItemList.attributes ? bookItemList.attributes['list-description'] : '',
      encoreUrl = 'http://browse.nypl.org/iii/encore/record/C__Rb',
      description = listIntro || 'A list created by staff at The New York Public Library',
      pageTags = [
        // Required OG meta tags
        {property: "og:title", content: `${listName} | The New York Public Library`},
        {property: "og:url", content: `http://www.nypl.org/browse/recommendations/lists/${userId}/${listId}`},
        {property: "og:image", content: ''},
        {property: "og:description", content: description},
        {name: "twitter:title", content: `${listName} | The New York Public Library`},
        {name: "twitter:description", content: description},
        {name: "twitter:image", content: ''}
      ],
      tags = utils.metaTagUnion(pageTags),
      bookItems = (listItems && listItems.length) ?
        listItems.map((element, i) => {
          let target = `${encoreUrl}${element.item.id}?lang=eng`,
            itemId = element.item.id,
            bookItemName = element.item.attributes.title,
            bookItemDescription = element.attributes.annotation,
            bookCoverIsbn = element.item.attributes.isbns[0],
            authors = (element.item.attributes.authors.length) ?
              `By ${element.item.attributes.authors}` : `The author of this item is not available`,
            publishedDate = (element.item.attributes['publication-date'] && !undefined) ?
              element.item.attributes['publication-date'] : 'publish date is not available',
            catalogInfo = `${element.item.attributes.format} - ${publishedDate}`;

          return(
            <BookItem id={`bookItem`}
              className={`bookItem`}
              key={i}
              itemId={itemId}
              target={target}
              catalogInfo={catalogInfo}
              bookItemName={bookItemName}
              bookItemDescription={bookItemDescription}
              bookCoverIsbn={bookCoverIsbn}
              authors={authors} />
          );
        })
        : <ErrorMessage errorClass='book-item-list-error no-data'
            messageContent={this.props.errorMessage.noData} />,
      content = <div className='bookItemList-wrapper'>
                  <BackButton
                    userId={userId}
                    userDisplayName={userDisplayName}
                    />
                  <div id={this.props.id} className={this.props.className}>
                    <div id={`${this.props.id}__${listName}`}
                    className={`${this.props.className}__content`}>
                      <a id={`title-button`}
                      className={`title-button`}
                        onClick={() => this._fetchUserLists.bind(userId, 5, 1)}>
                        {userDisplayName}
                      </a>
                      {bookItems}
                    </div>
                  </div>
                </div>,
      errorInfo = this.state.errorInfo,
      errorStatus,
      errorTitle;

    // Throw error message if something's wrong
    if (errorInfo) {
      errorStatus = errorInfo.status;
      errorTitle = errorInfo.title;
      content = <div className='bookItemList-wrapper'>
                  <ErrorMessage errorClass='book-item-list-error'
                    messageContent={this.props.errorMessage.failedRequest} />
                </div>;
      console.warn(`Server returned a ${errorStatus} status. ${errorTitle}.`);
    }

    // Render the list of owners on DOM
    return (
      <div id='main'>
        <DocMeta tags={tags} />
        <Hero name={listName} intro={listIntro}/>
        {content}
      </div>
    );
  },

  /**
  * _fetchUserLists(userId, pageSize, pageNumber)
  * Fetch the data we need for UserLists
  * before the app transit us to UserLists page
  *
  * @param (String) userId
  * @param (String) pageSize
  *@ param (String) pageNumber
  */
  _fetchUserLists(userId, pageSize, pageNumber) {
    if (!userId || !pageSize || !pageNumber) {
      console.log('Unavailable parameters for the request.');
      return;
    }

    utils._trackLists('Go back to...', userId);

    if (!Store.getUserLists()) {
      // First fetch the data and then transition. Must also handle errors.
      axios
        .get(`/browse/recommendations/lists/api/ajax/username/${userId}&${pageSize}&${pageNumber}`)
        .then(response => {
          // Update the store for the list of lists a user has.
          Actions.updateUserLists(response.data.data);
          Actions.updateListsNumber(response.data.listsNumber);
          // Check if any error from the Refinery
          if (response.data.errorInfo) {
            Actions.failedData(response.data.errorInfo);
            console.warn(`Server returned a ${response.data.errorInfo.status} status. ${response.data.errorInfo.title}.`);
          }
        })
        .then(response => {
          this.context.router.push(`/browse/recommendations/lists/${userId}`);
        });
    } else {
      this.context.router.push(`/browse/recommendations/lists/${userId}`);
    }
  },

  _transitionToUser(userId) {
    // Now transit to the route.
    this.transitionTo('UserLists', {
      UserLists: userId
    });
  },

  /**
  * _fetchBookData()
  * This function calls the API to fetch the data of BookItemList.
  * It could be used as a fallback if the app fails to fetch data from the sever.
  * Also, for the case if the users navigate the app with backward or
  * forward button, and refresh the page at some point of time,
  * the app will lose all the data in the Store.
  * Thus, this function is here for the app to fetch the data again.
  */
  _fetchBookData() {
    let urlBookItemList = (window.location.pathname).split('/'),
      urlBookItemListId = urlBookItemList[5];

      axios
        .get(`/browse/recommendations/lists/api/ajax/listID/${urlBookItemListId}`)
        .then(response => {
          // Update the Store for a specific list of books:
          Actions.updateBookList(response.data.data);
          // Check if any error from the Refinery
          if (response.data.errorInfo) {
            Actions.failedData(response.data.errorInfo);
            console.warn(`Server returned a ${response.data.errorInfo.status} status. ${response.data.errorInfo.title}.`);
          }
        });
  }
});

BookItemList.defaultProps = {
  lang: 'en',
  id: 'bookItemList',
  className: 'bookItemList',
  errorMessage: {
    noData: 'No book in this list.',
    failedRequest: 'Unable to complete this request. Something might be wrong with the server.'
  }
};

export default BookItemList;
