// Import React Libraries
import React from 'react';

import DocMeta from 'react-doc-meta';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Misc
import Moment from 'moment';

// Import Components
import Hero from '../Hero/Hero.jsx';
import Item from '../Item/Item.jsx';

// Create the class. Use ES5 for react-router Navigation
class Ownerlists extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
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
    // Throw error message if anything's wrong
    if (this.state.errorMessage) {
      return (
        <div>Something is wrong</div>
      );
    }

    // The variable to store the data from Store
    let userLists = this.state.userLists,
      userId = (userLists && userLists.length) ? userLists[0].user.id : '',
      // The title of the page is the name of the owner.
      // Every object has the same `user` object so we can fetch the first one:
      username = (userLists && userLists.length) ? userLists[0].user.attributes.name : '',
      tags = [
        // Required OG meta tags
        {property: "og:title", content: 'Lists | The New York Public Library'},
        {property: "og:type", content: 'website'},
        {property: "og:url", content: `http://www.nypl.org/browse/recommendations/lists/${userId}`},
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
      lists;

    // Throw message if there's no data found
    if (!userLists.length) {
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
              description={`${dateCreated}, ${yearCreated}`}
              userId={element.user.id}
              listId={element.id} />
          </div>
        );
      });

      // Render the list of owners on DOM
      return (
        <div id='main'>
          <DocMeta tags={tags} />
          <Hero name={username} />
          <div id='ownerlists' className='ownerlists'>
            {lists}
          </div>
        </div>
      );
    }
  }

  // Change the this.state here if find any different
  _onChange() {
    this.setState(Store.getState());
  }
};

Ownerlists.defaultProps = {
  lang: 'en'
};

const styles = {
};

export default Ownerlists;
