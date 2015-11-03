// Import React Libraries
import React from 'react';

// Misc
import cx from 'classnames';

class PaginationButton extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    let dotElements = [],
      // Add loading class and the loading animation if it is loading now
      isLoading = cx({'loading': this.props.isLoading}),
      i;
    
    // Generate the dots for the pagination button. The number of the dots is determinated by the props.
    for(i = 0; i < this.props.dots; i++) {
      dotElements.push(
        <li id={`${this.props.id}__dot-row__element_${i}`}
          className={`${this.props.className}__dot-row__element ${isLoading}`}
          key={i}>
        </li>
      );
    }

    return (
      <div id={this.props.id}
        className={this.props.className}
        onClick={this.props.onClick}>
        <ul id={`${this.props.id}__dot-row`} className={`${this.props.className}__dot-row`}>
          {dotElements}
          <li id={`${this.props.id}__dot-row__number`} className={`${this.props.className}__dot-row__number`}>
            {this.props.label}
          </li>
        </ul>
      </div>
    );
  }
};

PaginationButton.defaultProps = {
  id: 'PaginationButton',
  className: 'pagination-button',
  name: 'pagination button',
  label: 'Pagination Button',
  lang: 'en',
  dots: 3,
  onClick() {}
};

// Export the component
export default PaginationButton;
