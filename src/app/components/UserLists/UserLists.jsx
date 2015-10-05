// Import React Libraries
import React from 'react';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Misc
import Moment from 'moment';
import _ from 'underscore';

// Import Components
import Hero from '../Hero/Hero.jsx';
import Item from '../Item/Item.jsx';
import PaginationButton from '../Buttons/PaginationButton.jsx';

// Create the class. Use ES5 for react-router Navigation
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
      return (
        <div>Something is wrong</div>
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
      // Show the how many pages left in the pagination button
      pageLeft = this.state.listsNumber - this.state.userLists.length,
      lists;

    // Throw message if there's no data found
    if (!this.state.userLists) {
      return (
         <div>No list under this owner</div>
      );
    } else {
      // Parse the list of books if data is correctly delivered
      lists = userLists.map((element, i) => {
        let dateCreated = Moment(element.attributes['date-created']).format('MMMM Do'),
          yearCreated = Moment(element.attributes['date-created']).format('YYYY'),
          counter = `${i+1}.`;

        return(
          <div key={i} className={`${this.props.className}__item-wrapper`}>
            <span className={`${this.props.className}__item-divide`}></span>
            <p className={`${this.props.className}__item-index`}>{counter}</p>
            <Item id={`userlists__item-${element.attributes['list-name']}`}
              className={`${this.props.className}__item`}
              name={element.attributes['list-name']}
              target=''
              sampleBookCovers={element['list-items']}
              description={element.attributes['list-description']}
              createdDate={`${dateCreated}, ${yearCreated}`}
              userId={element.user.id}
              listId={element.id} />
          </div>
        );
      });

      // Render the list of owners on DOM
      return (
        <div id='main'>
          <Hero name={username} />
          <div id={this.props.id} className={this.props.id}>
            {lists}
          </div>
          <div id={`${this.props.id}__page-button-wrapper`}
          className={`${this.props.className}__page-button-wrapper`}>
            <PaginationButton id={`${this.props.id}__page-button-wrapper__button`}
              className={`${this.props.className}__page-button-wrapper__button`}
              dots='3' label={pageLeft}
              isLoading={this.state.isLoading}
              onClick={this._addItems.bind(this, userUrlId, pageSize, pageNumber)}/>
          </div>
        </div>
      );
    }
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
      url: `/api/ajax/username/${userUrlId}&${pageSize}&${pageNumber}`,
      // Update isLoading in state to pass AJAX loading status
      // Trigger loading animaiton when the call starts
      beforeSend: () => {
        this.setState({isLoading: true});
      },
      // Stop loading animaiton when the call completes
      complete: () => {
        this.setState({isLoading: false});
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

const styles = {
};

export default UserLists;
