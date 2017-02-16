import React from 'react';
import { Link } from 'react-router'; // eslint-disable-line
import Helmet from 'react-helmet';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Fuse from 'fuse.js';
import SearchBar from '../SearchBar';
import { config } from 'config'; // eslint-disable-line
import projects from './projects';
import pageColorMap from '../../utils/pageColorMap';

export default class ProjectsIndex extends React.Component {
  static metadata() {
    return {
      title: 'Projects',
      description: 'Find amazing GraphQL projects built by the community.',
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

    let filteredProjectsList = projects;
    if (this.state.filter && this.state.filter.length) {
      const fuse = new Fuse(projects, options);
      filteredProjectsList = fuse.search(this.state.filter);
    }

    // Determine bg color of banner
    const path = this.props.route.page.path;
    const pathKey = `${path.substring(1, path.length - 1)}`;
    const headerColor = pageColorMap[pathKey];

    return (
      <div className="">
        <Helmet
          title={`${ProjectsIndex.metadata().title} | ${config.siteTitle}`}
          meta={[
            {
              name: 'description',
              content: `${ProjectsIndex.metadata().description}`,
            },
            { property: 'og:title', content: `${ProjectsIndex.metadata().title} | ${config.siteTitle}` },
            { property: 'og:description', content: ProjectsIndex.metadata().description },
            { property: 'og:image', content: 'https://assets.scaphold.io/community/Scaphold_Community_Open_Graph.png' },
            { property: 'og:url', content: `${config.baseUrl}${config.linkPrefix}${this.props.route.page.path}` },
          ]}
        />
        <div className="wrapper" style={{ backgroundColor: headerColor }}>
          <Grid>
            <div className="community-header">
              <h1>{ProjectsIndex.metadata().title}</h1>
            </div>
            <div className="community-header-copy">
              <Col lg={6} lgOffset={3} md={6} mdOffset={3} sm={6} smOffset={3} xs={6} xsOffset={3} className="community-copy-wrapper">
                <p>{ProjectsIndex.metadata().description}</p>
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
                <span className="community-header-number"><b>{filteredProjectsList.length} Projects</b></span>
              </div>
              <Button className="community-header-submit" bsStyle="primary" onClick={() => { window.Intercom('show'); }}>
                Submit Project
              </Button>
            </Col>
          </Row>
          <Row className="projects-list">
            {
              filteredProjectsList.map((project, i) => {
                const descriptionPopover = (
                  <Popover id="project-popover-trigger-hover-focus" title={project.title}>
                    {project.description}
                  </Popover>
                );
                return (
                  <Col lg={4} md={4} sm={4} xs={12} key={i}>
                    <a href={project.url} target="_blank">
                      <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={descriptionPopover}>
                        <Panel className="project-item">
                          <Row className="project-img-wrapper">
                            <Col
                              lg={4}
                              lgOffset={4}
                              md={4}
                              mdOffset={4}
                              sm={4}
                              smOffset={4}
                              xs={4}
                              xsOffset={4}
                            >
                              <Image src={project.img} className="project-img" />
                            </Col>
                          </Row>
                          <div className="project-title">
                            <h3>
                              {project.title}
                            </h3>
                            <div className="project-meta">
                              <p className="project-author">
                                by <span>{project.author}</span>
                              </p>
                            </div>
                          </div>
                        </Panel>
                      </OverlayTrigger>
                    </a>
                  </Col>
                );
              })
            }
          </Row>
        </Grid>
      </div>
    );
  }
}

ProjectsIndex.propTypes = {
  route: React.PropTypes.object,
};
