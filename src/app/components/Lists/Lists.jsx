// Import React Libraries
import React from 'react';
// Import Components
import List from '../List/List.jsx';

class Lists extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    let listsArray = this.props.lists;

    let lists = listsArray.map(function (element) {
      return(
        <List id={element.id} />
      );
    });
    return (
    	<div>
	    	{lists}
    	</div>
    );
  }
};

Lists.defaultProps = {
  lang: 'en'
};

const styles = {
};

// Export components
export default Lists;