import React from 'react';
import Helmet from 'react-helmet';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import { config } from 'config'; // eslint-disable-line
import ReactDisqusThread from 'react-disqus-thread';

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
      <div className="markdown">
        {
          post ? (
            <Helmet
              title={`${config.siteTitle}${subTitle}`}
              meta={[
                { name: 'description', content: post.description },
                { property: 'og:title', content: post.title },
                { property: 'og:description', content: post.description },
                { property: 'og:image', content: post.photo },
                { property: 'og:url', content: `${config.baseUrl}${config.linkPrefix}${this.props.route.page.path}` },
              ]}
            />
          ) : (<Helmet title={`${config.siteTitle}${subTitle}`} />)
        }
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
        <ReactDisqusThread
          shortname="scaphold-community"
          identifier={this.props.location.pathname}
          title="Scaphold Community"
        />
      </div>
    );
  }
}

MD.propTypes = {
  route: React.PropTypes.object,
  location: React.PropTypes.object,
};
