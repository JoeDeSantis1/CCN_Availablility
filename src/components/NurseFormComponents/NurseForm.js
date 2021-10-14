import React from 'react';

import AddFormClinicalLadder from './AddFormClinicalLadder';
import AddFormDates from './AddFormDates';
import AddFormName from './AddFormName';
import AddFormNurseID from './AddFormNurseID';
import AddFormSkills from './AddFormSkills';
import AddDaysWorking from './AddDaysWorking';
import AddShift from './AddShift';

export default class AddNurseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "Lawson ID",
      firstName: "First Name",
      lastName: "Last Name",
      clinicalLadder: "Select Level",
      skills: "",
      lastDateInCCN: "",
      hireDate: "",
      seniority: "",
      daysWorking: "",
      shift: "Select Shift"
    }

    this.initialValue = this.state;
    this.reset = 0;

    this.updateInfo = this.updateInfo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const submitInfo = this.state;

    fetch('http://localhost:4000/add_nurse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitInfo)
      })
      .then(res => {
        console.log(res.text())
        alert(`${submitInfo.firstName} has been added to the database`)
    });

    e.preventDefault();

    if (this.reset === 0) {
      this.reset = 1
    } else if (this.reset === 1) {
      this.reset = 0
    }

    this.props.refreshTables();
    this.setState(this.initialValue);
  }

  
  updateInfo(key, value) {
    this.setState({
        [key]: value
    });
  }

  render() {
    return (
      <div>
          <AddFormNurseID id={this.state.id} updateInfo={this.updateInfo} />
          <br />
          <AddFormName firstName={this.state.firstName} lastName={this.state.lastName} updateInfo={this.updateInfo} /> 
          <br />
          <AddFormClinicalLadder resetValue={this.reset} updateInfo={this.updateInfo} />
          <AddFormSkills resetValue={this.reset} updateInfo={this.updateInfo} />
          <AddDaysWorking resetValue={this.reset} updateInfo={this.updateInfo}/>
          <AddShift resetValue={this.reset} updateInfo={this.updateInfo}/>
          <AddFormDates resetValue={this.reset} updateInfo={this.updateInfo} />
          <input type="submit" value="Submit" onClick={this.handleSubmit} className="mb-3"></input>
      </div>  

    );
  };
}