// Import React Libraries
import React from 'react';

// Import Router and it's navigation
import Router from 'react-router';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import Hero from '../Hero/Hero.jsx';
import SimpleButton from '../Buttons/SimpleButton.jsx';
import BookCover from '../BookCover/BookCover.jsx'

// The method allows us to transit between pages internally
let Navigation = Router.Navigation,
// Create the class. Use ES5 for react-router Navigation
  BookItemList = React.createClass({
    // For internal transition
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
    // Render DOM
    render() {
      // Throw error message if anything's wrong
      if (this.state.errorMessage) {
        return (
          <div>Something is wrong</div>
        );
      }

      // The variable to store the data from Store
      let bookItemList = this.state.bookItemList,
        userId = bookItemList.user.id,
        userDisplayName = bookItemList.user.attributes.name,
        listItems = bookItemList['list-items'],
        listName = bookItemList.attributes['list-name'],
        listIntro = bookItemList.attributes['list-description'],
        encoreUrl = 'http://nypl-encore-test.iii.com/iii/encore/record/C__Rb',
        items = (listItems && listItems.length) ?
          listItems.map((element, i) => {
            let target = `${encoreUrl}${element.item.id}?lang=eng`,
              publishedDate = `${element.item.attributes.format} - ${element.item.attributes['publication-date']}`,
              bookItemId = `${this.props.id}__item-${element.item.id}`,
              authors = (element.item.attributes.authors.length) ?
                `By ${element.item.attributes.authors}` : `The author of this item is not available`;

            return(
              <div id={bookItemId} className={`${this.props.className}__item`} key={i}>
                <a className={`${this.props.className}__item__image-wrapper`} href={target}>
                  <BookCover isbn={element.item.attributes.isbns[0]} name={element.item.attributes.title} />
                </a>
                <div className={`${this.props.className}__item__text-wrapper`}>
                  <SimpleButton id={`${this.props.id}__item__text-wrapper__${element.item.id}`}
                    className={`${this.props.className}__item__text-wrapper__name`}
                    label={element.item.attributes.title}
                    target={target} />
                  <p className={`${this.props.className}__item__text-wrapper__author`}>
                    {authors}
                  </p>
                  <p className={`${this.props.className}__item__text-wrapper__description`}>
                    {element.attributes.annotation}
                  </p>
                  <p className={`${this.props.className}__item__text-wrapper__catalog`}>
                    {publishedDate}
                  </p>
                </div>
                <div className={`${this.props.className}__item__checkout`}>
                  <SimpleButton id={`${this.props.id}__item__checkout__${element.item.id}`}
                    className={`${this.props.className}__item__checkout__button`}
                    label='request this item'
                    target={target} />
                </div>
              </div>
            );
          })
          :<div>No book under this list</div>;

      // Render the list of owners on DOM
      return (
        <div id='main'>
          <Hero name={listName} intro={listIntro}/>
          <div id={`${this.props.id}__back-button-wrapper`}
          className={`${this.props.className}__back-button-wrapper`}>
            <a id={`${this.props.id}__back-button-wrapper__button`}
            className={`${this.props.className}__back-button-wrapper__button`}
              onClick={this._fetchUserLists.bind(this, userId, 5, 1)}>
              <p>back to</p>
              <p>{userDisplayName}</p>
              <p>lists</p>
            </a>
          </div>
          <div id={this.props.id} className={this.props.className}>
            <div id={`${this.props.id}__name`}
            className={`${this.props.className}__name`}>
              <a id={`${this.props.id}__name__button`}
              className={`${this.props.className}__name__button`}
                onClick={this._fetchUserLists.bind(this, userId, 5, 1)}>
                {userDisplayName}
              </a>
              {items}
            </div>
          </div>
        </div>
      );
    },

    /**
    * _fetchUserLists(userId, pageSize, pageNumber)
    * Fetch the data we need for UserLists
    * before the app transit us to UserLists page
    *
    * @param (String) userId
    * @param (String) pageSize
    *@ param (String) pageNumber
    */
    _fetchUserLists(userId, pageSize, pageNumber) {
      if (!userId || !pageSize || !pageNumber) {
        console.log('Unavailable parameters for the request.');
        return;
      }
      if (!Store.getUserLists()) {
        // First fetch the data and then transition. Must also handle errors.
        $.ajax({
          type: 'GET',
          dataType: 'json',
          url: `/api/ajax/username/${userId}&${pageSize}&${pageNumber}`,
          success: data => {
            // Update the store for the list of lists a user has.
            Actions.updateUserLists(data.data);
            Actions.updateListsNumber(data.listsNumber);
            // Now transitition to the route.
            this._transitionToUser(userId);
          }
        });
      } else {
        this._transitionToUser(userId);
      }
    },

    _transitionToUser(userId) {
      // Now transitition to the route.
      this.transitionTo('UserLists', {
        UserLists: userId
      });
    }
  });


BookItemList.defaultProps = {
  lang: 'en',
  id: 'bookItemList',
  className: 'bookItemList'
};

const styles = {
};

export default BookItemList;
