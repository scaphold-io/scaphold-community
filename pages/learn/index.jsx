import React from 'react';
import { Link } from 'react-router'; // eslint-disable-line
import DocumentTitle from 'react-document-title';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import FontAwesome from 'react-fontawesome';
import { config } from 'config'; // eslint-disable-line
import Fuse from 'fuse.js';
import guides from './guides';
import SearchBar from '../SearchBar';
import pageColorMap from '../../utils/pageColorMap';

export default class LearnIndex extends React.Component {
  static metadata() {
    return {
      title: 'Learn',
      description: 'GraphQL guides and tutorials.',
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
        'author',
        'description',
        'tags',
      ],
    };

    let filteredGuidesList = guides;
    if (this.state.filter && this.state.filter.length) {
      const fuse = new Fuse(guides, options);
      filteredGuidesList = fuse.search(this.state.filter);
    }

    // Determine bg color of banner
    const path = this.props.route.page.path;
    const pathKey = `${path.substring(1, path.length - 1)}`;
    const headerColor = pageColorMap[pathKey];

    return (
      <DocumentTitle title={`${config.siteTitle} | ${LearnIndex.metadata().title}`}>
        <div className="">
          <div className="wrapper" style={{ backgroundColor: headerColor }}>
            <Grid>
              <div className="community-header">
                <h1>{LearnIndex.metadata().title}</h1>
              </div>
              <div className="community-header-copy">
                <Col lg={6} lgOffset={3} md={6} mdOffset={3} sm={6} smOffset={3} xs={2} xsOffset={5} className="community-copy-wrapper">
                  <p>{LearnIndex.metadata().description}</p>
                </Col>
              </div>
              <Row className="community-header-search">
                <SearchBar onChangeFilter={this.onChangeFilter} value={this.state.filter} />
              </Row>
            </Grid>
          </div>
          <Grid fluid>
            <Row className="community-header-options">
              <Col lg={12} md={12} sm={12} xs={24}>
                <div className="community-header-count">
                  <span className="community-header-number"><b>{filteredGuidesList.length} Resources</b></span>
                </div>
                <Button className="community-header-submit" bsStyle="primary" href="mailto:community@scaphold.io?body=Thanks%20for%20contributing%21%0A%0ASend%20us%20a%20message%20outlining%20your%20idea%20or%20join%20us%20on%20Slack%20at%20https%3A%2F%2Fscapholdslackin.herokuapp.com%20and%20contact%20%40michael%20or%20%40vince.%0A%0AThis%20site%20is%20also%20entirely%20open%20source%20so%20feel%20free%20to%20submit%20a%20pull%20request%20directly%20to%20GitHub%20%28https%3A%2F%2Fgithub.com%2Fscaphold-io%2Fscaphold-community%2Fpulls%29%21%0A%0AThanks%21&subject=I%27d%20Like%20To%20Contribute%21">
                  Submit Resource
                </Button>
              </Col>
            </Row>
            <Row className="learn-list">
              {
                filteredGuidesList.map((guide, i) => (
                  <Col lg={10} lgOffset={1} md={10} mdOffset={1} sm={10} smOffset={1} xs={12} key={i} className="learn-item">
                    <article>
                      <Row>
                        <Col lg={2} md={2} sm={2} xs={2}>
                          <span className="learn-item-icon-wrapper">
                            {
                              guide.tags && guide.tags.length > 1 ?
                                <FontAwesome name="tags" /> : <FontAwesome name="tag" />
                            }
                          </span>
                          <br />
                          <br />
                          <br />
                          <p className="learn-item-tags">
                            {
                              guide.tags && guide.tags.length ?
                                guide.tags.map((tag, j) => (
                                  <span // eslint-disable-line
                                    key={j}
                                    className="learn-item-tag"
                                    onClick={() => this.setFilter(tag)}
                                  >
                                    #{tag}<br />
                                  </span>
                                )) : ''
                            }
                          </p>
                        </Col>
                        <Col lg={10} md={10} sm={10} xs={10}>
                          <header>
                            <h4 className="learn-item-header">
                              <b>
                                <span className="learn-item-author">
                                  {guide.author}
                                </span>
                                &nbsp;&mdash;&nbsp;
                                <span className="learn-item-date">{new Date(guide.createdAt).toLocaleDateString()}</span>
                              </b>
                            </h4>
                            <h1 className="learn-item-title">
                              <a href={guide.url} target="_blank">
                                {guide.title}
                              </a>
                            </h1>
                          </header>
                          <div className="learn-item-content">
                            <p>{guide.description}</p>
                          </div>
                          <footer className="btn-group learn-item-footer">
                            <a href={guide.url} className="btn" target="_blank">Read more</a>
                          </footer>
                        </Col>
                      </Row>
                    </article>
                  </Col>
                ))
              }
            </Row>
          </Grid>
        </div>
      </DocumentTitle>
    );
  }
}

LearnIndex.propTypes = {
  route: React.PropTypes.object,
};
