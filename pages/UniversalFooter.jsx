import React from 'react';
import { Link } from 'react-router'; // eslint-disable-line
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';

export default class UniversalFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // this.showIntercom = this.showIntercom.bind(this);
  }

  // showIntercom = () => {
  //   window.Intercom('show'); // eslint-disable-line
  // }

  render() {
    return (
      <footer className={classNames('universalFooter', this.props.className)}>
        <Grid>
          <Row className={'footerRow'}>
            <Col lg={3} md={3} sm={3} xs={5}>
              <h4 className={'footerHeader'}>Company</h4>
              <ul className={'footerList'}>
                <li>
                  <a href="https://scaphold.io/contact" target="_blank">About</a>
                </li>
                <li>
                  <a
                    href="https://scaphold.io/blog"
                    target="_blank" // eslint-disable-line
                  >Blog</a>
                </li>
                <li>
                  <a href="https://scaphold.io/contact" target="_blank">Contact</a>
                </li>
                {/*
                <li>
                  <a href="#" onClick={this.showIntercom}>
                    Chat With Us!&nbsp;
                    <FontAwesome name="comment" />
                  </a>
                </li>
                */}
              </ul>
            </Col>
            <Col lg={3} md={3} sm={3} xs={5}>
              <h4 className={'footerHeader'}>Learn More</h4>
              <ul className={'footerList'}>
                <li>
                  <a
                    href="https://scaphold.io/docs/#starter-kits"
                    target="_blank" // eslint-disable-line
                  >Tutorials</a>
                </li>
                <li>
                  <a
                    href="https://scaphold.io/docs/#learn-graphql"
                    target="_blank" // eslint-disable-line
                  >Resources</a>
                </li>
                <li>
                  <a
                    href="https://scaphold.io/docs/"
                    target="_blank" // eslint-disable-line
                  >Documentation</a>
                </li>
                <li>
                  <a
                    href="http://status.scaphold.io/"
                    target="_blank" // eslint-disable-line
                  >
                    Network Status&nbsp;
                    {/*
                    <OverlayTrigger
                      trigger={['hover', 'focus']}
                      placement="right"
                      overlay={(
                        <Tooltip id="health-check-footer">
                          {
                            this.props.checkHealth && this.props.checkHealth.healthy ?
                              <b>Healthy</b> :
                              <b>Unhealthy</b>
                          }
                        </Tooltip>
                      )}
                    >
                      {
                        this.props.checkHealth && this.props.checkHealth.healthy ?
                          <span className={'apiStatusHealthyFlag'}></span> :
                          <span className={'apiStatusUnhealthyFlag'}></span>
                      }
                    </OverlayTrigger>
                    */}
                  </a>
                </li>
                <li>
                  <a
                    href="https://scaphold.io/docs/#changelog"
                    target="_blank" // eslint-disable-line
                  >Changelog</a>
                </li>
                <li>
                  <a href="https://scaphold.io/pricing" target="_blank">Pricing</a>
                </li>
                <li>
                  <a
                    href="https://scaphold.io/docs/#faq"
                    target="_blank" // eslint-disable-line
                  >FAQ</a>
                </li>
              </ul>
            </Col>
            <Col lg={3} md={3} sm={3} xs={5}>
              <h4 className={'footerHeader'}>Community</h4>
              <ul className={'footerList'}>
                <li>
                  <a
                    href="https://github.com/scaphold-io"
                    target="_blank" // eslint-disable-line
                  >Open Source</a>
                </li>
                <li>
                  <a
                    href="http://stackoverflow.com/search?tab=newest&q=graphql"
                    target="_blank" // eslint-disable-line
                  >Stack Overflow</a>
                </li>
                <li>
                  <a href="https://scaphold.io/referral" target="_blank"
                  >Referral Program</a>
                </li>
                <li>
                  <a
                    href="https://scapholdslackin.herokuapp.com"
                    target="_blank" // eslint-disable-line
                  >
                    <b>Join our Slack!</b>&nbsp;
                    <FontAwesome name="slack" />
                  </a>
                </li>
              </ul>
            </Col>
            <Col lg={2} md={2} sm={2} xs={5}>
              <h4 className={'footerHeader'}>
                <Row>
                  <Col md={1} sm={1} xs={2}>
                    <a
                      href="https://twitter.com/ScapholdDotIO"
                      target="_blank" // eslint-disable-line
                    ><FontAwesome name="twitter" className={'footerSocialIcon'} /></a>
                  </Col>
                  <Col md={1} sm={1} xs={2}>
                    <a
                      href="https://www.facebook.com/scaphold/"
                      target="_blank" // eslint-disable-line
                    ><FontAwesome name="facebook" className={'footerSocialIcon'} /></a>
                  </Col>
                  <Col md={1} sm={1} xs={2}>
                    <a href="https://github.com/scaphold-io"><FontAwesome name="github" className={'footerSocialIcon'} /></a>
                  </Col>
                  <Col md={1} sm={1} xs={2}>
                    <a
                      href="https://www.youtube.com/channel/UC3CKbmn1jYp5fRoCIiBrsGg"
                      target="_blank" // eslint-disable-line
                    ><FontAwesome name="youtube" className={'footerSocialIcon'} /></a>
                  </Col>
                  <Col md={1} sm={1} xs={2}>
                    <a
                      href="https://www.linkedin.com/company/10780129"
                      target="_blank" // eslint-disable-line
                    ><FontAwesome name="linkedin" className={'footerSocialIcon'} /></a>
                  </Col>
                  <Col md={1} sm={1} xs={2}>
                    <a
                      href="https://medium.com/scaphold"
                      target="_blank" // eslint-disable-line
                    ><FontAwesome name="medium" className={'footerSocialIcon'} /></a>
                  </Col>
                  <Col md={1} sm={1} xs={2}>
                    <a
                      href="https://scapholdslackin.herokuapp.com/"
                      target="_blank" // eslint-disable-line
                    ><FontAwesome name="slack" className={'footerSocialIcon'} /></a>
                  </Col>
                  <Col md={1} sm={1} xs={2}>
                    <a href="mailto:community@scaphold.io">
                      <FontAwesome name="envelope" className={'footerSocialIcon'} />
                    </a>
                  </Col>
                </Row>
              </h4>
              <p className={'footerCopyright'}>
                Copyright © 2017
                <br />
                Scaphold Inc.
              </p>
            </Col>
          </Row>
        </Grid>
      </footer>
    );
  }
}

UniversalFooter.propTypes = {
  className: React.PropTypes.object,
};
