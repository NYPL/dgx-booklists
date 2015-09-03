// Import React Libraries
import React from 'react';
// Import Components
import SimpleButton from '../Buttons/SimpleButton.jsx';

class Item extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <SimpleButton key={`item ${this.props.name}`}
      id={this.props.name}  
      className={this.props.name}
      label={this.props.name} />
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