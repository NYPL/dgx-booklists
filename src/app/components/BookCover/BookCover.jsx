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
      isLoaded : false
    }
  }

  // Listen to the change from data
  componentDidMount() {
    this.refs.coverImage.getDOMNode().addEventListener('load', () => {loaded = true; }, true);
  }

  // Stop listening
  componentWillUnmount() {
    
  }

  render () {
    let imageSrc = (this.props.isbn && this.props.isbn !== undefined) ?
      `${this.state.imageEndpoint}${this.props.isbn}${this.state.imageArgument}` :
      // Show the place holder if the book cover's ISBN is not available
      this.state.placeHolderEndpoint,
      loaded = false,
      wait = setInterval(function () {
        loaded ? clearInterval(wait) : console.log('done!');
      }, 0),
      imageElement;

      // console.log(imageSrc);

//   img.addEventListener('load', () => {loaded = true; }, true);


    

    return (
      <div id={`${this.props.id}-place-holder`}>
        <img id={this.props.id} className={this.props.className}
        ref='coverImage'
        src={imageSrc} alt={this.props.name} />
      </div>
    );

//  imageElement = this.refs.coverImage;

// console.log(imageElement);

  }

 // this.imageElement = document.getElementById(this.props.id);
 // console.log('>>>>>>>>>>>>>' + this.img);

};




BookCover.defaultProps = {
  lang: 'en'
};

// Export components
export default BookCover;
