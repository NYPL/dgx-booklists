// Import React Libraries
import React from 'react';

// Import Router and it's navigation
import Router from 'react-router';

import DocMeta from 'react-doc-meta';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import Hero from '../Hero/Hero.jsx';
import SimpleButton from '../Buttons/SimpleButton.jsx';
import BookCover from '../BookCover/BookCover.jsx'

let Navigation = Router.Navigation;

// Create the class. Use ES5 for react-router Navigation
let Singlelist = React.createClass({

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
      listId = bookItemList.id,
      listItems = bookItemList['list-items'],
      listName = bookItemList.attributes['list-name'],
      listIntro = bookItemList.attributes['list-description'],
      encoreUrl = 'http://nypl-encore-test.iii.com/iii/encore/record/C__Rb',
      tags = [
        // Required OG meta tags
        {property: "og:title", content: `${listName}`},
        {property: "og:type", content: 'website'},
        {property: "og:url", content: `http://www.nypl.org/browse/recommendations/lists/${userId}/${listId}`},
        {property: "og:image", content: ''},
        {property: "og:image:type", content: 'image/png'},
        // Just examples of width and height:
        {property: "og:image:width", content: '400'},
        {property: "og:image:height", content: '300'},
        // Optional OG meta tags
        {property: "og:description", content: 'A list created by staff at The New York Public Library'},
        {property: "og:site_name", content: 'Lists | The New York Public Library'},
        {name: "twitter:card", content: 'summary_large_image'},
        {name: "twitter:site", content: '@nypl'},
        {name: "twitter:creator", content: '@nypl'},
        {name: "twitter:title", content: 'List | The New York Public Library'},
        {name: "twitter:description", content: 'A list created by staff at The New York Public Library'},
        {name: "twitter:image", content: ''}
      ],
      items;

    // Throw message if there's no data found
    if (!listItems.length) {
      return (
        <div>No book under this list</div>
      );
    } else {
      // Parse the list of books if data is correctly delivered
      items = listItems.map((element, i) => {
        let target = `${encoreUrl}${element.item.id}?lang=eng`,
          publishedDate = `${element.item.attributes.format} - ${element.item.attributes['publication-date']}`;

        return(
          <div className='singlelist__item' key={i}>
            <a className='singlelist__item__image-container' href={target}>
              <BookCover isbn={element.item.attributes.isbns[0]} name={element.item.attributes.title} />
            </a>
            <div className='singlelist__item__text-container'>
              <p className='singlelist__item__text-container__catalog'>
                {publishedDate}
              </p>
              <SimpleButton id='singlelist__item__text-container__name'
                className='singlelist__item__text-container__name'
                label={element.item.attributes.title}
                target={target} />
              <p className='singlelist__item__text-container__author'>
                {`By ${element.item.attributes.authors}`}
              </p>
              <p className='singlelist__item__text-container__description'>
                {element.attributes.annotation}
              </p>
            </div>
            <div className='singlelist__item__checkout'>
              <SimpleButton id='check-available'
                className='singlelist__item__checkout__button'
                label='Check Available'
                target={target} />
            </div>
          </div>
        );
      });

      // Render the list of owners on DOM
      return (
        <div id='main'>
          <DocMeta tags={tags} />
          <Hero name={listName} intro={listIntro}/>
          <div className='back-button-container'>
            <a className='back-button-container__button'
              onClick={this._transitionToUser.bind(this, userId)}>
              <p>back to</p>
              <p>{userDisplayName}</p>
              <p>lists</p>
            </a>
          </div>
          <div id='singlelist' className='singlelist'>
            <div className='singlelist__name'>
              <a className='singlelist__name__button'
                onClick={this._transitionToUser.bind(this, userId)}>
                {userDisplayName}
              </a>
              {items}
            </div>
          </div>
        </div>
      );
    }
  },

  // Change the this.state here if find any different
  _onChange() {
    this.setState(Store.getState());
  },

  _transitionToUser(userId) {
    if (!Store.getUserLists()) {
      // First fetch the data and then transition. Must also handle errors.
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: `/api/ajax/username/${userId}`,
        success: data => {
          // Update the store for the list of lists a user has.
          Actions.updateUserLists(data.data);

          // Now transitition to the route.
          this._transitionTo(userId);
        }
      });
    } else {
      this._transitionTo(userId);
    }
  },

  _transitionTo(userId) {
    // Now transitition to the route.
    this.transitionTo('ownerlists', {
      ownerlists: userId
    });
  }
});


Singlelist.defaultProps = {
  lang: 'en'
};

const styles = {
};

export default Singlelist;
