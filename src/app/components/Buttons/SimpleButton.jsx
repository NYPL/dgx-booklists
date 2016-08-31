import React from 'react';
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
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  lang: React.PropTypes.string,
  target: React.PropTypes.string,
  onClick: React.PropTypes.func,
  style: React.PropTypes.object,
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
