// Import React Libraries
import React from 'react';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import Owner from '../Owner/Owner.jsx';
import Lists from '../Lists/Lists.jsx';


// Create the class
class Booklists extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
    // replaces getInitialState()
    this.state = Store.getState();

    // Allows binding methods that reference this
    this._goToLink = this._goToLink.bind(this);
  }

  // Listen to the change from data
  componentDidMount() {
    Store.listen(this._onChange.bind(this));
    // Here we would fetch our data async
    // Actions.fetchData();
  }

  // Stop listening
  componentWillUnmount() {
    Store.unlisten(this._onChange.bind(this));
  }

  // Change the this.state here if find any different
  _onChange() {
    this.setState(Store.getState());
  }

  _goToLink(target) {
    window.location.replace(target);
    console.log("trigger");
  }


  // Render DOM
  render () {
    console.log(this.state);

    let root = 'localhost:3001/';

    // Throw error message if anything's wrong
    if (this.state.errorMessage) {
      return (
        <div>Something is wrong</div>
      );
    }

    // The variable to store the data from Store
    let dataArray = this.state.Data

    // Throw message if there's no data found
    if (!dataArray.length) {
      return (
        <div>loading...</div>
      );
    } else {
      
      // Parse the list of owners if data is correctly delivered
      let owners = dataArray.map(function (element) {
        return(
          <div style={{margin:20+'px'}}>
            <Owner key={`owner ${element.attributes.username}`}
            id={element.attributes.username}  
            className={element.attributes.username}
            label={element.attributes.name}
            target={`${root}${element.attributes.username}`} />
          </div>
        );
      });
      // Render the list of owners on DOM
      return (
        <div id='main'>
          <div id='booklists' className='booklists' style={{margin:20+'px'}}>
            {owners}
          </div>
        </div>
      );
    }
  }
};


Booklists.defaultProps = {
  lang: 'en'
};

const styles = {
};

export default Booklists;
