// Import React Libraries
import React from 'react';

// Import Router and it's navigation
import Router from 'react-router';
let Navigation = Router.Navigation;

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import Hero from '../Hero/Hero.jsx';
import Item from '../Item/Item.jsx';

// Create the class. Use ES5 for react-router Navigation
let Ownerlists = React.createClass({

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

  _goToLink(tag, id) {
    console.log('go To Link');
    this.transitionTo('singlelist', {
      ownerlists: tag,
      id: id
    });
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
    let dataArray = this.state.Data;
    // The title of the page is the name of the owner
    let ownerName = dataArray[0].user.attributes.name;

    console.log(dataArray);
    // Throw message if there's no data found
    if (!dataArray.length) {
      return (
         <div>No list under this owner</div>
      );
    } else {   
      // Parse the list of books if data is correctly delivered
      let lists = dataArray.map((element, i) => {
        return(
          <div key={i} className='ownerlists__item-container'>
            <span className='ownerlists__item-divide'></span>
            <p className='ownerlists__item-index'>{`${i+1}.`}</p>
            <Item className='ownerlists__item'
            name={element.attributes['list-name']}
            target=''
            sampleBookCovers={element['list-items']}
            description={element.attributes['date-created']}
            onClick={this._goToLink.bind(this, element.user.id, element.id)} />
          </div>
        );
      });
      // Render the list of owners on DOM
      return (
        <div id='main'>
          <Hero name={ownerName} />
          <div id='ownerlists' className='ownerlists'>
            {lists}
          </div>
        </div>
      );
    }
  }
});

Ownerlists.defaultProps = {
  lang: 'en'
};

const styles = {
};

export default Ownerlists;