// Import React Libraries
import React from 'react';

// Import Router and it's navigation
import Router from 'react-router';

import DocMeta from 'react-doc-meta';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import Hero from '../Hero/Hero.jsx';
import SimpleButton from '../Buttons/SimpleButton.jsx';
import BookCover from '../BookCover/BookCover.jsx';
import BookItem from '../BookItem/BookItem.jsx';

import utils from '../../utils/utils.js';

// The method allows us to transit between pages internally
let Navigation = Router.Navigation,
// Create the class. Use ES5 for react-router Navigation
  BookItemList = React.createClass({
    // For internal transition
    mixins: [Navigation],
    getInitialState() {
      return Store.getState();
    },
    // Listen to the change from data
    componentDidMount() {
      Store.listen(this._onChange.bind(this));
    },
    // Stop listening
    componentWillUnmount() {
      Store.unlisten(this._onChange.bind(this));
    },
    // Change the this.state here if find any different
    _onChange() {
      this.setState(Store.getState());
    },
    // Render DOM
    render() {
      // Throw error message if anything's wrong
      if (this.state.errorMessage) {
        return (
          <div>Something is wrong</div>
        );
      }

      // The variable to store the data from Store
      let bookItemList = this.state.bookItemList,
        userId = bookItemList.user ? bookItemList.user.id : '',
        userDisplayName = bookItemList.user ? bookItemList.user.attributes.name : '',
        listId = bookItemList.id || '',
        listItems = bookItemList['list-items'] ? bookItemList['list-items'] : [],
        listName = bookItemList.attributes ? bookItemList.attributes['list-name'] : '',
        listIntro = bookItemList.attributes ? bookItemList.attributes['list-description'] : '',
        encoreUrl = 'http://nypl-encore-test.iii.com/iii/encore/record/C__Rb',
        description = 'A list created by staff at The New York Public Library',
        pageTags = [
          // Required OG meta tags
          {property: "og:title", content: `${listName} | The New York Public Library`},
          {property: "og:url", content: `http://www.nypl.org/browse/recommendations/lists/${userId}/${listId}`},
          {property: "og:image", content: ''},
          {property: "og:description", content: description},
          {name: "twitter:description", content: description},
          {name: "twitter:image", content: ''}
        ],
        tags = utils.metaTagUnion(pageTags),
        bookItems = (listItems && listItems.length) ?
          listItems.map((element, i) => {
            let target = `${encoreUrl}${element.item.id}?lang=eng`,
              publishedDate = `${element.item.attributes.format} - ${element.item.attributes['publication-date']}`,
              itemId = element.item.id,
              bookItemName = element.item.attributes.title,
              bookItemDescription = element.attributes.annotation,
              bookCoverIsbn = element.item.attributes.isbns[0],
              authors = (element.item.attributes.authors.length) ?
                `By ${element.item.attributes.authors}` : `The author of this item is not available`;

            return(
              <BookItem id={this.props.id}
                className={this.props.className}
                key={i}
                itemId={itemId}
                target={target}
                publishedDate={publishedDate}
                bookItemName={bookItemName}
                bookItemDescription={bookItemDescription}
                bookCoverIsbn={bookCoverIsbn}
                authors={authors} />
            );
          })
          :<div>No book under this list</div>;

      // Render the list of owners on DOM
      return (
        <div id='main'>
          <DocMeta tags={tags} />
          <Hero name={listName} intro={listIntro}/>
          <div className='bookItemList-wrapper'>
            <div id={`${this.props.id}__back-button-wrapper`}
            className={`${this.props.className}__back-button-wrapper`}>
              <a id={`${this.props.id}__back-button-wrapper__button`}
              className={`${this.props.className}__back-button-wrapper__button`}
                onClick={this._fetchUserLists.bind(this, userId, 5, 1)}>
                <div
                className=
                {`${this.props.className}__back-button-wrapper__button__icon nypl-icon-circle-arrow-left`}>
                </div>
                 <div
                className=
                {`${this.props.className}__back-button-wrapper__button__icon-desktop nypl-icon-arrow-up`}>
                </div>
                <div className={`${this.props.className}__back-button-wrapper__button__text-wrapper`}>
                  <p>back to</p>
                  <p>{userDisplayName}</p>
                  <p>lists</p>
                </div>
              </a>
            </div>
            <div id={this.props.id} className={this.props.className}>
              <div id={`${this.props.id}__${listName}`}
              className={`${this.props.className}__name`}>
                <a id={`${this.props.id}__name__button`}
                className={`${this.props.className}__name__button`}
                  onClick={this._fetchUserLists.bind(this, userId, 5, 1)}>
                  {userDisplayName}
                </a>
                {bookItems}
              </div>
            </div>
          </div>
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
      if (!Store.getUserLists()) {
        // First fetch the data and then transition. Must also handle errors.
        $.ajax({
          type: 'GET',
          dataType: 'json',
          url: `/api/ajax/username/${userId}&${pageSize}&${pageNumber}`,
          success: data => {
            // Update the store for the list of lists a user has.
            Actions.updateUserLists(data.data);
            Actions.updateListsNumber(data.listsNumber);
            // Now transit to the route.
            this._transitionToUser(userId);
          }
        });
      } else {
        this._transitionToUser(userId);
      }
    },

    _transitionToUser(userId) {
      // Now transit to the route.
      this.transitionTo('UserLists', {
        UserLists: userId
      });
    }
  });

BookItemList.defaultProps = {
  lang: 'en',
  id: 'bookItemList',
  className: 'bookItemList'
};

export default BookItemList;