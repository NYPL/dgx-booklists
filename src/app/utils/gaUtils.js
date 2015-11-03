import ga from 'react-ga';

function gaUtils() {
  /**
   * _trackGeneralEvent(category)
   * Track a GA event.
   *
   * @param {category} String Category for GA event.
   * @param {action} String Action for GA event.
   * @param {label} String Label for GA event.
   */
  this._trackGeneralEvent = (category, action, label) => {
    return ga.event({
      category: category,
      action: action,
      label: label
    });
  };


  /**
   * _trackEvent(category)
   * Track a GA click event, wrapped in a curried function.
   *
   * @param {category} String Category for GA event.
   * @returns {function} Returns a function with the category set.
   *  Then you pass in the action and the label.
   */
  let _trackEvent = category => {
    return (action, label) => {
      return ga.event({
        category: category,
        action: action,
        label: label
      });
    };
  };

  /**
   * _trackHeader(action, label)
   * Track a GA click event, where action and label come from
   * the higher level function call from _trackEvent().
   *
   * @param {action} String Action for GA event.
   * @param {label} String Label for GA event.
   */
  this._trackHeader = _trackEvent('NYPL Header');

  /**
   * _trackLists(action, label)
   * Track a GA click event, where action and label come from
   * the higher level function call from _trackEvent().
   *
   * @param {action} String Action for GA event.
   * @param {label} String Label for GA event.
   */
  this._trackLists = _trackEvent('Book Lists');
}

export default new gaUtils();
