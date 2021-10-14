import React from 'react';

import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import NurseForm from './NurseFormComponents/NurseForm'; 
import NurseDataTable from './NurseDataTableComponents/NurseDataTable';
import UpdateNurseForm from './UpdateNurseComponents/UpdateNurseForm';
import NextInCCN from './NextInCCNComponents/NextInCCN';


export default class Navigation2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '00000',
            firstName: null,
            lastName: null,
            clinicalLadder: null,
            skills: null,
            lastDateInCCN: null,
            hireDate: null,
            seniority: null,
            daysWorking: null,
            shift: null,
            tabName: 'home',
            showUpdate: false,
            refreshValue: 0
        }

        // used for hiding the update tab
        this.updateDisabled = true;
        // used for hiding the nurse information tab
        this.infoDisabled = false;
        this.updateTitle = null;
        this.infoTitle = "Nurse Information"
        this.initialValue = {
            id: '00000',
            firstName: null,
            lastName: null,
            clinicalLadder: null,
            skills: null,
            lastDateInCCN: null,
            hireDate: null,
            seniority: null,
            daysWorking: null,
            shift: null
        }

        this.handleTab = this.handleTab.bind(this);
        this.updateNurse = this.updateNurse.bind(this);
        this.refreshTables = this.refreshTables.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.resetNurseInfo = this.resetNurseInfo.bind(this);
    }


    handleTab(k) {
        this.setState(prevState => ({
            tabName: k,
            showUpdate: true
        }));

        this.infoDisabled = !this.infoDisabled;
        this.updateDisabled = !this.updateDisabled;
        
        if(this.updateTitle === null && this.infoTitle === "Nurse Information") {
            this.updateTitle = "Update Nurse Profile";
            this.infoTitle = null;
        } else if (this.updateTitle === "Update Nurse Profile" && this.infoTitle === null) {
            this.updateTitle = null;
            this.infoTitle = "Nurse Information";
        }
    }


    updateNurse(i) {
        this.setState({
            id: i.nurseID,
            firstName: i.firstName,
            lastName: i.lastName,
            clinicalLadder: i.clinicalLadder,
            skills: i.skills,
            lastDateInCCN: i.lastDateInCCN,
            hireDate: i.hireDate,
            seniority: i.seniority,
            daysWorking: i.daysWorking,
            shift: i.shift,
        });
    }


    updateInfo(key, value) {
        this.setState({
          [key]: value
        });  
    }


    resetNurseInfo() {
        this.setState(this.initialValue);
    }
    
    
    refreshTables(){
        this.setState({
            refreshValue: !this.state.refreshValue
        })
    }


    render(){
        return(
            <Container>
                <Tabs 
                    defaultActiveKey='home'
                    activeKey={this.state.tabName}
                    id="uncontrolled-tab-example"
                    onSelect={(k) => this.setState({tabName: k})}>
                        <Tab eventKey="home" title="Who's Next">
                            <NextInCCN 
                                refresh={this.state.refreshValue} 
                                refreshTables={this.refreshTables} 
                            />
                        </Tab>
                        <Tab eventKey="add" title="Add Nurse">
                            <h2>Add a nurse to the database</h2>
                            <NurseForm 
                                refreshTables={this.refreshTables}
                            />
                        </Tab>
                        <Tab eventKey="nurseInfo" title={this.infoTitle} disabled={this.infoDisabled}>
                            <NurseDataTable 
                                handleTab={this.handleTab} 
                                updateNurse={this.updateNurse} 
                                refreshTables={this.refreshTables} 
                                refresh={this.state.refreshValue} 
                            />
                        </Tab>
                        <Tab eventKey="update" title={this.updateTitle} disabled={this.updateDisabled}>
                            <h2>Updates Nurse's Profile</h2>
                            <UpdateNurseForm 
                                handleTab={this.handleTab} 
                                refreshTables={this.refreshTables} 
                                updateInfo={this.updateInfo} 
                                resetNurseInfo={this.resetNurseInfo} 
                                infoToUpdate={this.state}
                                refreshValue={this.state.refreshValue}
                            />
                        </Tab> 
                </Tabs>
            </Container>
        )
    }
} 