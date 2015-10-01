// Import React Libraries
import React from 'react';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Misc
import Moment from 'moment';

// Import Components
import Hero from '../Hero/Hero.jsx';
import Item from '../Item/Item.jsx';
import BasicButton from '../Buttons/BasicButton.jsx';

// Create the class. Use ES5 for react-router Navigation
class UserLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: Store.getState().userLists,
      pageSize: 5,
      pageNumber: 2,
      listsNumber: Store.getState().listsNumber
    }
  }

  // Listen to the change from data
  componentDidMount() {
    Store.listen(this._onChange.bind(this));
  }

  // Stop listening
  componentWillUnmount() {
    Store.unlisten(this._onChange.bind(this));
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
    let userLists = this.state.data,
      // The title of the page is the name of the owner.
      // Every object has the same `user` object so we can fetch the first one:
      username = (userLists && userLists.length) ? userLists[0].user.attributes.name : '',
      userUrlId = (userLists && userLists.length) ? userLists[0].user.id : '',
      lists,
      pageLeft = this.state.listsNumber;

      console.log(userLists);

    // Throw message if there's no data found
    if (!userLists) {
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
          <div key={i} className='ownerlists__item-container'>
            <span className='ownerlists__item-divide'></span>
            <p className='ownerlists__item-index'>{counter}</p>
            <Item className='ownerlists__item'
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
          <div id='ownerlists' className='ownerlists'>
            {lists}
          </div>
          <div>
            <BasicButton
            label={`${pageLeft}...lists left`}
            onClick={this._addItems.bind(this, userUrlId, this.state.pageSize, this.state.pageNumber, userLists)} />
          </div>
        </div>
      );
    }
  }

  // Change the this.state here if find any different
  _onChange() {
    this.setState(Store.getState());
  }

  /**
  * _addItems()
  * Add five more items every time hitting the pagination button
  *
  */
  _addItems(userUrlId, pageSize, pageNumber, originalData) {
     $.ajax({
      type: 'GET',
      dataType: 'json',
      url: `/api/ajax/username/${userUrlId}&${pageSize}&${pageNumber}`,
      success: data => {
        // Update the store. Add five more items each time clicking pagination button
        originalData = originalData.concat(data.data);
        // Update the state after adding five more items to Store
        this.setState({data: originalData});
        // Move to the next page if click the button again
        pageNumber++;
        this.setState({pageNumber: pageNumber});
      }
    });
  }
};

UserLists.defaultProps = {
  lang: 'en'
};

const styles = {
};

export default UserLists;
