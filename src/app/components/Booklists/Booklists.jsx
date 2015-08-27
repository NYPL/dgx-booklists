// Import React Libraries
import React from 'react';
import Radium from 'radium';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
// import Logo from '../Logo/Logo.jsx';
// import SSOContainer from '../SSOContainer/SSOContainer.jsx';
// import DonateButton from '../DonateButton/DonateButton.jsx';
// import SubscribeButton from '../SubscribeButton/SubscribeButton.jsx';
// import NavMenu from '../NavMenu/NavMenu.jsx';

class Booklists extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
    // replaces getInitialState()
    this.state = Store.getState();
  }

  componentDidMount() {
    Store.listen(this._onChange.bind(this));
    // Here we would fetch our data async
    //Actions.fetchHeaderData();
  }

  componentWillUnmount() {
    Store.unlisten(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(Store.getState());
  }

  render () {
    console.log(this.state);
    return (
      <div></div>
    );
  }
};

Header.defaultProps = {
  lang: 'en'
};

const styles = {
  wrapper: {
    position: 'relative',
    margin: '0 auto'
  },
  logo: {
    display: 'block',
    width: '230px',
    position: 'relative',
    left: '-8px'
  },
  topButtons: {
    position: 'absolute',
    top: '20px',
    right: '2px',
    textTransform: 'uppercase',
    display: 'block'
  },
  ssoContainer: {
    display: 'inline-block'
  },
  subscribeButton: {
    display: 'inline-block'
  },
  donateButton: {
    display: 'inline-block'
  }
};

export default Radium(Booklists);
