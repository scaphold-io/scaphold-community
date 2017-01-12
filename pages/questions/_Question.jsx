import React from 'react';
import { Link } from 'react-router'; // eslint-disable-line
import Helmet from 'react-helmet';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { config } from 'config'; // eslint-disable-line
import ReactDisqusThread from 'react-disqus-thread';

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const question = this.props.question;
    if (!question) return (<div>Question not found! Try a different page.</div>);
    return (
      <div className="question-post">
        <Helmet
          title={`${config.siteTitle} | ${question.title}`}
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
              {question.answer}
            </p>
          </Col>
        </Row>
        <p className="question-author-footer">
          Answered by {question.answeredBy} on {new Date(question.createdAt).toLocaleDateString()}
        </p>
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
  location: React.PropTypes.object,
};
