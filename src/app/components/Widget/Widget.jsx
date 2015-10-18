// Import React Libraries
import React from 'react';
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
      encoreUrl = 'http://browse.nypl.org/iii/encore/record/C__Rb',
      bookCoverItems = (listItems && listItems.length) ?
        listItems.map((element, i) => {
          let target = `${encoreUrl}${element.item.id}?lang=eng`,
            itemId = element.item.id,
            bookItemName = element.item.attributes.title,
            bookCoverIsbn = element.item.attributes.isbns[0];

          return(
            <li>
              <a href={target} className='bookItem'>
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
      styles.bookItemsWidth.width = `${bookCoverItems.length * 260}px`;
    }

    // Render the list of owners on DOM
    return (
      <div>
        <div id='widget-container'>
          <ul id={`${this.props.id}`} className={`${this.props.className}`}
            style={styles.bookItemsWidth}>
            {bookCoverItems}
          </ul>
        </div>
        <p className={`${this.props.className}-listTitle`}>
          <a href={`//nypl.org/browse/recommendations/lists/${userId}/${listId}`} target='_parent'>{listName}</a> @ {userDisplayName}
        </p>
      </div>
    );
  }
}

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
