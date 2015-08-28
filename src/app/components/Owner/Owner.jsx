// Import React Libraries
import React from 'react';

class Owner extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
    	<div>
		    <p>{this.props.name}</p>
    	</div>
    );
  }
};

Owner.defaultProps = {
  lang: 'en'
};

const styles = {
};

// Export components
export default Owner;