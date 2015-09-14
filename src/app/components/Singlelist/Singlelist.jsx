// Import React Libraries
import React from 'react';

// Import Router and it's navigation
import Router from 'react-router';
let Navigation = Router.Navigation;

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import SimpleButton from '../Buttons/SimpleButton.jsx';
import BookCover from '../BookCover/BookCover.jsx'

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

    // The variable to store the data from Store
    let dataArray = this.state.Data['list-items']

    console.log(this.state.Data);

    // Throw message if there's no data found
    if (!dataArray.length) {
      return (
         <div>No book under this list</div>
      );
    } else {
      let encoreUrl='http://nypl-encore-test.iii.com/iii/encore/record/C__Rb';
      // Parse the list of books if data is correctly delivered
      let items = dataArray.map((element, i) => {
        return(
          <div style={{margin:20+'px'}} key={i}>
            <SimpleButton id={element.item.attributes.title} 
            className={element.item.attributes.title}
            label={element.item.attributes.title}
            target={`${encoreUrl}${element.item.id}?lang=eng`} />
            <a href={`${encoreUrl}${element.item.id}?lang=eng`} >
              <BookCover isbn={element.item.attributes.isbns[0]} name={element.item.attributes.title} />
            </a>
            <SimpleButton id='check-available' 
            className='check-available'
            label='Check Available'
            target={`${encoreUrl}${element.item.id}?lang=eng`} />
          </div>
        );
      });
      // Render the list of owners on DOM
      return (
        <div id='main'>
          <div id='singlelist' className='singlelist' style={{margin:20+'px'}}>
            <SimpleButton label={`Go back to the list of ${this.state.Data.user.attributes.name}`} 
            target=''
            onClick={this._goToLink.bind(this, this.state.Data.user.id)} />
            {items}
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