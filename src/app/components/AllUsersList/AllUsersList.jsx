// Import React Libraries
import React from 'react';
import PropTypes from 'prop-types';

// ALT FLUX
import Store from '../../stores/Store.js';

// Import Components
import Hero from '../Hero/Hero.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import AllUsersListElement from '../AllUsersListElement/AllUsersListElement';

// Create the class. Use ES5 for react-router Navigation
class AllUsersList extends React.Component {

  constructor(props) {
    super(props);
    this.state = Store.getState();
    this.onChange = this.onChange.bind(this);
  }

  // Change the this.state here if find any different
  onChange() {
    this.setState(Store.getState());
  }
  // Render DOM
  render() {
    // The variable to store the data from Store
    const allUsersList = this.state.allUsersList;
      // Render data or throw error page
    let content = (allUsersList && allUsersList.length) ?
      allUsersList.map((element, i) => {
        return (
          <AllUsersListElement
            className={this.props.className}
            key={i}
            parentId={this.props.id}
            username={element.attributes.username}
            id={element.id}
            name={element.attributes.name}
          />
        );
      })
      : (
      <ErrorMessage
        errorClass="all-user-list-error"
        messageContent={this.props.errorMessage.noData}
      />);
    let errorStatus;
    let errorTitle;
    const errorInfo = this.state.errorInfo;

    // Throw error message if something's wrong
    if (errorInfo) {
      errorStatus = errorInfo.status;
      errorTitle = errorInfo.title;
      content = (<ErrorMessage
        errorClass="all-user-list-error"
        messageContent={this.props.errorMessage.failedRequest}
      />);
      console.warn(`Server returned a ${errorStatus} status. ${errorTitle}.`);
    }

    return (
      <div id="main" className="main">
        <Hero />
        <div id={`${this.props.id}`} className={`${this.props.className}`}>
          {content}
        </div>
      </div>
    );
  }
}

AllUsersList.defaultProps = {
  lang: 'en',
  id: 'all-users-list',
  className: 'all-users-list',
  errorMessage: {
    noData: 'No user here.',
    failedRequest: 'Unable to complete this request. Something might be wrong with the server.',
  },
};

AllUsersList.contextTypes = {
  router: PropTypes.object,
};

export default AllUsersList;
