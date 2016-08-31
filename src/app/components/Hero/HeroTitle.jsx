import React from 'react';

class HeroTitle extends React.Component {
  render() {
    return (
      <div id={this.props.id} className={this.props.className} style={this.props.style}>
        <h3 key="HeroTitle">{this.props.title}</h3>
        <p key="HeroName" className="hero__container__text-container__title__des">
          {this.props.name}
        </p>
        <p key="HeroIntro" className="hero__container__text-container__title__intro">
          {this.props.intro}
        </p>
      </div>
    );
  }
}

HeroTitle.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  title: React.PropTypes.string,
  name: React.PropTypes.string,
  intro: React.PropTypes.string,
};

export default HeroTitle;
