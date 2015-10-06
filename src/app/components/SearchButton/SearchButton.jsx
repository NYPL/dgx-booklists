// Import React libraries
import React from 'react';
import cx from 'classnames';
import Radium from 'radium';

// Import components
import BasicButton from '../Buttons/BasicButton.jsx';
import SearchBox from '../SearchBox/SearchBox.jsx';

import HeaderStore from '../../stores/HeaderStore.js';
import HeaderActions from '../../actions/HeaderActions.js';

// Create React class
class SearchButton extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    // Holds the initial state. The actived status is false
    this.state = {
    };
  }

  // Dom Render Section
  render () {
    // Give active class if the button is activated
    let classes = cx({'--active': HeaderStore._getMobileMenuBtnValue() === 'clickSearch' ||
      HeaderStore._getMobileMenuBtnValue() === 'hoverSearch'});
    // Change the icon based on the behavior either click or hover
    let icon = cx({
      'nypl-icon-solo-x': HeaderStore._getMobileMenuBtnValue() === 'clickSearch',
      'nypl-icon-magnifier-fat': HeaderStore._getMobileMenuBtnValue() !== 'clickSearch'});

    return (
      <div className={`${this.props.className}-SearchBox-Wrapper`}
      onMouseEnter={this._activate.bind(this, 'hover')}
      onMouseLeave={this._deactivate.bind(this)}>
        <BasicButton id={`${this.props.className}-SearchButton`}
        className={`${icon} ${this.props.className}-SearchButton${classes}`}
        name='Search Button'
        label=''
        onClick={this._activate.bind(this, 'click')} />
        <SearchBox id={`${this.props.className}-SearchBox`}
        className={`${this.props.className}-SearchBox`} />
      </div>
    );
  }

  // Set the function to active searchbox when the button is hovered or clicked
  _activate(option) {
    if (option === 'hover') {
      // And activated by hover only when the button has not been activated yet
      if (HeaderStore._getMobileMenuBtnValue() !== 'clickSearch') {
        HeaderActions.setMobileMenuButtonValue('hoverSearch');
      } 
    } else {
      // Click ignores the status of hover
      this._toggle();
    }
  }

  // Deactivated the button only when it was activated by hovering
  _deactivate() {
    // _deactive function only works when it is on desktop version
    if (HeaderStore._getMobileMenuBtnValue() === 'hoverSearch') {
      HeaderActions.setMobileMenuButtonValue('');
    }
  }

  // The toggle for the interaction of clicking on the button
  _toggle() {
    // Only activated when the button has not been activated yet
    if (HeaderStore._getMobileMenuBtnValue() !== 'clickSearch') {
      HeaderActions.setMobileMenuButtonValue('clickSearch');
    } else {
      HeaderActions.setMobileMenuButtonValue('');
    }
  }
}

SearchButton.defaultProps = {
  lang: 'en',
  className: 'NavMenu'
};

const styles = {
  base: {
  }
};

// Export the component
export default Radium(SearchButton);