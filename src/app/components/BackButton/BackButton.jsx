import React from 'react';
import axios from 'axios';

import utils from '../../utils/utils.js';
import Actions from '../../actions/Actions.js';

class BackButton extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
  * handleClick(userId, pageSize, pageNumber)
  * Fetch the data we need for UserLists
  * before the app transit us to UserLists page
  *
  * @param (String) userId
  * @param (String) pageSize
  *@ param (String) pageNumber
  */
  handleClick(userId, pageSize, pageNumber) {
    if (!userId || !pageSize || !pageNumber) {
      console.log('Unavailable parameters for the request.');
      return;
    }

    utils._trackLists('Go back to...', userId);

    axios
      .get(`/books-music-dvds/recommendations/lists/api/ajax/username/${userId}&${pageSize}&${pageNumber}`)
      .then(response => {

          // Update the store for the list of lists a user has.
          Actions.updateUserLists(response.data.data);
          Actions.updateListsNumber(response.data.listsNumber);
          // Check if any error from the Refinery
          if (response.data.errorInfo) {
            Actions.failedData(response.data.errorInfo);
            console.warn(`Server returned a ${response.data.errorInfo.status} status. ${response.data.errorInfo.title}.`);
          }
      })
      .then(() => {
        this.context.router.push(`/books-music-dvds/recommendations/lists/${userId}`);
      });
  }

  render() {

    return (
      <div
        id={`back-button-wrapper`}
        className="back-button-wrapper"
      >
        <a
          id="back-button"
          className="back-button"
          onClick={() => this.handleClick(this.props.userId, 5, 1)}
        >
          <span className="back-button__icon nypl-icon-circle-arrow-left">
          </span>
          <div className="back-button__text">
            <p>back to
              <span className="back-button__text__icon-desktop nypl-icon-arrow-up">
              </span>
            </p>
            <p>{this.props.userDisplayName}</p>
            <p>lists</p>
          </div>
        </a>
      </div>
    )
  }
}

BackButton.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

// Export components
export default BackButton;
