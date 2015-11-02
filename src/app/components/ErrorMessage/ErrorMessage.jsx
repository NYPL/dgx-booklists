// Import React Libraries
import React from 'react';

class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={this.props.className} style={this.props.styles}>
        {this.props.messageContent}
      </div>
    );
  }
};

ErrorMessage.defaultProps = {
  lang: 'en',
  id: 'error-message',
  className: 'error-message',
  messageContent: 'Something is wrong with the page. Please try again later.',
  styles: {
    fontFamily: 'Milo-Light',
    fontSize: '26px',
    lineHeight: '28px'
  }
};

export default ErrorMessage;
