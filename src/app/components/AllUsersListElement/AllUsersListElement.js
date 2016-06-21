// Import React Libraries
import React from 'react';
import axios from 'axios';

import Actions from '../../actions/Actions.js';


class AllUsersListElement extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  /**
  * Fetch the data we need for UserLists
  * before the app transit us to UserLists page
  *
  * @param (String) username
  */
  handleClick(username, pageSize, pageNumber) {

    if (!username || !pageSize || !pageNumber) {
      console.log('Unavailable parameters for the request.');
      return;
    }
    // First fetch the data and then transition. Must also handle errors.
    axios
      .get(`/browse/recommendations/lists/api/ajax/username/${username}&${pageSize}&${pageNumber}`)
      .then(response => {
        // Update the store for the list of lists a user has.
        Actions.updateUserLists(response.data.data);
        // Update the number of the lists we get from the refinery API
        Actions.updateListsNumber(response.data.listsNumber);
        // Check if any error from the Refinery
        if (response.data.errorInfo) {
          Actions.failedData(response.data.errorInfo);
          console.warn(`Server returned a ${response.data.errorInfo.status} status. ${response.data.errorInfo.title}.`);
        }        
      })
      .then(response => {
        this.context.router.push('/browse/recommendations/lists/' + username);
      });
  }

  render() {
    return (
      <div className={`${this.props.className}__userlink-wrapper`} key={this.props.key}>
        <a id={`${this.props.parentId}__${this.props.username}`}
          className={`${this.props.className}__userlink`}
          onClick={this.handleClick.bind(this.props.id, this.props.id, this)}>
            {this.props.name}
        </a>
      </div>
    );    
  }
};

AllUsersListElement.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

export default AllUsersListElement;