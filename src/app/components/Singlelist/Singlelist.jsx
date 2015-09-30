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

  // Change the this.state here if find any different
  _onChange() {
    this.setState(Store.getState());
  },

  _goToLink(tag) {
    console.log('go To Link');
    this.transitionTo('ownerlists', {
      ownerlists: tag
    });
  },

  // Render DOM
  render () {
    // Throw error message if anything's wrong
    if (this.state.errorMessage) {
      return (
        <div>Something is wrong</div>
      );
    }
console.log(this.state);
    // The variable to store the data from Store
    let data = this.state.bookList,
      dataArray = data['list-items'],
      listName = data.attributes['list-name'],
      listIntro = data.attributes['list-description'],
      encoreUrl = 'http://nypl-encore-test.iii.com/iii/encore/record/C__Rb',
      items;

    // Throw message if there's no data found
    if (!dataArray.length) {
      return (
         <div>No book under this list</div>
      );
    } else {
      // Parse the list of books if data is correctly delivered
      let items = dataArray.map((element, i) => {
        return(
          <div className='singlelist__item' key={i}>
            <a className='singlelist__item__image-container' href={`${encoreUrl}${element.item.id}?lang=eng`}>
              <BookCover isbn={element.item.attributes.isbns[0]} name={element.item.attributes.title} />
            </a>
            <div className='singlelist__item__text-container'>
              <p className='singlelist__item__text-container__catalog'>
                {`${element.item.attributes.format} - ${element.item.attributes['publication-date']}`}
              </p>
              <SimpleButton id='singlelist__item__text-container__name'
                className='singlelist__item__text-container__name'
                label={element.item.attributes.title}
                target={`${encoreUrl}${element.item.id}?lang=eng`} />
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
                target={`${encoreUrl}${element.item.id}?lang=eng`} />
            </div>
          </div>
        );
      });

      // Render the list of owners on DOM
      return (
        <div id='main'>
          <Hero name={listName} intro={listIntro}/>
          <div className='back-button-container'>
            <a className='back-button-container__button'
              onClick={this._goToLink.bind(this, this.state.bookList.user.id)}>
              <p>back to</p>
              <p>{this.state.bookList.user.attributes.name}</p>
              <p>lists</p>
            </a>
          </div>
          <div id='singlelist' className='singlelist'>
            <div className='singlelist__name'>
              <a className='singlelist__name__button'
                onClick={this._goToLink.bind(this, this.state.bookList.user.id)}>
                {this.state.bookList.user.attributes.name}
              </a>

              {items}
            </div>
          </div>
        </div>
      );
    }
  }
});


Singlelist.defaultProps = {
  lang: 'en'
};

const styles = {
};

export default Singlelist;
