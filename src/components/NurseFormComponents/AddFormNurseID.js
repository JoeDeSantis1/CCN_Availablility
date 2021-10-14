import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class AddFormNurseID extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    const key = "id";
    const value = e.target.value;
    this.props.updateInfo(key, value)
  }

  handleClick() {
    this.props.updateInfo("id", "");
  }

  render() {
    return (
      <Form>
          <Row>
              <Col>
                  <Form.Label>Nurse Lawson ID:</Form.Label>
                  <Form.Control value={this.props.id} onChange={this.handleChange} onClick={this.handleClick}/>
              </Col>
          </Row>
      </Form>
    );
  }
}
