import React from 'react';
import { Link } from 'react-router'; // eslint-disable-line
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import { config } from 'config'; // eslint-disable-line
import Fuse from 'fuse.js';
import ReactDisqusThread from 'react-disqus-thread';

const options = {
  shouldSort: true,
  threshold: 0.8,
  location: 0,
  distance: 250,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'page.data.categories',
  ],
};

const FurtherReading = props => (
  <div style={{ padding: '10px' }}>
    <div>
      <h3>
        <a href={prefixLink(`${props.page.path}`)}>{props.page.data.title}</a>
        <img style={{ float: 'right', margin: '0', width: 'auto', height: '80px' }} src={props.page.data.photo} />
      </h3>
    </div>
    <p>{props.page.data.description}</p>
  </div>
)

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const routes = this.props.route.childRoutes;
    const thisRoute = this.props.routes[this.props.routes.length - 1];
    const thisCategories = thisRoute.page.data.categories;
    const fuse = new Fuse(routes, options);
    let filteredGuidesList = [];
    if (thisCategories) {
      filteredGuidesList = fuse.search(thisCategories);
      filteredGuidesList = filteredGuidesList.reduce((acc, item) => (
        item.page.data.title === thisRoute.page.data.title ? acc : [ ...acc, item ]
      )).slice(0, 3);
    }
    return (
      <div>
        <Grid fluid className="blog-post">
          {
            this.props.location.pathname === prefixLink('/blog/') ?
              (<Row className="blog-list-container">{this.props.children}</Row>) :
              (
                <Row>
                  <Col lg={8} lgOffset={2} md={8} mdOffset={2} sm={8} smOffset={2} xs={12}>
                    {this.props.children}
                  </Col>
                </Row>
              )
          }
          <hr style={{ margin: '50px 0' }} />
          <Row>
            {
              filteredGuidesList.length ?
                <Col style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <h1>Further Reading</h1>
                  {filteredGuidesList.map(route => (
                    <FurtherReading page={route.page} />
                  ))}
                </Col>
              : null
            }
            <Col lg={8} lgOffset={2} md={8} mdOffset={2} sm={8} smOffset={2} xs={12}>
              <ReactDisqusThread
                shortname="scaphold-community"
                identifier={this.props.location.pathname}
                title="Scaphold Community"
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Blog.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.object,
};

Blog.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
