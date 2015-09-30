// Import React Libraries
import React from 'react';
import Router from 'react-router';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import Hero from '../Hero/Hero.jsx';
import SimpleButton from '../Buttons/SimpleButton.jsx';

let Navigation = Router.Navigation;

// Create the class. Use ES5 for react-router Navigation
let Booklists = React.createClass({

  mixins: [Navigation],

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

  _goToLink(username) {
    console.log('go to username ' + username);

    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: `/api/ajax/username/${username}`,
      success: data => {
        console.log(data);

        Actions.updateUserLists(data.data);
        this.transitionTo('ownerlists', {
          ownerlists: username
        });
      }
    });
  },

  // Render DOM
  render () {
    // The variable to store the data from Store
    let dataArray = this.state.allUsersList,
      // Render the data
      ownersButtons = (dataArray.length) ? 
        dataArray.map((element, i) => {
          return (
            <div style={{margin:20+'px'}} key={i}>
              <a id={element.attributes.username}  
                className={element.attributes.username}
                onClick={this._goToLink.bind(this, element.attributes.username)}>
                  {element.attributes.name}
              </a>
            </div>
          );
        })
        // If there's no data, display the no list message
        : <div>No List Here</div>;

    // Throw error message if anything's wrong
    if (this.state.errorMessage) {
      return (
        <div>Something is wrong</div>
      );
    } else {
      return (
        <div id='main'>
          <Hero />
          <div id='booklists' className='booklists' style={styles.booklistsContainer}>
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
  booklistsContainer: {
    margin: '20px'
  }
};

export default Booklists;
