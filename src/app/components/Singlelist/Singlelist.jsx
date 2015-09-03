// Import React Libraries
import React from 'react';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import Item from '../Item/Item.jsx';
import SimpleButton from '../Buttons/SimpleButton.jsx';

// Create the class
class Singlelist extends React.Component {

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

    // Throw error message if anything's wrong
    if (this.state.errorMessage) {
      return (
        <div>Something is wrong</div>
      );
    }

    // The variable to store the data from Store
    let dataArray = this.state.Data['list-items']

    console.log(this.state.Data);

    // Throw message if there's no data found
    if (!dataArray.length) {
      return (
         <div>No book under this list</div>
      );
    } else {
      
      // Parse the list of books if data is correctly delivered
      let items = dataArray.map(function (element) {
        return(
          <div style={{margin:20+'px'}}>
            <Item name={element.item.attributes.title} />
          </div>
        );
      });
      // Render the list of owners on DOM
      return (
        <div id='main'>
          <div id='singlelist' className='singlelist' style={{margin:20+'px'}}>
            <SimpleButton label={`Go back to the list of ${this.state.Data.user.attributes.name}`} 
            target={`/${this.state.Data.user.id}`} />
            {items}
          </div>
        </div>
      );
    }
  }
};


Singlelist.defaultProps = {
  lang: 'en'
};

const styles = {
};

export default Singlelist;