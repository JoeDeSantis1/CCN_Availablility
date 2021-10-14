import React from 'react';

import UpdateFormClinicalLadder from './UpdateFormClinicalLadder';
import UpdateFormDates from './UpdateFormDates';
import UpdateFormName from './UpdateFormName';
import UpdateFormNurseID from './UpdateFormNurseID';
import UpdateFormSkills from './UpdateFormSkills';
import UpdateFormShift from './UpdateShift';
import UpdateFormDaysWorking from './UpdateDaysWorking';

import Button from 'react-bootstrap/Button';

export default class UpdateNurseForm extends React.Component {
  constructor(props) {
    super(props);

    this.shiftWord = '';
    this.reset = 0;

    this.updateInfo = this.updateInfo.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  
  componentDidUpdate(prevProps) {
    // capitalizes shift string 
    if((prevProps.infoToUpdate.shift !== this.props.infoToUpdate.shift) && this.props.infoToUpdate.shift != null) {
        this.shiftWord = this.props.infoToUpdate.shift.charAt(0).toUpperCase() + this.props.infoToUpdate.shift.slice(1);
    }

    if(prevProps.refreshValue !== this.props.refreshValue) {
      if (this.reset === 0) {
        this.reset = 1
      } else if (this.reset === 1) {
        this.reset = 0
      }
    }
  }

  
  handleUpdate(e) {
    fetch('https://backend-ccn.herokuapp.com/update_nurse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.props.infoToUpdate)
      })
      .then(res => console.log(res.text()));

      alert(`${this.props.infoToUpdate.firstName} has been updated!`);

    e.preventDefault();

    this.props.refreshTables();
    this.handleCancel();
  }


  handleCancel() {
    this.props.handleTab("nurseInfo");

    if (this.reset === 0) {
      this.reset = 1
    } else if (this.reset === 1) {
      this.reset = 0
    }

    this.props.resetNurseInfo();
  }
  
  
  updateInfo(key, value) {
    this.props.updateInfo(key, value)
  }


  render() {
    return (
      <div>
          <UpdateFormNurseID updateInfo={this.updateInfo} id={this.props.infoToUpdate.id} />
          <br />
          <UpdateFormName updateInfo={this.updateInfo} firstName={this.props.infoToUpdate.firstName} lastName={this.props.infoToUpdate.lastName} /> 
          <br />
          <UpdateFormClinicalLadder updateInfo={this.updateInfo} clinicalLadder={this.props.infoToUpdate.clinicalLadder}/>
          <UpdateFormSkills resetValue={this.reset} updateInfo={this.updateInfo} skills={this.props.infoToUpdate.skills} />
          <UpdateFormDaysWorking resetValue={this.reset} updateInfo={this.updateInfo} daysWorking={this.props.infoToUpdate.daysWorking} />
          <UpdateFormShift updateInfo={this.updateInfo} shift={this.shiftWord} />
          <UpdateFormDates updateInfo={this.updateInfo} lastDateInCCN={this.props.infoToUpdate.lastDateInCCN} hireDate={this.props.infoToUpdate.hireDate} />
          <Button onClick={this.handleUpdate} className="mb-3">Update</Button>{' '}
          <Button onClick={this.handleCancel} className="mb-3">Cancel</Button>
      </div>  

    );
  };
}