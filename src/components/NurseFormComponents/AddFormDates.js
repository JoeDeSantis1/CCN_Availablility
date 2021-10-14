import React from 'react';
import DatePicker from "react-datepicker";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "react-datepicker/dist/react-datepicker.css";

export default class AddFormDates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastDate: new Date(),
            hireDate: new Date() 
        }

        this.initialState = this.state;

        this.handleDateChange = this.handleDateChange.bind(this);
        this.convertDate = this.convertDate.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.lastDate !== prevState.lastDate) {
           this.props.updateInfo("lastDateInCCN", this.convertDate(this.state.lastDate));

        } else if(this.state.hireDate !== prevState.hireDate) {
           this.props.updateInfo("hireDate", this.convertDate(this.state.hireDate));
           this.props.updateInfo("seniority", this.generateSeniority(this.state.hireDate));
        };

        if(this.props.resetValue !== prevProps.resetValue) {
            this.setState(this.initialState);
        }
    }

    handleDateChange(date, type) {
        this.setState({
            [type]: date
        });
    }

    convertDate(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        let fullDate = "";

        if(day < 10 && month < 10) {
            fullDate = `${year}-0${month}-0${day}`;
        } else if (day < 10) {
            fullDate = `${year}-${month}-0${day}`;
        } else if (month < 10) {
            fullDate = `${year}-0${month}-${day}`;
        } else {
            fullDate = `${year}-${month}-${day}`;
        }
        
        return fullDate;
    }

    generateSeniority(date){
        const currentDate = new Date();
        const d1Y = date.getFullYear();
        const d2Y = currentDate.getFullYear();
        const d1M = date.getMonth();
        const d2M = currentDate.getMonth();
        const dateDifference = (((d2M+12*d2Y)-(d1M+12*d1Y))/12);

        return dateDifference.toFixed(1);
    }

    render() {
        return (  
        <Form>
            <Row style={{padding: "15px", height: "130px"}}>
                <Col className="border rounded p-2 mr-3">
                    <Form.Label>Last Date in CCN:</Form.Label>
                    <br />
                    <DatePicker 
                        selected={this.state.lastDate} 
                        onChange={date => this.handleDateChange(date, "lastDate")} 
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        className="border rounded p-2" 
                    />
                </Col>
                <Col className="border rounded p-2 ml-3">
                    <Form.Label>Hire Date:</Form.Label>
                    <br />
                    <DatePicker 
                        selected={this.state.hireDate} 
                        onChange={date => this.handleDateChange(date, "hireDate")} 
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        className="border rounded p-2" 
                        />
                </Col>
            </Row>
        </Form>
    );
}
}
