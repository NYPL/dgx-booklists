// Library import
import React from 'react';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Component import
import HeroTitle from './HeroTitle.jsx';

class Hero extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div key='Hero' className='hero'>
        <div key='HeroContainer' className='hero__container'>
          <div key='TextContainer' className='hero__container__text-container'>
            <HeroTitle className='hero__container__text-container__title' title='lists' name={this.props.name} 
             intro={this.props.intro} />
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

export default Hero;
