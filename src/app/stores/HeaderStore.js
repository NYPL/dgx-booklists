import alt from '../alt.js';
import Actions from '../actions/HeaderActions.js';

class HeaderStore {
  constructor(){

    this.bindListeners({
      handleUpdateHeaderData: Actions.UPDATE_HEADER_DATA,
      handleFetchHeaderData: Actions.FETCH_HEADER_DATA,
      handleHeaderDataFailedFetch: Actions.FAILED_HEADER_DATA,
      handleSetMobileMenuButtonValue: Actions.SET_MOBILE_MENU_BUTTON_VALUE,
      handleUpdateIsHeaderSticky: Actions.UPDATE_IS_HEADER_STICKY,
      handleToggleSubscribeFormVisible: Actions.TOGGLE_SUBSCRIBE_FORM_VISIBLE
    });

    this.exportPublicMethods({
      _getMobileMenuBtnValue: this._getMobileMenuBtnValue,
      _getIsStickyValue: this._getIsStickyValue,
      _getSubscribeFormVisible: this._getSubscribeFormVisible
    });

    this.state = {
      headerData: [],
      errorMessage: null,
      isSticky: false,
      activeMobileButton: '',
      subscribeFormVisible: false
    };
  }

  /*** PUBLIC METHODS ***/
  /**
   * _getMobileMenuBtnValue() 
   * returns the current state.activeMobileButton
   * value.
   * @return {String}
   */
  _getMobileMenuBtnValue() {
    return this.state.activeMobileButton;
  }

  _getSubscribeFormVisible() {
    return this.state.subscribeFormVisible;
  }

  /**
   * _getIsStickyValue() 
   * returns the current state.isSticky value.
   *
   * @return {Boolean} true/false
   */
  _getIsStickyValue() {
    return this.state.isSticky;
  }

  /*** PRIVATE METHODS ***/
  handleUpdateHeaderData(data) {
    this.setState({headerData: data});
  }

  handleFetchHeaderData() {
    this.setState({headerData: []});
  }

  handleHeaderDataFailedFetch(errorMessage) {
    this.setState({errorMessage: errorMessage});
  }

  handleSetMobileMenuButtonValue(currentActiveMobileButton) {
    this.setState({activeMobileButton: currentActiveMobileButton});
  }

  handleUpdateIsHeaderSticky(value) {
    this.setState({isSticky: value});
  }

  handleToggleSubscribeFormVisible(value) {
    this.setState({subscribeFormVisible: value});
  }
}

// Export our newly created Store
export default alt.createStore(HeaderStore, 'HeaderStore');
