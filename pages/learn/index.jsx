import React from 'react';
import { Link } from 'react-router'; // eslint-disable-line
import Helmet from 'react-helmet';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
// import FontAwesome from 'react-fontawesome';
import { config } from 'config'; // eslint-disable-line
import Fuse from 'fuse.js';
import sortBy from 'lodash/sortBy';
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
    filteredGuidesList = sortBy(filteredGuidesList, g => g.createdAt).reverse();

    // Determine bg color of banner
    const path = this.props.route.page.path;
    const pathKey = `${path.substring(1, path.length - 1)}`;
    const headerColor = pageColorMap[pathKey];
    const asCols = [];
    for (let i = 0; i < filteredGuidesList.length; i += 2) {
      if (filteredGuidesList.length > i + 1) {
        asCols.push([filteredGuidesList[i], filteredGuidesList[i + 1]]);
      } else {
        asCols.push([filteredGuidesList[i]]);
      }
    }

    return (
      <div className="">
        <Helmet
          title={`${LearnIndex.metadata().title} | ${config.siteTitle}`}
          meta={[
            {
              name: 'description',
              content: `${LearnIndex.metadata().description}`,
            },
            { property: 'og:title', content: `${LearnIndex.metadata().title} | ${config.siteTitle}` },
            { property: 'og:description', content: LearnIndex.metadata().description },
            { property: 'og:image', content: 'https://assets.scaphold.io/community/Scaphold_Community_Open_Graph.png' },
            { property: 'og:url', content: `${config.baseUrl}${config.linkPrefix}${this.props.route.page.path}` },
          ]}
        />
        <div className="wrapper" style={{ backgroundColor: headerColor }}>
          <Grid>
            <div className="community-header">
              <h1>{LearnIndex.metadata().title}</h1>
            </div>
            <div className="community-header-copy">
              <Col lg={6} lgOffset={3} md={6} mdOffset={3} sm={6} smOffset={3} xs={6} xsOffset={3} className="community-copy-wrapper">
                <p>{LearnIndex.metadata().description}</p>
              </Col>
            </div>
            <Row className="community-header-search">
              <SearchBar onChangeFilter={this.onChangeFilter} value={this.state.filter} />
            </Row>
          </Grid>
        </div>
        <Grid>
          <Row className="community-header-options">
            <Col lg={12} md={12} sm={12} xs={24}>
              <div className="community-header-count">
                <span className="community-header-number"><b>{filteredGuidesList.length} Resources</b></span>
              </div>
              <Button className="community-header-submit" bsStyle="primary" onClick={() => { window.Intercom('show'); }}>
                Submit Resource
              </Button>
            </Col>
          </Row>
          {
            asCols.map((leftRight, j) => (
              <Row className="learn-list" key={j}>
                {leftRight.map((guide, i) => (
                  <Col lg={6} md={6} sm={12} xs={12} key={i}>
                    <article className="learn-item">
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
                      <div className="learn-img-wrapper">
                        {
                          guide.img ?
                            <img
                              style={{
                                marginRight: '25px',
                                marginBottom: '0',
                                height: '75px',
                                width: 'auto',
                              }}
                              alt={guide.title}
                              src={guide.img}
                            /> : null
                        }
                      </div>
                      <footer className="btn-group learn-item-footer">
                        <a href={guide.url} className="btn" target="_blank">Read more</a>
                      </footer>
                      <div className="learn-item-tags-wrapper">
                        {/*
                          <span className="learn-item-icon-wrapper">
                            {
                              guide.tags && guide.tags.length > 1 ?
                                <FontAwesome name="tags" /> : <FontAwesome name="tag" />
                            }
                          </span>
                        */}
                        <span className="learn-item-tags">
                          {
                            guide.tags && guide.tags.length ?
                              guide.tags.map((tag, j) => (
                                <span // eslint-disable-line
                                  key={j}
                                  className="learn-item-tag"
                                  onClick={() => this.setFilter(tag)}
                                >
                                  #{tag}
                                </span>
                              )) : ''
                          }
                        </span>
                      </div>
                    </article>
                  </Col>
                ))}
              </Row>
            ))
          }
        </Grid>
      </div>
    );
  }
}

LearnIndex.propTypes = {
  route: React.PropTypes.object,
};
