import React from 'react';
import { Link } from 'react-router'; // eslint-disable-line
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
// import find from 'lodash/find';
// import Breakpoint from '../../components/Breakpoint';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import { config } from 'config'; // eslint-disable-line

// import typography from '../../utils/typography';

// const { rhythm } = typography;

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleTopicChange = this.handleTopicChange.bind(this);
  }

  handleTopicChange(e) {
    return this.context.router.push(e.target.value);
  }

  render() {
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
