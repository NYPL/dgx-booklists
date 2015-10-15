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
      placeHolderEndpoint : '/images/book-place-holder.png',
      isLoaded : false,
      nativeWidth: 0
    }
  }

  // Listen to the change from data
  componentDidMount() {
    this.refs.coverImage.getDOMNode().addEventListener('load', () => {
      this.setState({nativeWidth: this.refs.coverImage.getDOMNode().width});
      this.setState({isLoaded: true});
     }, true);
  }

  // Stop listening
  componentWillUnmount() {
    
  }

  render () {
    let imageSrc = (this.props.isbn && this.props.isbn !== undefined) ?
      `${this.state.imageEndpoint}${this.props.isbn}${this.state.imageArgument}` :
      // Show the place holder if the book cover's ISBN is not available
      this.state.placeHolderEndpoint,
      theImage = this.refs.coverImage,
      isLoaded = this.state.isLoaded,
      nh,
      getNaturalDimension = setInterval(() => {
        if (isLoaded === true) {
          clearInterval(getNaturalDimension);
          console.log(this.state.nativeWidth);
        } else {
// nh = this.refs.coverImage.getDOMNode().naturalHeight;
// if (nh < 10) {
//   console.log(nh);
// }
          
        }
      }.bind(this), 1000);

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
