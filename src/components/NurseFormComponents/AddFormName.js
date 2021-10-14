import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class AddFormName extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    this.props.updateInfo(key, value);
  }

  handleClick(e) {
    const key = e.target.name;
    this.props.updateInfo(key, "");
  }

  render() {
      return (
        <Form>
            <Row>
                <Col>
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control value={this.props.firstName} name="firstName" onChange={this.handleChange} onClick={this.handleClick}/>
                </Col>
                <Col>
                    <Form.Label>Last Name:</Form.Label> 
                    <Form.Control value={this.props.lastName} name="lastName" onChange={this.handleChange} onClick={this.handleClick}/>
                </Col>
            </Row>
        </Form>
      );
  }
}
