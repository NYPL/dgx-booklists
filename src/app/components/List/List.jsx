// Import React Libraries
import React from 'react';

class List extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <p>{this.props.id}</p>
    );
  }
};

List.defaultProps = {
  lang: 'en'
};

const styles = {
};

// Export components
export default List;