import React from 'react';
import { Link } from 'react-router'; // eslint-disable-line
import { config } from 'config'; // eslint-disable-line

export default class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

Projects.propTypes = {
  children: React.PropTypes.object,
};

Projects.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
