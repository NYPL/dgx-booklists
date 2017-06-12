import React from 'react';
import PropTypes from 'prop-types';
import { ga } from 'dgx-react-ga';

class SimpleButton extends React.Component {
  onClick() {
    ga._trackGeneralEvent(this.props.gaCategory, this.props.gaAction, this.props.gaLabel);
    this.props.onClick();
  }

  render() {
    return (
      <a
        ref="SimpleButton"
        id={this.props.id}
        className={this.props.className}
        href={this.props.target}
        onClick={() => this.onClick}
        style={this.props.style}
      >
        {this.props.label}
      </a>
    );
  }
}
SimpleButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  lang: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

SimpleButton.defaultProps = {
  id: 'SimpleButton',
  className: 'SimpleButton',
  label: 'Button',
  lang: 'en',
  target: '#',
  onClick() {},
};

export default SimpleButton;
