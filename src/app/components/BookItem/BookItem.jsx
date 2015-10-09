// Import React Libraries
import React from 'react';
import Router from 'react-router';

// Import Components
import SimpleButton from '../Buttons/SimpleButton.jsx';
import BookCover from '../BookCover/BookCover.jsx';

import Actions from '../../actions/Actions.js';

// The method allows us to transit between pages internally
let Navigation = Router.Navigation,
  BookItem = React.createClass({
    // For internal transition
    mixins: [Navigation],
    getInitialState() {
      return {};
    },
    render() {
      return (
        <div id={this.props.itemId} className={`${this.props.className}__item`} key={this.props.key}>
          <div className={`${this.props.className}__item__title-wrapper`}>
            <SimpleButton id={`${this.props.id}__item__title-wrapper__${this.props.itemId}`}
              className={`${this.props.className}__item__title-wrapper__name`}
              label={this.props.bookItemName}
              target={this.props.target} />
            <p className={`${this.props.className}__item__title-wrapper__author`}>
              {this.props.authors}
            </p>
          </div>
          <div className={`${this.props.className}__item__detail-wrapper`}>
            <a className={`${this.props.className}__item__detail-wrapper__image-wrapper`} href={this.props.target}>
              <BookCover isbn={this.props.bookCoverIsbn}
                name={this.props.bookItemName}
                className={`${this.props.className}__item__detail-wrapper__image-wrapper__cover-image`} />
            </a>
            <div className={`${this.props.className}__item__detail-wrapper__text`}>
              <div className={`${this.props.className}__item__detail-wrapper__text__desktop-title`}>
                <SimpleButton id={`${this.props.id}__item__detail-wrapper__text__desktop-title__${this.props.itemId}`}
                  className={`${this.props.className}__item__detail-wrapper__text__desktop-title__name`}
                  label={this.props.bookItemName}
                  target={this.props.target} />
                <p className={`${this.props.className}__item__detail-wrapper__text__desktop-title__author`}>
                  {this.props.authors}
                </p>
              </div>
              <p className={`${this.props.className}__item__detail-wrapper__text__description`}>
                {this.props.bookItemDescription}
              </p>
              <p className={`${this.props.className}__item__detail-wrapper__text__catalog`}>
                {this.props.publishedDate}
              </p>
            </div>
          </div>
          <div className={`${this.props.className}__item__checkout`}>
            <SimpleButton id={`${this.props.id}__item__checkout__${this.props.itemId}`}
              className={`${this.props.className}__item__checkout__button`}
              label='request this item'
              target={this.props.target} />
          </div>
        </div>
      );
    }
  });

BookItem.defaultProps = {
  lang: 'en'
};

// Export components
export default BookItem;