// Import React Libraries
import React from 'react';
import Router from 'react-router';

// Import Components
import SimpleButton from '../Buttons/SimpleButton.jsx';
import BookCover from '../BookCover/BookCover.jsx';

import Actions from '../../actions/Actions.js';

// Import Misc
import cx from 'classnames'

class BookItem extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);

    // The default values of input fields
    this.state = {
    };
  }

  render() {
    let haveContentClass = cx({
      '':this.props.bookItemDescription,
      'no-content': !this.props.bookItemDescription
    });

    return (
      <div id={`${this.props.id}-${this.props.itemId}`}
        className={this.props.className} key={this.props.key}>
        <div className={`${this.props.className}__title`}>
          <SimpleButton id={`${this.props.itemId}`}
            className='name'
            label={this.props.bookItemName}
            target={this.props.target} />
          <p className='author'>
            {this.props.authors}
          </p>
        </div>
        <div className={`${this.props.className}__detail`}>
          <a className='image-wrapper' href={this.props.target}>
            <BookCover isbn={this.props.bookCoverIsbn}
              name={this.props.bookItemName}
              className='cover-image' />
          </a>
          <div className='text-wrapper'>
            <div className='desktop-title'>
              <SimpleButton id={`desktop-title__${this.props.itemId}`}
                className='desktop-title__name'
                label={this.props.bookItemName}
                target={this.props.target} />
              <p className='desktop-title__author'>
                {this.props.authors}
              </p>
            </div>
            <p className={`description ${haveContentClass}`}>
              {this.props.bookItemDescription}
            </p>
            <p className='catalog'>
              {this.props.catalogInfo}
            </p>
          </div>
        </div>
        <div className='request'>
          <SimpleButton id={`request__${this.props.itemId}`}
            className='request__button'
            label='request this item'
            target={this.props.target} />
        </div>
      </div>
    );
  }
}

BookItem.defaultProps = {
  lang: 'en',
  id: 'bookItem',
  className: 'bookItem'
};

// Export components
export default BookItem;
