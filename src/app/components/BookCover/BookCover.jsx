// Import React Libraries
import React from 'react';

class BookCover extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    this.state = {
      imageEndpoint : 'https://contentcafe2.btol.com/ContentCafe/' +
        'Jacket.aspx?&userID=NYPL49807&password=CC68707&' +
        'Value=',
      imageArgument : '&content=M&Return=1&Type=M',
      placeHolderEndpoint : '/images/book-place-holder.png'
    }
  }

  render () {
    let imageSrc = (this.props.isbn && this.props.isbn !== undefined) ?
      `${this.state.imageEndpoint}${this.props.isbn}${this.state.imageArgument}` :
      // Show the place holder if the book cover's ISBN is not available
      this.state.placeHolderEndpoint;

    return (
      <div id={`${this.props.id}-place-holder`}>
        <img id={this.props.id} className={this.props.className}
          ref='coverImage'
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
