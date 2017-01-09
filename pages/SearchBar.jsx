import React from 'react';
import { Link } from 'react-router'; // eslint-disable-line
import Col from 'react-bootstrap/lib/Col';
import FontAwesome from 'react-fontawesome';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Col lg={6} lgOffset={3} md={6} mdOffset={3} sm={6} smOffset={3} xs={2} xsOffset={5} className="searchbar-form-wrapper">
        <Form className="searchbar-form animated fadeIn">
          <FormGroup bsSize="lg">
            <InputGroup bsSize="lg">
              <FormControl type="text" placeholder="Start typing to search..." onChange={this.props.onChangeFilter} value={this.props.value || ''} />
              <InputGroup.Addon>
                <FontAwesome name="search" />
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </Form>
      </Col>
    );
  }
}

SearchBar.propTypes = {
  value: React.PropTypes.string,
  onChangeFilter: React.PropTypes.func,
};
