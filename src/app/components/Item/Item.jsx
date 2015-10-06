// Import React Libraries
import React from 'react';
import Router from 'react-router';

// Import Components
import SimpleButton from '../Buttons/SimpleButton.jsx';
import BookCover from '../BookCover/BookCover.jsx';

import Actions from '../../actions/Actions.js';

// The method allows us to transit between pages internally
let Navigation = Router.Navigation,
  Item = React.createClass({
    // For internal transition
    mixins: [Navigation],
    getInitialState() {
      return {};
    },
    render() {
      // Only need the covers from the first 4 books
      let bookCoverArray = this.props.sampleBookCovers.slice(0, 4),
        // Parse the list of book covers if data is correctly delivered
        bookCovers = bookCoverArray.map((element, i) => {
          return(
            <div className={`${this.props.className}__image-wrapper__book-cover`} key={i}>
              <BookCover id={`${this.props.id}__image-wrapper__book-cover__${element.item.attributes.title}`}
              className={`${this.props.className}__image-wrapper__book-cover__cover-image`}
                name={element.item.attributes.title}
                isbn={element.item.attributes.isbns[0]} />
            </div>
          );
        });

      return (
        <div id={this.props.id} className={this.props.className}>
          <div className={`${this.props.className}__text-wrapper`}>
            <SimpleButton id={this.props.name}
              className={`${this.props.className}__text-wrapper__name`}
              label={this.props.name}
              target={this.props.target}
              onClick={this._fetchBookData} />
            <p className={`${this.props.className}__text-wrapper__description`}>
              {this.props.description}
            </p>
            <p className={`${this.props.className}__text-wrapper__createdDate`}>
              {this.props.createdDate}
            </p>
          </div>
          <div className={`${this.props.className}__image-wrapper`}>
            {bookCovers}
          </div>
        </div>
      );
    },

    // Passing the transition function here so that we can execute an
    // event.preventDefault() call here.
    _fetchBookData(e) {
      e.preventDefault();

    // First call and get the data and then transition to the route.
      // Errors need to be handled.
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: `/api/ajax/listID/${this.props.listId}`,
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

Item.defaultProps = {
  lang: 'en'
};

// Export components
export default Item;
