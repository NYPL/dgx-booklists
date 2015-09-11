// Library import
import React from 'react';
import Radium from 'radium';

// Component import
import HeroTitle from './HeroTitle.jsx';

class Hero extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render() {    
    return (
      <div key='Hero' className='hero'>
        <div key='HeroContainer' className='hero__container'>
          <div key='TextContainer' className='hero__container__text-container'>
            <HeroTitle className='hero__container__text-container__title' title='lists' des='100 books we love. Every month.' 
             intro='We&#39;re choosing all kinds of books—for readers old and young and in between, and fans of every genre—and serving them up in this browse tool.' />
          </div>
          <div key='HeroImageContainer' className='hero__container__image-container'>
          </div>
        </div>
      </div>
    );
  }
};

const styles = {
};

export default Radium(Hero);