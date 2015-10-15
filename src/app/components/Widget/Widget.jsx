// Import React Libraries
import React from 'react';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import SimpleButton from '../Buttons/SimpleButton.jsx';
import BookCover from '../BookCover/BookCover.jsx';
import BookItem from '../BookItem/BookItem.jsx';
import PaginationButton from '../Buttons/PaginationButton.jsx';

import utils from '../../utils/utils.js';

// Create the class. Use ES5 for react-router Navigation
class BookItemList extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
  }

  componentDidMount() {
    Store.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    Store.unlisten(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(Store.getState());
  }

  render() {
    // The variable to store the data from Store
    let bookItemList = this.state.bookItemList,
      userId = bookItemList.user ? bookItemList.user.id : '',
      userDisplayName = bookItemList.user ? bookItemList.user.attributes.name : '',
      listId = bookItemList.id || '',
      listItems = bookItemList['list-items'] ? bookItemList['list-items'] : [],
      listName = bookItemList.attributes ? bookItemList.attributes['list-name'] : '',
      listIntro = bookItemList.attributes ? bookItemList.attributes['list-description'] : '',
      encoreUrl = 'http://nypl-encore-test.iii.com/iii/encore/record/C__Rb',
      bookItems = (listItems && listItems.length) ?
        listItems.map((element, i) => {
          let target = `${encoreUrl}${element.item.id}?lang=eng`,
            itemId = element.item.id,
            bookItemName = element.item.attributes.title,
            bookCoverIsbn = element.item.attributes.isbns[0];

          return(
            <a href={`${target}`} className='bookItem'>
              <BookCover isbn={bookCoverIsbn} name={bookItemName} className='cover-image' key={i}/>
            </a>
          );
        })
        : null;

    // Render the list of owners on DOM
    return (
      <div id='widget-container'>
        <div id={`${this.props.id}`} className={`${this.props.className}`}>
          {bookItems}
        </div>
      </div>
    );
  }
}

BookItemList.defaultProps = {
  lang: 'en',
  id: 'bookListWidget',
  className: 'bookListWidget'
};

export default BookItemList;
