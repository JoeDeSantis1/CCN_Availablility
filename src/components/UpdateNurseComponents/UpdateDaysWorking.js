import React from 'react';

import Form from 'react-bootstrap/Form';

export default class UpdateFormDaysWorking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sun: false,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false
    }

    this.initialState = this.state;
    this.daysArray = [];
    
    this.handleChange = this.handleChange.bind(this);
    this.joinDaysWorking = this.joinDaysWorking.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.resetValue !== prevProps.resetValue) {
      this.setState(this.initialState);
      this.daysArray = [];
    }
    
    if((this.props.daysWorking !== prevProps.daysWorking) && this.props.daysWorking !== null) {
      this.daysArray = [];
      for (const [key] of Object.entries(this.state)) {
        if (this.props.daysWorking.includes(key)) {
          this.setState({
            [key]: true
          });
          this.daysArray.push(key);
        };
      };
    };
  };

  joinDaysWorking(array) {
    if (array.length > 1) {
       return array.join(", ");
    } else {
       return array.join();
    }
  }

  handleChange(e) {
    const id = e.target.id;

    if(!this.daysArray.includes(e.target.value)) {
      this.daysArray.push(e.target.value);
    } else if(this.daysArray.includes(e.target.value)) {
      this.daysArray.splice(this.daysArray.indexOf(e.target.value), 1);
    }

    if (this.daysArray.length > 3) {
      this.daysArray.pop();
      alert("A nurse can only work, at most, 3 days a week");
    } else {
      if (this.state[id] === true) {
        this.setState({
          [id]: false
        });
      } else if (this.state[id] === false){
        this.setState({
          [id]: true
        });
      };
    }

    const key = "daysWorking";
    const value = this.joinDaysWorking(this.daysArray);
    this.props.updateInfo(key, value);

    e.preventDefault();
  }

  render() {
      return (
        <Form>
            <Form.Label>Work Days:</Form.Label>
            {['checkbox'].map((type) => (
                <div key={`inline-${type}`} className="mb-3 border rounded p-2">
                    <Form.Check inline label="Sunday" type={type} id='sun' value="sun" onChange={this.handleChange} checked={this.state.sun}/>
                    <Form.Check inline label="Monday" type={type} id='mon' value="mon" onChange={this.handleChange} checked={this.state.mon}/>
                    <Form.Check inline label="Tuesday" type={type} id='tue' value="tue" onChange={this.handleChange} checked={this.state.tue}/>
                    <Form.Check inline label="Wednesday" type={type} id='wed' value="wed" onChange={this.handleChange} checked={this.state.wed}/>
                    <Form.Check inline label="Thursday" type={type} id='thu' value="thu" onChange={this.handleChange} checked={this.state.thu}/>
                    <Form.Check inline label="Friday" type={type} id='fri' value="fri" onChange={this.handleChange} checked={this.state.fri}/>
                    <Form.Check inline label="Saturday" type={type} id='sat' value="sat" onChange={this.handleChange} checked={this.state.sat}/>
                </div>
                )
            )}
        </Form>
      );
  }
}

