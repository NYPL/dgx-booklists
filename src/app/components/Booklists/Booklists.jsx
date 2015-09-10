// Import React Libraries
import React from 'react';

// Import Router
import Router from 'react-router';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import SimpleButton from '../Buttons/SimpleButton.jsx';


// Create the class
class Booklists extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
    // replaces getInitialState()
    this.state = Store.getState();
  }

  // Listen to the change from data
  componentDidMount() {
    Store.listen(this._onChange.bind(this));
  }

  // Stop listening
  componentWillUnmount() {
    Store.unlisten(this._onChange.bind(this));
  }

  // Change the this.state here if find any different
  _onChange() {
    this.setState(Store.getState());
  }


  // Render DOM
  render () {
    console.log(Store.getState());
    
    // The variable to store the data from Store
    let dataArray = this.state.Data;

    // Render the data
    let ownersButtons = (dataArray.length) ? 
      dataArray.map(function (element) {
        return(
          <div style={{margin:20+'px'}}>
            <SimpleButton key={`owner ${element.attributes.username}`}
            id={element.attributes.username}  
            className={element.attributes.username}
            label={element.attributes.name}
            target={`/${element.attributes.username}`} />
          </div>
        );
      // If there's no data, throw the no list message
      }) : <div>No List Here</div>;

    // Throw error message if anything's wrong
    if (this.state.errorMessage) {
      return (
        <div>Something is wrong</div>
      );
    } else {
      return (
        <div id='main'>
          <div id='booklists' className='booklists' style={{margin:20+'px'}}>
            {ownersButtons}
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
