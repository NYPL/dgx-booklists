// Import React Libraries
import React from 'react';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import Components
import Owner from '../Owner/Owner.jsx';
import Lists from '../Lists/Lists.jsx';

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
    // Actions.fetchData();
  }

  componentWillUnmount() {
    Store.unlisten(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(Store.getState());
  }

  render () {
    console.log(this.state.Data);

    if (this.state.errorMessage) {
      return (
        <div>Something is wrong</div>
      );
    }

    console.log(this.state.Data.length);

    if (!this.state.Data.length) {
      return (
        <div>loading...</div>
      );
    }

    // Parse the list of owners
    let owners = this.state.Data.map(function (element) {
      return(
        <div>
          <Owner key='owner' name={element.attributes.name} />
        </div>
      );
    });

    return (
      <div id='booklists' className='booklist'>
        {owners}
      </div>
    );
  }
};

Booklists.defaultProps = {
  lang: 'en'
};

const styles = {
};

export default Booklists;
