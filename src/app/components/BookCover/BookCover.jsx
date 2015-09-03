// Import React Libraries
import React from 'react';
// Import Components

class BookCover extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div style={{margin:20+'px'}}>
        {this.props.name}
      </div>
    );
  }
};

BookCover.defaultProps = {
  lang: 'en'
};

const styles = {
};

// Export components
export default BookCover;