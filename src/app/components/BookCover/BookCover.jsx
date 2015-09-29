// Import React Libraries
import React from 'react';

class BookCover extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    let imageSrc=`https://contentcafe2.btol.com/ContentCafe/` +
        `Jacket.aspx?&userID=NYPL49807&password=CC68707&` +
        `Value=${this.props.isbn}&content=M&Return=1&Type=M`;

    return (
      <div style={styles.BookCoverContainer}>
        <img src={imageSrc} style={styles.BookCover} alt={this.props.name} />
      </div>
    );
  }
};

BookCover.defaultProps = {
  lang: 'en'
};

const styles = {
    BookCoverContainer: {
      marginRight: '-100px'
    },
    BookCover: {
      backgroundRepeat: 'no-repeat',
      display: 'inline-block',
      height: '200px',
      width: 'auto'
    }
  };

// Export components
export default BookCover;
