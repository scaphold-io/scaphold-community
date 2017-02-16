import React from 'react';
import { Link } from 'react-router'; // eslint-disable-line
import Helmet from 'react-helmet';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Button from 'react-bootstrap/lib/Button';
import FontAwesome from 'react-fontawesome';
import { config } from 'config'; // eslint-disable-line
import find from 'lodash/find';
import Fuse from 'fuse.js';
import sortBy from 'lodash/sortBy';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import pageColorMap from '../../utils/pageColorMap';
import SearchBar from '../SearchBar';

export default class BlogIndex extends React.Component {
  static metadata() {
    return {
      title: 'Blog',
      description: 'The latest news on app development with GraphQL.',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    };

    this.onChangeFilter = this.onChangeFilter.bind(this);
  }

  onChangeFilter = (e) => {
    this.setState({
      filter: e.target.value,
    });
  }

  render() {
    const blogPostsList = config.blogPosts.map((p) => {
      const page = find(this.props.route.pages, _p => _p.path === p);
      return {
        ...page.data,
        path: page.path,
      };
    });

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
      ],
    };

    let filteredBlogPostList = blogPostsList;
    if (this.state.filter && this.state.filter.length) {
      const fuse = new Fuse(blogPostsList, options);
      filteredBlogPostList = fuse.search(this.state.filter);
    }

    // Determine bg color of banner
    const path = this.props.route.page.path;
    const pathKey = `${path.substring(1, path.length - 1)}`;
    const headerColor = pageColorMap[pathKey];

    return (
      <div className="">
        <Helmet
          title={`${BlogIndex.metadata().title} | ${config.siteTitle}`}
          meta={[
            {
              name: 'description',
              content: `${BlogIndex.metadata().description}`,
            },
            { property: 'og:title', content: `${BlogIndex.metadata().title} | ${config.siteTitle}` },
            { property: 'og:description', content: BlogIndex.metadata().description },
            { property: 'og:image', content: 'https://assets.scaphold.io/community/Scaphold_Community_Open_Graph.png' },
            { property: 'og:url', content: `${config.baseUrl}${config.linkPrefix}${this.props.route.page.path}` },
          ]}
        />
        <div className="wrapper" style={{ backgroundColor: headerColor }}>
          <Grid>
            <div className="community-header">
              <h1>{BlogIndex.metadata().title}</h1>
            </div>
            <div className="community-header-copy">
              <Col lg={6} lgOffset={3} md={6} mdOffset={3} sm={6} smOffset={3} xs={6} xsOffset={3} className="community-copy-wrapper">
                <p>{BlogIndex.metadata().description}</p>
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
                <span className="community-header-number"><b>{filteredBlogPostList.length} Posts</b></span>
              </div>
              <Button className="community-header-submit" bsStyle="primary" onClick={() => { window.Intercom('show'); }}>
                Submit a Post
              </Button>
            </Col>
          </Row>
          <Row className="blog-list">
            {
              filteredBlogPostList.map((post, i) => (
                <article key={i} className="blog-list-item">
                  <Row className="blog-list-item-row">
                    <Col lg={9} md={9} sm={9} xs={12}>
                      <h2 className="blog-list-item-title">
                        <Link to={prefixLink(post.path)}>{post.title}</Link>
                      </h2>
                      <h3>{post.description}</h3>
                      <p className="blog-item-footer">
                        <a href={prefixLink(post.path)} className="blog-list-item-read-more">
                          Read More <FontAwesome name="arrow-right" />
                        </a>
                        {/*
                        <div className="text-muted" style={{ float: 'right' }}>
                          <Image
                            circle
                            src={post.headshot}
                            height="50"
                            width="50"
                            alt={post.author}
                            className="blog-list-item-img blog-list-container-img"
                          />
                          <span className="blog-meta">
                            {new Date(post.date).toLocaleDateString()} • {post.author}
                          </span>
                        </div>
                        */}
                        <div className="blog-meta" style={{ float: 'right' }}>
                          {new Date(post.date).toLocaleDateString()} • {post.author}
                        </div>
                      </p>
                    </Col>
                    <Col lg={3} md={3} sm={3} xs={12} className="text-center">
                      <Link to={prefixLink(post.path)} className="blog-list-item-hero">
                        <Image src={post.photo} className="blog-list-item-photo blog-list-container-img" />
                      </Link>
                    </Col>
                  </Row>
                </article>
              ))
            }
          </Row>
        </Grid>
      </div>
    );
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
};
