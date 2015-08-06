// Non-NYPL module imports
import React from 'react';
import Radium from 'radium';

// NYPL module imports
import Logo from '../Logo/Logo.jsx';
import SSOContainer from '../SSOContainer/SSOContainer.jsx';
import DonateButton from '../DonateButton/DonateButton.jsx';
import SubscribeButton from '../SubscribeButton/SubscribeButton.jsx';
import NavMenu from '../NavMenu/NavMenu.jsx';

// API Mocked Data
import API from '../../utils/ApiService';

/* Reads from local storage (i.e. Refinery) */
// If we follow the FLUX architecture
// data would not be defined, instead we would
// load the data via Store Actions and update our
// App Constants. As of now, we are mocking an API
// call to fetch the data.
const data = API.getData();

class Header extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
    // replaces getInitialState()
    this.state = {
      data: data
    };
  }

  render () {
    return (
      <header id='Header' className='Header' style={styles.base}>
        <div className='Header-TopWrapper' style={styles.wrapper}>
          <Logo className='Header-Logo' style={styles.logo} />
          <div id='Header-Buttons' style={styles.topButtons}>
            <SSOContainer />
            <SubscribeButton label='Subscribe' lang={this.props.lang} />
            <DonateButton lang={this.props.lang} />
          </div>
        </div>
        <NavMenu className='Header-NavMenu' items={this.state.data} lang={this.props.lang} />
      </header>
    );
  }
};

Header.defaultProps = {
  lang: 'en'
};

const styles = {
  base: {
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    color: 'black'
  },
  wrapper: {
    position: 'relative',
    margin: '0 auto'
  },
  logo: {
    display: 'block',
    width: '230px',
    position: 'relative',
    left: '0px'
  },
  topButtons: {
    position: 'absolute',
    top: '20px',
    right: '2px',
    fontFamily: 'Helvetica, Arial',
    fontSize: '10px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    display: 'flex'
  }
};

export default Radium(Header);
