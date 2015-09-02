// Import React Libraries
import React from 'react';
// Import Components
import SimpleButton from '../Buttons/SimpleButton.jsx';

import BookApiService from '../../utils/BookApiService.js'

class Item extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  // console.log(BookApiService.getBook('479507199-17217252'));

  render () {
    return (
      <SimpleButton key={`item ${this.props.itemId}`}
      id={this.props.itemId}  
      className={this.props.itemId}
      label={this.props.itemId}
      target={`https://nypl.bibliocommons.com/item/show/${this.props.itemId}`} />
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