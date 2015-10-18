// Import React Libraries
import React from 'react';
import Router from 'react-router';
import Radium from 'radium';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import SimpleButton from '../Buttons/SimpleButton.jsx';
import BookCover from '../BookCover/BookCover.jsx';
import BookItem from '../BookItem/BookItem.jsx';
import PaginationButton from '../Buttons/PaginationButton.jsx';

import utils from '../../utils/utils.js';

// The method allows us to transit between pages internally
let Navigation = Router.Navigation,

  // Create the class. Use ES5 for react-router Navigation
  BookItemList = React.createClass({
  // For internal transition
    mixins: [Navigation],

    getInitialState() {
      return {
        storeData: Store.getState()
      };
    },

    componentDidMount() {
      Store.listen(this._onChange.bind(this));
    },

    componentWillUnmount() {
      Store.unlisten(this._onChange.bind(this));
    },

    _onChange() {
      this.setState(Store.getState());
    },

    render() {
      // The variable to store the data from Store
      let bookItemList = this.state.storeData.bookItemList,
        userId = bookItemList.user ? bookItemList.user.id : '',
        userDisplayName = bookItemList.user ? bookItemList.user.attributes.name : '',
        listId = bookItemList.id || '',
        listItems = bookItemList['list-items'] ? bookItemList['list-items'] : [],
        listName = bookItemList.attributes ? bookItemList.attributes['list-name'] : '',
        listIntro = bookItemList.attributes ? bookItemList.attributes['list-description'] : '',
        encoreUrl = 'http://browse.nypl.org/iii/encore/record/C__Rb',
        bookCoverItems = (listItems && listItems.length) ?
          listItems.map((element, i) => {
            let target = `${encoreUrl}${element.item.id}?lang=eng`,
              itemId = element.item.id,
              bookItemName = element.item.attributes.title,
              bookCoverIsbn = element.item.attributes.isbns[0];

            return(
              <li>
                <a href={target} className='bookItem' target='_parent'>
                  <BookCover
                    id={itemId}
                    isbn={bookCoverIsbn}
                    name={bookItemName}
                    className='cover-image' key={i}/>
                </a>
              </li>
            );
          })
          : null;

      if (bookCoverItems !== null) {
        styles.bookItemsWidth.width = `${bookCoverItems.length * 149 - 29}px`;
      }

      // Render the list of owners on DOM
      return (
        <div>
          <div id='widget-container' className='widget-container'>
            <ul id={`${this.props.id}`} className={`${this.props.className}`}
              style={styles.bookItemsWidth}>
              {bookCoverItems}
            </ul>
          </div>
          <a className={`${this.props.className}-listLink`} onClick={this._fetchBookData}>
            <p className={`${this.props.className}-listTitle`}>{listName} @ {userDisplayName}</p>
          </a>
        </div>
      );
    },

    /**
    * _fetchBookData(e)
    * Make an AJAX call to get the data, and then transit to the route.
    *
    * @param {event} e
    */
    _fetchBookData(e) {
      e.preventDefault();
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: `/browse/recommendations/lists/api/ajax/listID/${this.props.listId}`,
        error: (jqXHR, textStatus, errorThrown) => {
          console.log(`Unavailabe to complete the request. Run into a ${textStatus} for ${errorThrown}`);
        },
        success: data => {
          // Update the Store for a specific list of books:
          Actions.updateBookList(data.data);
          // Transition to the new route.
          this._transitionTo(this.props.userId, this.props.listId);
        }
      });
    },

    _transitionTo(userId, listId) {
      // Transition to the new route.
      this.transitionTo('BookItemList', {
        UserLists: userId,
        id: listId
      });
    }
  });

let styles = {
  bookItemsWidth: {
    width: '4500px'
  }
};

BookItemList.defaultProps = {
  lang: 'en',
  id: 'bookListWidget',
  className: 'bookListWidget'
};

export default Radium(BookItemList);
