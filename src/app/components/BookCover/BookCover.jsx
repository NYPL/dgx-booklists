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
      <img id={this.props.id} className={this.props.className} src={imageSrc}
      alt={this.props.name} />
    );
  }
};

BookCover.defaultProps = {
  lang: 'en'
};

// Export components
export default BookCover;
