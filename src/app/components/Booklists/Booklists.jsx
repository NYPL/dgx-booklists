// Import React Libraries
import React from 'react';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components

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
    Actions.fetchData();
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
      <div id='booklists'></div>
    );
  }
};

Booklists.defaultProps = {
  lang: 'en'
};

const styles = {
};

export default Booklists;
