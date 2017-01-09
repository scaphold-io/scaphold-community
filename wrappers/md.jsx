import React from 'react';
import DocumentTitle from 'react-document-title';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { config } from 'config'; // eslint-disable-line

export default class MD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const post = this.props.route.page.data;
    let subTitle = ' | Community';
    if (post.title) {
      subTitle = ` | ${post.title}`;
    }

    return (
      <DocumentTitle title={`${config.siteTitle}${subTitle}`}>
        <div className="markdown">
          <div className="wrapper">
            <Grid className="community-header-wrapper">
              <Row className="community-header">
                <h1 className="post-title">{post.title}</h1>
              </Row>
              <Row className="community-header-copy">
                <h3 className="post-description">{post.description}</h3>
              </Row>
              {
                post.author ?
                  <p className="community-header-author">by {post.author}</p> : ''
              }
            </Grid>
          </div>
          <div className="content-wrapper">
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

MD.propTypes = {
  route: React.PropTypes.object,
};
