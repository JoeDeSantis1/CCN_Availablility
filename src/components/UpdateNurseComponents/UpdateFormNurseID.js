import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class UpdateFormNurseID extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'Lawson ID'
    }

    this.initialState = this.state;
  }

  componentDidUpdate(prevProps) {
    if(this.props.id !== prevProps.id) {
      this.setState({
        placeholder: this.props.id
      })
    }
  }

  render() {
    return (
      <Form>
          <Row>
              <Col>
                  <Form.Label>Nurse Lawson ID (Cannot Edit):</Form.Label>
                  <Form.Control placeholder={this.state.placeholder} onChange={this.handleChange} />
              </Col>
          </Row>
      </Form>
    );
  }
}
