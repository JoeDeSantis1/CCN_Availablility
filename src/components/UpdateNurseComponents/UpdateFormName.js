import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class UpdateFormName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'First Name',
      lastName: 'Last Name'
    }

    this.initialState = this.state;

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if((this.props.firstName !== prevProps.firstName) || (this.props.lastName !== prevProps.lastName)) {
      this.setState({
        firstName: this.props.firstName,
        lastName: this.props.lastName
      });
    };
  }

  handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    this.props.updateInfo(key, value);

    this.setState({
      [key]: e.target.value
    });
  }


  render() {
      return (
        <Form>
            <Row>
                <Col>
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control name="firstName" onChange={this.handleChange} value={this.state.firstName} /> 
                </Col>
                <Col>
                    <Form.Label>Last Name:</Form.Label> 
                    <Form.Control name="lastName" onChange={this.handleChange} value={this.state.lastName} />
                </Col>
            </Row>
        </Form>
      );
  }
}
