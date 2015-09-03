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
    // let bookCoverArray = this.props.sampleBookCovers;
    // Parse the list of books if data is correctly delivered
    // let bookCovers = this.props.sampleBookCovers.map(function (element) {
    //   return(
    //     <div style={{margin:20+'px'}}>
    //       <BookCover name={element.item.attributes.title} />
    //     </div>
    //   );
    // });
    return (
      <SimpleButton key={`item ${this.props.name}`}
      id={this.props.name}  
      className={this.props.name}
      label={this.props.name}
      target={this.props.target} />

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