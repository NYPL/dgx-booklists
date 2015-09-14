// Import React Libraries
import React from 'react';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import Item from '../Item/Item.jsx';

// Create the class
class Ownerlists extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
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
  render() {
    // console.log(this.state);

    // Throw error message if anything's wrong
    if (this.state.errorMessage) {
      return (
        <div>Something is wrong</div>
      );
    }

    // The variable to store the data from Store
    let dataArray = this.state.Data;

    // console.log(dataArray);

    // Throw message if there's no data found
    if (!dataArray.length) {
      return (
         <div>No list under this owner</div>
      );
    } else {   
      // Parse the list of books if data is correctly delivered
      let lists = dataArray.map((element, i) => {
        return(
          <div style={{margin:20+'px'}} key={i}>
            <Item name={element.attributes['list-name']} 
            target={`/${element.user.id}/${element.id}`}
            sampleBookCovers={element['list-items']} />
          </div>
        );
      });
      // Render the list of owners on DOM
      return (
        <div id='main'>
          <div id='ownerlists' className='ownerlists' style={{margin:20+'px'}}>
            {lists}
          </div>
        </div>
      );
    }
  }
};


Ownerlists.defaultProps = {
  lang: 'en'
};

const styles = {
};

export default Ownerlists;
