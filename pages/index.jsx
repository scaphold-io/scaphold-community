import React from 'react';
import { Link } from 'react-router'; // eslint-disable-line
import Helmet from 'react-helmet';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import FontAwesome from 'react-fontawesome';
import { config } from 'config'; // eslint-disable-line
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line

import ReactVue2Apollo from './images/projects/react-vue2-apollo.png';
import GraphQLLogo from './images/graphql.png';

export default class CommunityIndex extends React.Component {
  static metadata() {
    return {
      title: 'Community',
      description: 'Find all the resources you need to launch a production app with GraphQL.',
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const featuredProjects = [projects[5], projects[3], projects[4]];
    // Featured Project
    const project = {
      title: 'React + Vue2 + Apollo',
      author: 'kristianmandrup',
      url: 'https://github.com/kristianmandrup/react-vue2-apollo-starter-kit',
      description: 'Apollo starter kit for React and Vue2 with GraphQL for scaphold.io',
      img: ReactVue2Apollo,
    };
    // Featured Guide
    const guide = {
      title: 'Learn GraphQL',
      author: 'Kadira',
      url: 'https://learngraphql.com/',
      description: 'Learn GraphQL with an hour-long guide that will walk you through how GraphQL fits into your architecture, creating a schema, and executing queries.',
      createdAt: '2015-06-01 00:00:00',
      tags: ['GraphQL', 'Tutorial'],
      img: GraphQLLogo,
    };
    // Featured Blog
    const blogUrl = '/blog/2016-12-28-scaphold-2016-year-in-review/';
    const blog = this.props.route.pages.find(r => r.path === '/blog/2016-12-28-scaphold-2016-year-in-review/');

    return (
      <div>
        <Helmet
          title={`${config.siteTitle} | ${CommunityIndex.metadata().title}`}
          meta={[
            {
              name: 'description',
              content: 'A real-time GraphQL backend platform. Build apps faster with our hosted data and intergrations platform. GraphQL Subscriptions make all of your apps realtime out of the box. Define your data model and instantly get a powerful GraphQL API backed by our highly available infrastructure built on AWS. Build web, mobile, and IOT apps with AngularJS, React, Relay, Apollo Client, Push Notifications, Stripe Payments, Twitter, Facebook, and more. Get started today.',
            },
            { property: 'og:title', content: `${config.siteTitle} | ${CommunityIndex.metadata().title}` },
            { property: 'og:description', content: CommunityIndex.metadata().description },
            { property: 'og:image', content: 'https://assets.scaphold.io/community/Scaphold_Community_Open_Graph.png' },
            { property: 'og:url', content: `${config.baseUrl}${config.linkPrefix}${this.props.route.page.path}` },
          ]}
        />
        <div className="community-index">
          <div className="wrapper">
            <Row className="community-header">
              <h1 className="community-index-title">{CommunityIndex.metadata().title}</h1>
            </Row>
            <Row className="community-header-copy">
              <Col lg={6} lgOffset={3} md={6} mdOffset={3} sm={6} smOffset={3} xs={10} xsOffset={1} className="community-copy-wrapper">
                <h3 className="community-index-description">{CommunityIndex.metadata().description}</h3>
              </Col>
            </Row>
            <Row className="community-header-action">
              <a href="http://slack.scaphold.io" className="btn btn-lg join-slack animated pulse" target="_blank">
                <FontAwesome name="slack" /> Join our Slack
              </a>
            </Row>
          </div>
          <Grid fluid className="community-content">
            <Row>
              {/*
                featuredProjects.map((project, i) => (
                  <Col lg={4} md={4} sm={4} xs={12} className="community-featured-project">
                    <a href={project.url} target="_blank">
                      <Image src={project.img} alt={`Learning Guide ${i}`} />
                    </a>
                    <h3 className="community-project-title">
                      <a href={project.url} target="_blank">
                        {project.title}
                      </a>
                    </h3>
                    <p className="community-project-description">{project.description}</p>
                    <p className="community-project-author">By {project.author}</p>
                  </Col>
                ))
              */}
              <Col lg={4} md={4} sm={4} xs={12} className="community-feature animated fadeIn feature-1">
                <a href={guide.url} target="_blank">
                  <Image src={guide.img} alt={`Learning Guide`} style={{ maxWidth: '100px' }} />
                </a>
                <h3 className="community-feature-title">
                  <a href={guide.url} target="_blank">
                    {guide.title}
                  </a>
                </h3>
                <p className="community-feature-description">{guide.description}</p>
                <p className="community-feature-author">By {guide.author}</p>
              </Col>
              <Col lg={4} md={4} sm={4} xs={12} className="community-feature animated fadeIn feature-2">
                <a href={project.url} target="_blank">
                  <Image src={project.img} alt={`Project Code`} style={{ maxWidth: '200px' }} />
                </a>
                <h3 className="community-feature-title">
                  <a href={project.url} target="_blank">
                    {project.title}
                  </a>
                </h3>
                <p className="community-feature-description">{project.description}</p>
                <p className="community-feature-author">By {project.author}</p>
              </Col>
              <Col lg={4} md={4} sm={4} xs={12} className="community-feature animated fadeIn feature-3">
                <a href={prefixLink(blogUrl)} target="_blank">
                  <Image src={blog.data.photo} alt={`Blog Post`} style={{ maxWidth: '165px' }} />
                </a>
                <h3 className="community-feature-title">
                  <a href={blogUrl} target="_blank">
                    {blog.data.title}
                  </a>
                </h3>
                <p className="community-feature-description">{blog.data.description}</p>
                <p className="community-feature-author">By {blog.data.author}</p>
              </Col>
            </Row>
            <Row>
              <Col lg={4} md={4} sm={4} xs={12} className="community-feature">
                <Link to={prefixLink('/learn/')}>Learn more!</Link>
              </Col>
              <Col lg={4} md={4} sm={4} xs={12} className="community-feature">
                <Link to={prefixLink('/projects/')}>Check out more projects!</Link>
              </Col>
              <Col lg={4} md={4} sm={4} xs={12} className="community-feature">
                <Link to={prefixLink('/blog/')}>Read more blog posts!</Link>
              </Col>
            </Row>
            <hr className="community-break" />
            <Row>
              <Col lg={6} md={6} sm={6} xs={12} className="community-featured-video-title">
                <h1>Featured Tutorial</h1>
                <h2>
                  Curious how to build <b><FontAwesome name="slack" /> Slack in 15 minutes</b>?
                  Follow this video tutorial and start chatting with your friends!
                </h2>
                <p>By Michael Paris</p>
              </Col>
              <Col lg={6} md={6} sm={6} xs={12} className="community-featured-video-wrapper">
                <iframe width="854" height="480" src="https://www.youtube.com/embed/yaacnYUqY1Q" frameBorder="0" allowFullScreen />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

CommunityIndex.propTypes = {
  route: React.PropTypes.object,
};
