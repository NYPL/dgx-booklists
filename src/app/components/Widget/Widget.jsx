// Import React Libraries
import React from 'react';
// ALT FLUX
import Store from '../../stores/Store.js';
// Import Components
import BookCover from '../BookCover/BookCover.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import utils from '../../utils/utils.js';

const styles = {
  bookItemsWidth: {
    width: '4500px',
  },
};

// Create the class. Use ES5 for react-router Navigation
class BookItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.getState();
  }

  componentDidMount() {
    Store.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    Store.unlisten(this.onChange.bind(this));
  }

  onChange() {
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
            <li key={i}>
              <a href={target} className='bookItem' target='_parent'
                onClick={utils._trackLists.bind(this, 'Widget Book Image', bookItemName)}>
                <BookCover
                  id={itemId}
                  isbn={bookCoverIsbn}
                  name={bookItemName}
                  className='cover-image' key={i}/>
              </a>
            </li>
          );
        })
        : <ErrorMessage errorClassName='widget-error no-data' messageContent={this.props.errorMessage.noData} />,
      content = <div>
                  <div id='widget-container' className='widget-container'>
                    <ul id={`${this.props.id}`} className={`${this.props.className}`}
                      style={styles.bookItemsWidth}>
                      {bookCoverItems}
                    </ul>
                  </div>
                  <p className={`${this.props.className}-listTitle`}>
                    <a href={`//nypl.org/books-music-dvds/recommendations/lists/${userId}/${listId}`}
                      onClick={utils._trackLists.bind(this, 'Widget List', listName)}
                      target='_parent'>{listName}</a> @ {userDisplayName}
                  </p>
                </div>,
      errorInfo = this.state.errorInfo,
      errorStatus,
      errorTitle;

    if (listItems && listItems.length) {
      styles.bookItemsWidth.width = `${bookCoverItems.length * 149 - 29}px`;
    }

    // Throw error message if something's wrong
    if (errorInfo) {
      errorStatus = errorInfo.status;
      errorTitle = errorInfo.title;
      content = <ErrorMessage errorClass='widget-error'
                  messageContent={this.props.errorMessage.failedRequest} />;
      console.warn(`Server returned a ${errorStatus} status. ${errorTitle}.`);
    }

    // Render the list of owners on DOM
    return (
      <div>
        {content}
      </div>
    );
  }
}

BookItemList.defaultProps = {
  lang: 'en',
  id: 'bookListWidget',
  className: 'bookListWidget',
  errorMessage: {
    noData: 'No book in this list.',
    failedRequest: 'Unable to complete this request. Something might be wrong with the server.',
  },
};

export default BookItemList;
