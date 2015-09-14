// Import React Libraries
import React from 'react';

// Import Router and it's navigation
import Router from 'react-router';
let Navigation = Router.Navigation;

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import SimpleButton from '../Buttons/SimpleButton.jsx';

// Create the class
let Booklists = React.createClass({

  mixins: [Navigation],

  // Constructor used in ES6
  getInitialState() {
    return Store.getState();
  },

  // Listen to the change from data
  componentDidMount() {
    Store.listen(this._onChange.bind(this));
  },

  // Stop listening
  componentWillUnmount() {
    Store.unlisten(this._onChange.bind(this));
  },

  // Change the this.state here if find any different
  _onChange() {
    this.setState(Store.getState());
  },

  _goToLink() {
    console.log('go To Link');
    this.transitionTo('ownerlists', {
      ownerlists: 'nypl_bronx_library_ctr'
    });
  },

  // Render DOM
  render () {
    console.log(Store.getState());
    
    // The variable to store the data from Store
    let dataArray = this.state.Data;

    // Render the data
    let ownersButtons = (dataArray.length) ? 
      dataArray.map((element, i) => {
        return (
          <div style={{margin:20+'px'}} key={i}>
            <SimpleButton id={element.attributes.username}  
            className={element.attributes.username}
            label={element.attributes.name}
            onClick={this._goToLink} />
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
});

Booklists.defaultProps = {
  lang: 'en'
};

const styles = {
};

export default Booklists;
