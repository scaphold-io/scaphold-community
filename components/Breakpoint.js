import React, { Component } from 'react';
import './breakpoints.css';

class Breakpoint extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { mobile, children } = this.props;

    if (mobile) {
      return (
        <div className="breakpoint-min-width-700">
          {children}
        </div>
      );
    }

    return (
      <div className="breakpoint-max-width-700">
        {children}
      </div>
    );
  }
}

Breakpoint.propTypes = {
  children: React.PropTypes.array,
  mobile: React.PropTypes.bool,
};

export default Breakpoint;
