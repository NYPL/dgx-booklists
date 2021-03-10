// Import React Libraries
import React from 'react';
import DocMeta from 'react-doc-meta';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Misc
import Moment from 'moment';
import _ from 'underscore';
import cx from 'classnames';
import axios from 'axios';

// Import Components
import Hero from '../Hero/Hero.jsx';
import Item from '../Item/Item.jsx';
import PaginationButton from '../Buttons/PaginationButton.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

import utils from '../../utils/utils.js';

class UserLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = _.extend({
      pageSize: '5',
      pageNumber: '2',
      // Tell pagination button if it is loading new pages now
      isLoading: false,
    }, Store.getState());
  }

  // Listen to the change from data
  componentDidMount() {
    // Store.listen(this._onChange.bind(this));
    // As a fallback, we check if the app fails to fetch the data.
    // If so, the app will attempt to make a call on client-side one more time.
    // Also, if the users browse the app with backward button or forward button,
    // we need to check if they have refreshed the page and lost the data in the Store.
    if (!this.state.userLists) {
      const urlUserList = (window.location.pathname).split('/');
      const urlUserListId = urlUserList[4];

      this.fetchUserLists(urlUserListId, this.state.pageSize, this.state.pageNumber);
    }
  }

  // Stop listening
  componentWillUnmount() {
    // Store.unlisten(this._onChange.bind(this));
  }

  // Change the this.state here if find any different
  _onChange() {
    this.setState(Store.getState());
  }

  /**
  * _addItems(userUrlId, pageSize, pageNumber, originalData)
  * Add five more items every time hitting the pagination button
  *
  * @param { String } UserId
  * @param { String } pageSize
  * @param { String } pageNumber
  * @param { Array }  originalData
  */
  _addItems(userUrlId, pageSize, pageNumber) {
    if (!userUrlId || !pageSize || !pageNumber) {
      console.log('Unavailable parameters for the request.');
      return;
    }

    utils._trackLists('Loader', `List - ${userUrlId}`);

    this.setState({ isLoading: true });

    axios
      .get(`/books-music-movies/recommendations/lists/api/ajax/username/${userUrlId}&${pageSize}&${pageNumber}`)
      .then(response => {
        const list = response.data;
        // Update the store. Add five more items each time clicking pagination button
        this.setState({ userLists: this.state.userLists.concat(list.data) });
        // Check if any error from the Refinery
        if (list.errorInfo) {
          Actions.failedData(list.errorInfo);
          console.warn(
            `Server returned a ${list.errorInfo.status} status. ${list.errorInfo.title}.`
          );
        }
        // Move to the next page if click the button again
        pageNumber++;
        this.setState({ pageNumber: pageNumber });
        this.setState({ isLoading: false });
      })
      .catch(response => {
        this.setState({ isLoading: false });
        console.warn('There was an error making the request.');
        console.log(response);
      });
  }

  /**
  * fetchUserLists(urlUserListId, pageSize, pageNumber)
  * This function calls the API to fetch the data of UserLists.
  * It could be used as a fallback if the app fails to fetch data from the sever.
  * Also, for the case if the users navigate the app with backward or
  * forward button, and refresh the page at some point of time,
  * the app will lose all the data in the Store.
  * Thus, this function is here for the app to fetch the data again.
  *
  * @param (String) urlUserListId
  * @param (String) pageSize
  *@ param (String) pageNumber
  */
  fetchUserLists(urlUserListId, pageSize, pageNumber) {
    if (!urlUserListId || !pageSize || !pageNumber) {
      console.log('Unavailable parameters for the request.');
      return;
    }
    if (!Store.getUserLists()) {
      // First fetch the data and then transition. Must also handle errors.
      axios
        .get(`/books-music-movies/recommendations/lists/api/ajax/username/${urlUserListId}&${pageSize}&${pageNumber}`)
        .then(response => {
          // Update the store for the list of lists a user has.
          Actions.updateUserLists(response.data.data);
          Actions.updateListsNumber(response.data.listsNumber);
          // Check if any error from the Refinery
          if (response.data.errorInfo) {
            Actions.failedData(response.data.errorInfo);
            console.warn(`Server returned a ${response.data.errorInfo.status} status. ${response.data.errorInfo.title}.`);
          }
        });
    }
  }

  // Render DOM
  render() {
    // The variable of the array of UserLists
    const userLists = this.state.userLists;
      // The title of the page is the name of the owner.
      // Every object has the same `user` object so we can fetch the first one:
    let username = (userLists && userLists.length) ? userLists[0].user.attributes.name : '';
    const userUrlId = (userLists && userLists.length) ? userLists[0].user.id : '';
    const pageSize = this.state.pageSize;
    const pageNumber = this.state.pageNumber;
    // Show how many pages left in the pagination button
    let pageLeft = (userLists && userLists.length) ? this.state.listsNumber - userLists.length : 0;
    // Hide pagination button if the list is shorter than 5 items
    // or when the user goes to the end of the list
    const pageButtonDisplay = cx({ '--hide': this.state.listsNumber < 6 || pageLeft === 0 });
    const description = 'A list created by staff at The New York Public Library';
    const pageTags = [
        // Required OG meta tags
        { property: 'og:title', content: `${username} Lists | The New York Public Library` },
        { property: 'og:url', content: `http://www.nypl.org/books-music-movies/recommendations/lists/${userUrlId}` },
        { property: 'og:image', content: '' },
        { property: 'og:description', content: description },
        { name: 'twitter:title', content: `${username} Lists | The New York Public Library` },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: '' },
    ];
    let tags = utils.metaTagUnion(pageTags);
      // Render the lists if data is correctly delivered
    let content = (userLists && userLists.length) ?
      userLists.map((element, i) => {
        const yearCreated = Moment(element.attributes['date-created']).format('YYYY');
        const firstDivide = cx({ 'first-divide': i === 0 });
        const dateCreated = Moment(element.attributes['date-created']).format('MMMM D');
        let counter = `${i + 1}.`;

        return (
          <div
            key={i}
            className="item-wrapper"
          >
            <span className={`divide ${firstDivide}`}></span>
            <p className="index">{counter}</p>
            <Item
              id={`item-${element.attributes['list-name']}`}
              className="item"
              name={element.attributes['list-name']}
              target=""
              sampleBookCovers={element['list-items']}
              description={element.attributes['list-description']}
              createdDate={`${dateCreated}, ${yearCreated}`}
              userId={element.user.id}
              listId={element.id}
            />
          </div>
        );
      })
      // Show the error element if there's no data found
      : <ErrorMessage errorClass="user-lists-error" messageContent={this.props.errorMessage.noData} />;
    const errorInfo = this.state.errorInfo;
    let errorStatus;
    let errorTitle;

    // Throw error message if something's wrong from Store
    if (errorInfo) {
      errorStatus = errorInfo.status;
      errorTitle = errorInfo.title;
      content = (
        <ErrorMessage
          errorClass="user-lists-error"
          messageContent={this.props.errorMessage.failedRequest}
        />
      );
      console.warn(`Server returned a ${errorStatus} status. ${errorTitle}.`);
    }

    // Render the list of owners on DOM
    return (
      <div id="main">
        <DocMeta tags={tags} />
        <Hero name={username} />
        <div
          id={this.props.id}
          className={this.props.className}>
          {content}
        </div>
        <div
          id="page-button-wrapper"
          className="page-button-wrapper">
          <PaginationButton
            id="page-button"
            className={`page-button${pageButtonDisplay}`}
            dots="3"
            label={pageLeft}
            isLoading={this.state.isLoading}
            onClick={this._addItems.bind(this, userUrlId, pageSize, pageNumber)}
          />
        </div>
      </div>
    );
  }
}

UserLists.defaultProps = {
  lang: 'en',
  id: 'userlists',
  className: 'userlists',
  errorMessage: {
    noData: 'No list under this user.',
    failedRequest: 'Unable to complete this request. Something might be wrong with the server.',
  },
};

export default UserLists;
