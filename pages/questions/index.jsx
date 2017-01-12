import React from 'react';
import { Link } from 'react-router'; // eslint-disable-line
import Helmet from 'react-helmet';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import FontAwesome from 'react-fontawesome';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import { config } from 'config'; // eslint-disable-line
import Fuse from 'fuse.js';
import sortBy from 'lodash/sortBy';
import TimeAgo from 'react-timeago';
import questions from './questions';
import pageColorMap from '../../utils/pageColorMap';
import SearchBar from '../SearchBar';

export default class QuestionsIndex extends React.Component {
  static metadata() {
    return {
      title: 'Questions',
      description: 'Need help? You\'re in the right place.',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    };

    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  onChangeFilter = (e) => {
    this.setState({
      filter: e.target.value,
    });
  }

  setFilter = (filter) => {
    this.setState({
      filter,
    });
  }

  render() {
    const options = {
      shouldSort: true,
      threshold: 0.4,
      location: 0,
      distance: 250,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'title',
        'askedBy',
        'description',
        'tags',
      ],
    };

    let filteredQuestionsList = questions;
    if (this.state.filter && this.state.filter.length) {
      const fuse = new Fuse(questions, options);
      filteredQuestionsList = fuse.search(this.state.filter);
    }
    filteredQuestionsList = sortBy(filteredQuestionsList, q => q.createdAt).reverse();

    // Determine bg color of banner
    const path = this.props.route.page.path;
    const pathKey = `${path.substring(1, path.length - 1)}`;
    const headerColor = pageColorMap[pathKey];

    return (
      <div className="">
        <Helmet
          title={`${config.siteTitle} | ${QuestionsIndex.metadata().title}`}
          meta={[
            {
              name: 'description',
              content: `${QuestionsIndex.metadata().description}`,
            },
            { property: 'og:title', content: `${config.siteTitle} | ${QuestionsIndex.metadata().title}` },
            { property: 'og:description', content: QuestionsIndex.metadata().description },
            { property: 'og:image', content: 'https://assets.scaphold.io/community/Scaphold_Community_Open_Graph.png' },
            { property: 'og:url', content: `${config.baseUrl}${config.linkPrefix}${this.props.route.page.path}` },
          ]}
        />
        <div className="wrapper" style={{ backgroundColor: headerColor }}>
          <Grid>
            <Row className="community-header">
              <h1>{QuestionsIndex.metadata().title}</h1>
            </Row>
            <Row className="community-header-copy">
              <p>{QuestionsIndex.metadata().description}</p>
            </Row>
            <Row className="questions-header-action">
              <a href="http://slack.scaphold.io" className="btn btn-lg join-slack animated pulse" target="_blank">
                <FontAwesome name="slack" /> Join our Slack
              </a>
            </Row>
            <Row className="community-header-search">
              <SearchBar onChangeFilter={this.onChangeFilter} value={this.state.filter} />
            </Row>
          </Grid>
        </div>
        <Grid fluid>
          <Row className="community-header-options">
            <Col lg={12} md={12} sm={12} xs={24}>
              <div className="community-header-count">
                <span className="community-header-number"><b>{filteredQuestionsList.length} Questions</b></span>
              </div>
              <Button className="community-header-submit" bsStyle="primary" href="mailto:community@scaphold.io?body=Thanks%20for%20contributing%21%0A%0ASend%20us%20a%20message%20outlining%20your%20idea%20or%20join%20us%20on%20Slack%20at%20https%3A%2F%2Fscapholdslackin.herokuapp.com%20and%20contact%20%40michael%20or%20%40vince.%0A%0AThis%20site%20is%20also%20entirely%20open%20source%20so%20feel%20free%20to%20submit%20a%20pull%20request%20directly%20to%20GitHub%20%28https%3A%2F%2Fgithub.com%2Fscaphold-io%2Fscaphold-community%2Fpulls%29%21%0A%0AThanks%21&subject=I%27d%20Like%20To%20Contribute%21">
                Submit Question
              </Button>
            </Col>
          </Row>
          <Row className="questions-list">
            {
              filteredQuestionsList.map((question, i) => (
                <Row className="question-list-item" key={i}>
                  <Col lg={1} md={1} sm={1} xs={1} className="question-icon-wrapper">
                    <FontAwesome name="question-circle-o" className="question-icon" />
                  </Col>
                  <Col lg={9} md={9} sm={9} xs={11} className="question-title">
                    <h3><Link to={prefixLink(question.url)}>{question.title}</Link></h3>
                    <div className="question-meta">
                      <span className="question-author">
                        By {question.askedBy}
                      </span>
                      <ul className="question-tags">
                        {
                          question.tags && question.tags.length ?
                            question.tags.map((tag, j) => (
                              <li // eslint-disable-line
                                key={j}
                                className="question-tag-wrapper"
                                onClick={() => this.setFilter(tag)}
                              >
                                <span className="question-tag">{tag}</span>
                              </li>
                            )) : ''
                        }
                      </ul>
                    </div>
                  </Col>
                  <Col lg={2} md={2} sm={2} xs={12} className="question-timestamp">
                    <em>
                      Created <TimeAgo date={new Date(question.createdAt).toLocaleDateString()} />
                    </em>
                  </Col>
                </Row>
              ))
            }
          </Row>
        </Grid>
      </div>
    );
  }
}

QuestionsIndex.propTypes = {
  route: React.PropTypes.object,
};
