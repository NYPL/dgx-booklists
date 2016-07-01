// Import React Libraries
import React from 'react';
import axios from 'axios';

// Import Components
import BookCover from '../BookCover/BookCover.jsx';

import Actions from '../../actions/Actions.js';

import utils from '../../utils/utils.js';

// The method allows us to transit between pages internally
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
  * handleClick(e)
  * Make an AJAX call to get the data, and then transit to the route.
  *
  * @param {event} e
  */
  handleClick(e) {
    e.preventDefault();

    utils._trackLists('List', this.props.name);

    axios
      .get(`/browse/recommendations/lists/api/ajax/listID/${this.props.listId}`)
      .then(response => {
        Actions.updateBookList(response.data.data);
        // Check if any error from the Refinery
        if (response.data.errorInfo) {
          Actions.failedData(response.data.errorInfo);
          console.warn(
            `Server returned a ${response.data.errorInfo.status} status. ${response.data.errorInfo.title}.`
          );
        }
      })
      .then(() => {
        this.context.router.push(
          `/browse/recommendations/lists/${this.props.userId}/${this.props.listId}`
        );
      });
  }

  render() {
    // Only need the covers from the first 4 books
    let bookCoverArray = this.props.sampleBookCovers.slice(0, 4);
      // Parse the list of book covers if data is correctly delivered
    let bookCovers = bookCoverArray.map((element, i) => {
      return (
        <div
          className="book-cover"
          key={i}
        >
          <BookCover
            id={`book-cover__${element.item.attributes.title}`}
            className="book-cover__image"
            name={element.item.attributes.title}
            isbn={element.item.attributes.isbns[0]}
          />
        </div>
      );
    });

    return (
      <div id={this.props.id} className={this.props.className}>
        <div className={`${this.props.className}__text-wrapper`}>
          <a
            id={this.props.name}
            className="name"
            target={this.props.target}
            onClick={this.handleClick}
          >
            {this.props.name}
          </a>
          <p className="description">
            {this.props.description}
          </p>
          <p className="createdDate">
            {this.props.createdDate}
          </p>
        </div>
        <div
          className={`${this.props.className}__image-wrapper`}
          onClick={this.handleClick}
        >
          {bookCovers}
        </div>
      </div>
    );
  }
}

Item.defaultProps = {
  lang: 'en',
  id: 'Item',
  className: 'Item',
};

Item.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

// Export components
export default Item;
