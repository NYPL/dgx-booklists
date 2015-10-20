// Import React Libraries
import React from 'react';
import DocMeta from 'react-doc-meta';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Misc
import Moment from 'moment';
import _ from 'underscore';
import cx from 'classnames'

// Import Components
import Hero from '../Hero/Hero.jsx';
import Item from '../Item/Item.jsx';
import PaginationButton from '../Buttons/PaginationButton.jsx';
import ErrorMessage from '../errorMessage/errorMessage.jsx';

import utils from '../../utils/utils.js';

class UserLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = _.extend({
      pageSize: '5',
      pageNumber: '2',
      // Tell pagination button if it is loading new pages now
      isLoading: false
    }, Store.getState());
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
    // Throw error message if anything's wrong from Store
    if (Store.getState().errorMessage) {
      let errorMessage = Store.getState().errorMessage;

      return (
        <div id='main'>
          <DocMeta tags={tags} />
          <Hero name={username} />
          <div id={this.props.id} className={this.props.className}>
            <ErrorMessage className='error-message' messageContent={errorMessage} />
          </div>
        </div>
      );
    }
    // The variable of the array of UserLists
    let userLists = this.state.userLists,
      // The title of the page is the name of the owner.
      // Every object has the same `user` object so we can fetch the first one:
      username = (userLists && userLists.length) ? userLists[0].user.attributes.name : '',
      userUrlId = (userLists && userLists.length) ? userLists[0].user.id : '',
      pageSize = this.state.pageSize,
      pageNumber = this.state.pageNumber,
      // Show how many pages left in the pagination button
      pageLeft = this.state.listsNumber - userLists.length,
      description = 'A list created by staff at The New York Public Library',
      pageTags = [
        // Required OG meta tags
        {property: "og:title", content: 'Lists | The New York Public Library'},
        {property: "og:url", content: `http://www.nypl.org/browse/recommendations/lists/${userUrlId}`},
        {property: "og:image", content: ''},
        {property: "og:description", content: description},
        {name: "twitter:description", content: description},
        {name: "twitter:image", content: ''}
      ],
      tags = utils.metaTagUnion(pageTags),
      // Render the lists if data is correctly delivered
      lists = (userLists && userLists.length) ?
        userLists.map((element, i) => {
          let dateCreated = Moment(element.attributes['date-created']).format('MMMM D'),
            yearCreated = Moment(element.attributes['date-created']).format('YYYY'),
            counter = `${i+1}.`,
            firstDivide = cx({'first-divide': i === 0});

            return(
              <div key={i} className={`item-wrapper`}>
                <span className={`divide ${firstDivide}`}></span>
                <p className={`index`}>{counter}</p>
                <Item id={`item-${element.attributes['list-name']}`}
                  className={`item`}
                  name={element.attributes['list-name']}
                  target=''
                  sampleBookCovers={element['list-items']}
                  description={element.attributes['list-description']}
                  createdDate={`${dateCreated}, ${yearCreated}`}
                  userId={element.user.id}
                  listId={element.id} />
              </div>
            );
          })
          // Show the error element if there's no data found
          : <ErrorMessage className='error-message' messageContent='No list under this user.' />;

    // Render the list of owners on DOM
    return (
      <div id='main'>
        <DocMeta tags={tags} />
        <Hero name={username} />
        <div id={this.props.id} className={this.props.className}>
          {lists}
        </div>
        <div id={`page-button-wrapper`}
        className={`page-button-wrapper`}>
          <PaginationButton id={`page-button`}
            className={`page-button`}
            dots='3' label={pageLeft}
            isLoading={this.state.isLoading}
            onClick={this._addItems.bind(this, userUrlId, pageSize, pageNumber)}/>
        </div>
      </div>
    );
  }

  /**
  * _addItems(userUrlId, pageSize, pageNumber, originalData)
  * Add five more items every time hitting the pagination button
  *
  * @param {String} UserId 
  * @param {String} pageSize
  * @param {String} pageNumber
  * @param {Array}  originalData
  */
  _addItems(userUrlId, pageSize, pageNumber) {
    if (!userUrlId || !pageSize || !pageNumber) {
      console.log('Unavailable parameters for the request.');
      return;
    }
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: `/browse/recommendations/lists/api/ajax/username/${userUrlId}&${pageSize}&${pageNumber}`,
      // Update isLoading in state to pass AJAX loading status
      // Trigger loading animaiton when the call starts
      beforeSend: () => {
        this.setState({isLoading: true});
      },
      // Stop loading animaiton when the call completes
      complete: () => {
        this.setState({isLoading: false});
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.log(`Unavailabe to complete the request. Run into a ${textStatus} for ${errorThrown}`);
        Actions.failedData('Unable to complete this request. Something might be wrong with the server.');
      },
      success: data => {
        // Update the store. Add five more items each time clicking pagination button
        this.setState({userLists: this.state.userLists.concat(data.data)});
        // Move to the next page if click the button again
        pageNumber++;
        this.setState({pageNumber: pageNumber});
      }
    });
  }
};

UserLists.defaultProps = {
  lang: 'en',
  id: 'userlists',
  className: 'userlists'
};

export default UserLists;
