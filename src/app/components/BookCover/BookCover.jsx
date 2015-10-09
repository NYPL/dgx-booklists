// Import React Libraries
import React from 'react';

class BookCover extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    let imageSrc = (this.props.isbn && this.props.isbn !== undefined) ?
      `https://contentcafe2.btol.com/ContentCafe/` +
      `Jacket.aspx?&userID=NYPL49807&password=CC68707&` +
      `Value=${this.props.isbn}&content=M&Return=1&Type=M` :
      // Show the place holder if the book cover's ISBN is not available
      `/images/book-place-holder.png`;

      console.log(imageSrc);

    return (
      <div id={`${this.props.id}-place-holder`} className={`place-holder`}>
        <img id={this.props.id} className={this.props.className}
        src={imageSrc} alt={this.props.name} />
      </div>
    );
  }
};

BookCover.defaultProps = {
  lang: 'en'
};

// Export components
export default BookCover;
