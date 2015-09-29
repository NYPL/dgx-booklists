// Import React Libraries
import React from 'react';
import Router from 'react-router';

// Import Components
import SimpleButton from '../Buttons/SimpleButton.jsx';
import BookCover from '../BookCover/BookCover.jsx'

let Navigation = Router.Navigation;

let Item = React.createClass({

  mixins: [Navigation],

  getInitialState() {
    return {};
  },

  render () {
    // Only need the covers from the first 4 books
    let bookCoverArray = this.props.sampleBookCovers.slice(0, 4),
      // Parse the list of book covers if data is correctly delivered
      bookCovers = bookCoverArray.map((element, i) => {
        return(
          <div style={{display:'inline-block'}} key={i}>
            <BookCover
              name={element.item.attributes.title}
              isbn={element.item.attributes.isbns[0]} />
          </div>
        );
      });

    return (
      <div className={this.props.className}>
        <div className={`${this.props.className}__image-container`} style={{textAlign:'left'}}>
          {bookCovers}
        </div>
        <div className={`${this.props.className}__text-container`}>
          <SimpleButton id={this.props.name}
            className={`${this.props.className}__text-container__name`}
            label={this.props.name}
            target={this.props.target}
            onClick={this._goToLink} />
          <p>{this.props.description}</p>
        </div>
      </div>
    );
  },

  _goToLink(e) {
    e.preventDefault();
    console.log('go to booklist: ' + this.props.username + ' ' + this.props.userid);
    // this.transitionTo('singlelist', {
    //   ownerlists: this.props.username,
    //   id: this.props.userid
    // });
  }
});

Item.defaultProps = {
  lang: 'en'
};

const styles = {
};

// Export components
export default Item;
