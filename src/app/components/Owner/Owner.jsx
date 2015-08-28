// Import React Libraries
import React from 'react';

// Import Components
import SimpleButton from '../Buttons/SimpleButton.jsx';

class Owner extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
    	<SimpleButton id={this.props.id}  
      className={this.props.className}
      label={this.props.label}
      target={this.props.target} />
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