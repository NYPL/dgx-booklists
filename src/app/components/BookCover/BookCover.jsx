// Import React Libraries
import React from 'react';

class BookCover extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    this.state = {
      imageSrc: (this.props.isbn && this.props.isbn !== undefined) ?
        `${this.props.imageEndpoint}${this.props.isbn}${this.props.imageArgument}` :
        // Show the place holder if the book cover's ISBN is not available
        this.props.placeHolderEndpoint,
      // The original width of the source image
      naturalWidth: 120,
      errorStatus: ''
    }
  }

  // Listen to the changes on components
  componentDidMount() {
    // After the cover image is loaded
    this.refs.coverImage.getDOMNode().addEventListener('load', () => {
      // Set the natural width to of source image to the component
      this.setState({naturalWidth: this.refs.coverImage.getDOMNode().naturalWidth}, () => {
        // Detect the natural width if it is smaller then 10px, set the image source to the place holder
        if (this.state.imageSrc !== this.props.placeHolderEndpoint &&
          this.state.naturalWidth < 10 && this.state.naturalWidth > 0) {
          this.setState({
            imageSrc: this.props.placeHolderEndpoint,
            errorStatus: 'one-pixel'
          });
        }
      });
    }, true);
  }

  // Stop listening
  componentWillUnmount() {

  }

  render () {
    return (
      <div id={`${this.props.id}-place-holder`}>
        <img id={this.props.id} className={`${this.props.className} ${this.state.errorStatus}`}
          ref='coverImage'
          src={this.state.imageSrc} alt={this.props.name} />
      </div>
    );
  }
};

BookCover.defaultProps = {
  lang: 'en',
  imageEndpoint : 'https://contentcafe2.btol.com/ContentCafe/' +
    'Jacket.aspx?&userID=NYPL49807&password=CC68707&' +
    'Value=',
  imageArgument : '&content=M&Return=1&Type=M',
  placeHolderEndpoint : '/images/book-place-holder.png',
  isbn: ''
};

// Export components
export default BookCover;
