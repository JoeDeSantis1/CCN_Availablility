import React from 'react';

import Form from 'react-bootstrap/Form';


export default class UpdateFormSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Charge: false,
      DR: false,
      Preceptor: false,
      ECMO: false
    }

    this.initialState = this.state;
    this.skillsArray = [];
    
    this.handleChange = this.handleChange.bind(this);
    this.joinSkills = this.joinSkills.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.resetValue !== prevProps.resetValue) {
      this.setState(this.initialState);
      this.skillsArray = [];
    }
    
    if((this.props.skills !== prevProps.skills) && this.props.skills !== null) {
      this.skillsArray = [];
      for (const [key] of Object.entries(this.state)) {
        if (this.props.skills.includes(key)) {
          this.setState({
            [key]: true
          });
          this.skillsArray.push(key);
        }
      }
    }
  }

  
  joinSkills(array) {
    if (array.length > 1) {
       return array.join(", ");
    } else {
       return array.join();
    }
  }


  handleChange(e) {
    const chosenSkill = e.target.value;

    if (!this.skillsArray.includes(chosenSkill)) {
      this.skillsArray.push(chosenSkill);
    }
    else if (this.skillsArray.includes(chosenSkill)) {
      this.skillsArray.splice(this.skillsArray.indexOf(chosenSkill), 1);
    }

    if (this.state[chosenSkill] === true) {
      this.setState({
        [chosenSkill]: false
      });
    } else if (this.state[chosenSkill] === false){
      this.setState({
        [chosenSkill]: true
      });
    };

    const key = "skills";
    const value = this.joinSkills(this.skillsArray);

    this.props.updateInfo(key, value);
  }


  render() {
    return (
      <Form>
          <Form.Label>Skills:</Form.Label>
          {['checkbox'].map((type) => (
              <div key={`inline-${type}`} className="mb-3 border rounded p-2">
                  <Form.Check inline label="Charge" type={type} id='Charge' onChange={this.handleChange} checked={this.state.Charge} value="Charge" />
                  <Form.Check inline label="DR/Resource" type={type} id='DR' onChange={this.handleChange} checked={this.state.DR} value="DR" />
                  <Form.Check inline label="Preceptor" type={type} id='Preceptor' onChange={this.handleChange} checked={this.state.Preceptor} value="Preceptor" />
                  <Form.Check inline label="ECMO" type={type} id='ECMO' onChange={this.handleChange} checked={this.state.ECMO} value="ECMO" />
              </div>
              )
          )
          }
      </Form>
    );
  }
}
