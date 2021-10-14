import React from 'react';

import Form from 'react-bootstrap/Form';

export default class AddFormClinicalLadder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Select Level"
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
    const key = "clinicalLadder";
    const value = e.target.value;
    this.props.updateInfo(key, value);
    
    this.setState({
      value: value
    })
  }

  render() {

    
    return (
      <Form>
          <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Clinical Ladder:</Form.Label>
              <Form.Control as="select" custom onChange={this.handleChange} value={this.state.value}>
                  <option>Select Level</option>
                  <option>II</option>
                  <option>III</option>
                  <option>IV</option>
              </Form.Control>
          </Form.Group>
      </Form>
    );
  }
}
