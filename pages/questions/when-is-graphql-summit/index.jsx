import React from 'react';
import { Link } from 'react-router'; // eslint-disable-line
import Question from '../_Question';
import find from 'lodash/find';
import { config } from 'config'; // eslint-disable-line
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import questions from '../questions';

export default class QuestionWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const question = find(questions, q => prefixLink(q.url) === this.props.route.path);
    return (<Question question={question} />);
  }
}

QuestionWrapper.propTypes = {
  route: React.PropTypes.object,
};
