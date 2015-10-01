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
let AllUsersList = React.createClass({

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

  // Render DOM
  render() {
    // The variable to store the data from Store
    let allUsersList = this.state.allUsersList,
      // Render the data
      userLinks = (allUsersList && allUsersList.length) ? 
        allUsersList.map((element, i) => {
          return (
            <div style={styles.userLinks} key={i}>
              <a id={element.attributes.username}  
                className={element.attributes.username}
                onClick={this._fetchUserLists.bind(this, element.attributes.username, 5, 1)}>
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
            {userLinks}
          </div>
        </div>
      );
    }
  },

  // Change the this.state here if find any different
  _onChange() {
    this.setState(Store.getState());
  },

  /**
  * _fetchUserLists(username)
  * Fetch the data we need for UserLists
  * before the app transit us to UserLists page
  *
  * @param (String) username
  */
  _fetchUserLists(username, pageSize, pageNumber) {
    if (!username) {
      return;
    }
    // First fetch the data and then transition. Must also handle errors.
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: `/api/ajax/username/${username}&${pageSize}&${pageNumber}`,
      success: data => {
        // Update the store for the list of lists a user has.
        Actions.updateUserLists(data.data);
        // Update the number of the lists we get from the refinery API
        Actions.updateListsNumber(data.listsNumber);

        // Now transitition to the route.
        this._transitionTo(username);
      }
    });
  },

  /**
  * _transitionTo(username)
  * Transit to the page of UserLists
  *
  * @param (String) username
  */
  _transitionTo(username) {
    // Now transitition to the route.
    this.transitionTo('UserLists', {
      UserLists: username
    });
  }

});

AllUsersList.defaultProps = {
  lang: 'en'
};

const styles = {
  booklistsContainer: {
    margin: '20px'
  },
  userLinks: {
    margin: '20px',
    cursor: 'pointer'
  }
};

export default AllUsersList;
