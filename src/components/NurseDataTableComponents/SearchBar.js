import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: "Enter a nurses ID or name",
      value: ''
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
    const input = e.target.value;
    console.log(input);
    this.props.handleSearch(input);

    this.setState({
      value: input
    })
  }

  // Disables Enter key as it was returning user to 'Who's Next' tab if hit while in the search box
  handleEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }
  

  render() {
      return (
        <Form>
            <Row>
                <Form.Label>Search Nurses:</Form.Label>
                <Form.Control placeholder={this.state.placeholder} onChange={this.handleChange} onKeyPress={this.handleEnter} value={this.state.value}/>
            </Row>
        </Form>
      );
  }
}