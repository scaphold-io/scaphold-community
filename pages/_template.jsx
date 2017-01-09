import React from 'react';
import { Link } from 'react-router'; // eslint-disable-line
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import FontAwesome from 'react-fontawesome';
import Image from 'react-bootstrap/lib/Image';
import Grid from 'react-bootstrap/lib/Grid';
import UniversalFooter from './UniversalFooter';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import typography from '../utils/typography';

// Import styles.
import '../css/main.css';
import '../css/footer.css';
import '../css/base.css';
import '../css/community.css';
import '../css/learn.css';
import '../css/projects.css';
import '../css/blog.css';
import '../css/questions.css';

import ScapholdLogo from './images/scaphold-logo.png';
import ScapholdFullLogo from './images/full_logo-min.png';

const { rhythm } = typography;

export default class BaseTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const headerComponent = (
      <Nav pullRight className={'headerNav'}>
        <LinkContainer to={prefixLink('/learn/')}>
          <NavItem eventKey={1}>
            <FontAwesome name="book" className={'navBarIcon'} />
            Learn
          </NavItem>
        </LinkContainer>
        <LinkContainer to={prefixLink('/projects/')}>
          <NavItem eventKey={2}>
            <FontAwesome name="star" className={'navBarIcon'} />
            Projects
          </NavItem>
        </LinkContainer>
        <LinkContainer to={prefixLink('/blog/')}>
          <NavItem eventKey={3}>
            <FontAwesome name="bookmark-o" className={'navBarIcon'} />
            Blog
          </NavItem>
        </LinkContainer>
        <LinkContainer to={prefixLink('/questions/')}>
          <NavItem eventKey={4}>
            <FontAwesome name="question" className={'navBarIcon'} />
            Questions
          </NavItem>
        </LinkContainer>
        <NavItem eventKey={5} href={'https://scaphold.io/docs'} target="_blank">
          <FontAwesome name="code" className={'navBarIcon'} />
          Docs
        </NavItem>
        <NavItem eventKey={6} href={'https://scaphold.io/?signupModal=true&source=community'} target="_blank">
          <FontAwesome name="play" className={'navBarIcon'} />
          Get Started
        </NavItem>
      </Nav>
    );

    return (
      <div>
        <Navbar fluid className={'topNav'} fixedTop>
          <Navbar.Header>
            <Navbar.Brand className={'navbarBrand'}>
              <a
                href="https://scaphold.io"
                target="_blank" // eslint-disable-line react/jsx-no-target-blank
              >
                <Image
                  className={'scapholdLogo'}
                  src={`${ScapholdLogo}`}
                  alt="ScapholdLogo"
                />
                <Image
                  className={'scapholdBrandLogo'}
                  src={`${ScapholdFullLogo}`}
                  alt="ScapholdFullLogo"
                />
              </a>
              <Link to={prefixLink('/')}>
                <span className={'solution'}>
                  Community
                </span>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle className="navbarToggle" />
          </Navbar.Header>
          <Navbar.Collapse>
            {headerComponent}
          </Navbar.Collapse>
        </Navbar>

        <Grid fluid className={'content'} style={{ padding: `${rhythm(1)} ${rhythm(3 / 4)}` }}>
          <Grid>
            {this.props.children}
            <UniversalFooter />
          </Grid>
        </Grid>
      </div>
    );
  }
}

BaseTemplate.propTypes = {
  children: React.PropTypes.object,
};
