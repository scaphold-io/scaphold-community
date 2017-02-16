import React from 'react';
import { Link } from 'react-router'; // eslint-disable-line
import Helmet from 'react-helmet';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { config } from 'config'; // eslint-disable-line
import ReactDisqusThread from 'react-disqus-thread';
import showdown from 'showdown';
import ReactHtmlParser from 'react-html-parser';
import questions from './questions';
import Fuse from 'fuse.js';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import '../../css/github.css';

const converter = new showdown.Converter();

const options = {
  shouldSort: true,
  threshold: 0.8,
  location: 0,
  distance: 250,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'title',
    'tags',
  ],
};

const RelatedQuestion = props => (
  <div style={{ padding: '10px' }}>
    <div>
      <h3 style={{ display: 'inline-block' }}>
        <a href={prefixLink(`${props.question.url}`)}>{props.question.title}</a>
      </h3>
      <p style={{ display: 'inline-block', float: 'right' }} className="text-muted">{props.question.tags.map(s => `#${s}`).join(', ')}</p>
    </div>
    <p>{props.question.description}</p>
  </div>
);

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const question = this.props.question;
    if (!question) return (<div>Question not found! Try a different page.</div>);
    const thisCategories = question.tags.join(' ');
    const fuse = new Fuse(questions, options);
    let filteredQuestions = [];
    if (thisCategories) {
      filteredQuestions = fuse.search(thisCategories);
      filteredQuestions = filteredQuestions.reduce((acc, item) => (
        item.title === question.title ? acc : [ ...acc, item ]
      )).slice(0, 3);
    }
    return (
      <div className="question-post">
        <Helmet
          title={`${question.title} | ${config.siteTitle}`}
          meta={[
            { name: 'description', content: question.description },
            { property: 'og:title', content: question.title },
            { property: 'og:description', content: question.description },
            // { property: 'og:image', content: question.photo },
            { property: 'og:url', content: `${config.baseUrl}${config.linkPrefix}${question.url}` },
          ]}
        />
        <Grid>
          <div className="wrapper">
            <div className="community-header">
              <Grid>
                <h1 className="question-title">{question.title}</h1>
              </Grid>
            </div>
            <div className="community-header-copy">
              <h2>{question.description}</h2>
              <ul className="question-header-tags">
                {
                  question.tags && question.tags.length ?
                    question.tags.map((tag, i) => (
                      <li className="question-tag-wrapper" key={i}>
                        <span className="question-tag">{tag}</span>
                      </li>
                    )) : ''
                }
              </ul>
            </div>
          </div>
        </Grid>
        <Row className="question-answer-wrapper">
          <Col lg={10} lgOffset={1} md={10} mdOffset={1} sm={10}>
            <p className="question-answer">
              {
                question.isMarkdown ?
                  <div>
                    {
                      ReactHtmlParser(converter.makeHtml(question.answer))
                    }
                  </div> : question.answer
              }
            </p>
          </Col>
        </Row>
        <p className="question-author-footer">
          Answered by {question.answeredBy} on {new Date(question.createdAt).toLocaleDateString()}
        </p>
        <hr style={{ margin: '75px 0' }} />
        {
          filteredQuestions.length ?
            <div>
              <h1>Related Questions</h1>
              {filteredQuestions.map(q => (
                <RelatedQuestion question={{ tags: [], ...q }} />
              ))}
            </div>
          : null
        }
        <ReactDisqusThread
          shortname="scaphold-community"
          identifier={question.url}
          title="Scaphold Community"
        />
      </div>
    );
  }
}

Question.propTypes = {
  question: React.PropTypes.object,
};
