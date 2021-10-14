import React from 'react';

import Form from 'react-bootstrap/Form';

export default class AddFormShift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Select Shift"
    }

    this.initialState = this.state;

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.resetValue !== prevProps.resetValue) {
        this.setState(this.initialState);
    }
  }

  handleChange(e) {
    const key = "shift";
    const value = e.target.value;
    this.props.updateInfo(key, value.toLowerCase());

    this.setState({
      value: value
    })
  }

  render() {
    return (
      <Form>
          <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Shift:</Form.Label>
              <Form.Control as="select" custom onChange={this.handleChange} value={this.state.value}>
                  <option>Select Shift</option>
                  <option>Day</option>
                  <option>Night</option>
              </Form.Control>
          </Form.Group>
      </Form>
    );
  }
}