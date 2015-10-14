// Import React Libraries
import React from 'react';
import Router from 'react-router';

// Import Components
import SimpleButton from '../Buttons/SimpleButton.jsx';
import BookCover from '../BookCover/BookCover.jsx';

import Actions from '../../actions/Actions.js';

// <<<<<<< HEAD
// // The method allows us to transit between pages internally
// let Navigation = Router.Navigation,
//   BookItem = React.createClass({
//     // For internal transition
//     mixins: [Navigation],
//     getInitialState() {
//       return {};
//     },
//     render() {
//       return (
//         <div id={this.props.bookItemId} className={`${this.props.className}__item`} key={this.props.key}>
//           <div className={`${this.props.className}__item__title-wrapper`}>
//             <SimpleButton id={`${this.props.id}__item__title-wrapper__${this.props.idTag}`}
//               className={`${this.props.className}__item__title-wrapper__name`}
//               label={this.props.bookItemName}
//               target={this.props.target} />
//             <p className={`${this.props.className}__item__title-wrapper__author`}>
//               {this.props.authors}
//             </p>
//           </div>
//           <div className={`${this.props.className}__item__detail-wrapper`}>
//             <a className={`${this.props.className}__item__detail-wrapper__image-wrapper`} href={this.props.target}>
//               <BookCover id={`${this.props.id}____item__detail-wrapper__image-wrapper__${this.props.idTag}`}
//               isbn={this.props.bookCoverIsbn}
// =======
class BookItem extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);

    // The default values of input fields
    this.state = {
    };
  }

  render() {
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
            <p className='description'>
              {this.props.bookItemDescription}
            </p>
            <p className='catalog'>
              {this.props.publishedDate}
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
