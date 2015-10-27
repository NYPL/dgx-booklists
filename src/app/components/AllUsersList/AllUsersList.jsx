// Import React Libraries
import React from 'react';
import Router from 'react-router';
import DocMeta from 'react-doc-meta';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import Hero from '../Hero/Hero.jsx';
import ErrorMessage from '../errorMessage/errorMessage.jsx';

import utils from '../../utils/utils.js';

// The method allows us to transit between pages internally
let Navigation = Router.Navigation,
// Create the class. Use ES5 for react-router Navigation
  AllUsersList = React.createClass({
    // For internal transition
    mixins: [Navigation],
    // Set up initial state
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
    // Render DOM
    render() {
      // The variable to store the data from Store
      let allUsersList = this.state.allUsersList,
        // Render data or throw error page
        content = (allUsersList && allUsersList.length) ?
          allUsersList.map((element, i) => {
            return (
              <div className={`${this.props.className}__userlink-wrapper`} key={i}>
                <a id={`${this.props.id}__${element.attributes.username}`}
                  className={`${this.props.className}__userlink`}
                  onClick={this._fetchUserLists.bind(this, element.attributes.username, 5, 1)}>
                    {element.attributes.name}
                </a>
              </div>
            );
          })
          : <ErrorMessage className='error-message all-user-list'
            messageContent={this.props.errorMessage.noData} />,
        errorInfo = this.state.errorInfo,
        errorStatus,
        errorTitle;

      // Throw error message if something's wrong
      if (errorInfo) {
        errorStatus = errorInfo.status;
        errorTitle = errorInfo.title;
        content = <ErrorMessage className='error-message'
          messageContent={this.props.errorMessage.failedRequest} />;
        console.warn(`Server returned a ${errorStatus} status. ${errorTitle}.`);
      }

      return (
        <div id='main' className='main'>
          <Hero />
          <div id={`${this.props.id}`} className={`${this.props.className}`}>
            {content}
          </div>
        </div>
      );
    },

    /**
    * _fetchUserLists(username)
    * Fetch the data we need for UserLists
    * before the app transit us to UserLists page
    *
    * @param (String) username
    */
    _fetchUserLists(username, pageSize, pageNumber) {
      if (!username || !pageSize || !pageNumber) {
        console.log('Unavailable parameters for the request.');
        return;
      }
      // First fetch the data and then transition. Must also handle errors.
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: `/browse/recommendations/lists/api/ajax/username/${username}&${pageSize}&${pageNumber}`,
        success: data => {
          // Update the store for the list of lists a user has.
          Actions.updateUserLists(data.data);
          // Update the number of the lists we get from the refinery API
          Actions.updateListsNumber(data.listsNumber);
          // Check if any error from the Refinery
          if (data.errorInfo) {
            Actions.failedData(data.errorInfo);
            console.warn(`Server returned a ${data.errorInfo.status} status. ${data.errorInfo.title}.`);
          }
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
      this.transitionTo('UserLists', {
        UserLists: username
      });
    }
});

AllUsersList.defaultProps = {
  lang: 'en',
  id: 'all-users-list',
  className: 'all-users-list',
  errorMessage: {
    noData: 'No user here.',
    failedRequest: 'Unable to complete this request. Something might be wrong with the server.'
  }
};

const styles = {
};

export default AllUsersList;
