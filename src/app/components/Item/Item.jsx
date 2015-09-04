// Import React Libraries
import React from 'react';
// Import Components
import SimpleButton from '../Buttons/SimpleButton.jsx';
import BookCover from '../BookCover/BookCover.jsx'

class Item extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    // Only need the covers from the first 4 books
    let bookCoverArray = this.props.sampleBookCovers.slice(0, 4);
    // Parse the list of book covers if data is correctly delivered
    let bookCovers = bookCoverArray.map(function (element) {
      return(
        <div style={{margin:20+'px'}}>
          <BookCover name={element.item.attributes.title}
          isbn={element.item.attributes.isbns[0]} />
        </div>
      );
    });
    return (
      <div>
        <SimpleButton key={`item ${this.props.name}`}
        id={this.props.name}  
        className={this.props.name}
        label={this.props.name}
        target={this.props.target} />
        {bookCovers}
      </div>
    );
  }
};

Item.defaultProps = {
  lang: 'en'
};

const styles = {
};

// Export components
export default Item;