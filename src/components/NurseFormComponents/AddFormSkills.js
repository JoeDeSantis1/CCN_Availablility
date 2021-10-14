import React from 'react';

import Form from 'react-bootstrap/Form';


export default class AddFormSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charge: false,
      dr: false,
      preceptor: false,
      ecmo: false
    }

    this.initialState = this.state;
    this.skillsArray = [];
    
    this.handleChange = this.handleChange.bind(this);
    this.joinSkills = this.joinSkills.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.resetValue !== prevProps.resetValue) {
        this.setState(this.initialState);
        this.skillsArray = [];
    };
  }

  joinSkills(array) {
    if (array.length > 1) {
       return array.join(", ");
    } else {
       return array.join();
    }
  }


  handleChange(e) {
    if(!this.skillsArray.includes(e.target.value)) {
      this.skillsArray.push(e.target.value);
    }
    else if(this.skillsArray.includes(e.target.value)) {
      this.skillsArray.splice(this.skillsArray.indexOf(e.target.value), 1);
    }
    
    const key = "skills";
    const value = this.joinSkills(this.skillsArray);
    this.props.updateInfo(key, value);
  }

  handleChecked(e) {
    const id = e.target.id;

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

  render() {
    return (
      <div>
          <Form>
          <Form.Label>Skills:</Form.Label>
          {['checkbox'].map((type) => (
              <div key={`inline-${type}`} className="mb-3 border rounded p-2" onChange={this.handleChange}>
                  <Form.Check inline label="Charge" type={type} id='charge' value="Charge" onChange={this.handleChecked} checked={this.state.charge} />
                  <Form.Check inline label="DR/Resource" type={type} id='dr' value="DR" onChange={this.handleChecked} checked={this.state.dr} />
                  <Form.Check inline label="Preceptor" type={type} id='preceptor' value="Preceptor" onChange={this.handleChecked} checked={this.state.preceptor} />
                  <Form.Check inline label="ECMO" type={type} id='ecmo' value="ECMO" onChange={this.handleChecked} checked={this.state.ecmo} />
              </div>
              )
          )
          }
        </Form>
      </div>
    );
  }
}
