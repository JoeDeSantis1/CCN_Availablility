import React from 'react';

import { data } from '../components/NurseDataTableComponents/NurseDataTable';

import Button from 'react-bootstrap/Button';

export default class LoadSchedule extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     id: "",
        //     shift: "",
        //     daysWorking: ""
        // };

        this.schObj = {
            id: "",
            shift: "",
            daysWorking: ""
        }

        this.schedule = [];
        this.scheduleArray = [];

        this.generateDayScheduleArray = this.generateDayScheduleArray.bind(this);
        this.generateNightScheduleArray = this.generateNightScheduleArray.bind(this);
        this.buildDayScheduleArray = this.buildDayScheduleArray.bind(this);
        this.buildNightScheduleArray = this.buildNightScheduleArray.bind(this);
        this.uploadSchedule = this.uploadSchedule.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState !== this.state) {
            this.schedule.push(this.state);
        }
        console.log(this.schedule);
    }


    generateDayScheduleArray() {
        let daysArray = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
        let amountArray = [25, 34, 34, 34, 35, 35, 35];
        let tempArray = [];
        let randomNum;

        do {
            randomNum = Math.floor(Math.random() * amountArray.length);
            console.log(randomNum);
            if(tempArray.length < 3 && !tempArray.includes(daysArray[randomNum])) {
                tempArray.push(daysArray[randomNum]);
                console.log(tempArray);
                amountArray[randomNum] = amountArray[randomNum] - 1;
                console.log(amountArray);
                if(amountArray[randomNum] === 0) {
                    amountArray.splice(amountArray.indexOf(amountArray[randomNum]), 1);
                    daysArray.splice(daysArray.indexOf(daysArray[randomNum]), 1);
                }
            } else if (tempArray.length === 3) {
                this.scheduleArray.push(tempArray.join(', '));
                tempArray.splice(0, 3);
            }
            console.log(this.scheduleArray);

        } while (amountArray.length >=3 && this.scheduleArray.length <= 73);
    }

    buildDayScheduleArray() {
        for(let i=0; i<this.scheduleArray.length; i++) {
            this.schObj = {
            id: data[i].nurseID,
            shift: "day",
            daysWorking: this.scheduleArray[i]
        }
        this.schedule.push(this.schObj);
        console.log(this.schedule);
        }
    }

    buildNightScheduleArray() {
        for(let i=76; i<this.scheduleArray.length+76; i++) {
            this.schObj = {
            id: data[i].nurseID,
            shift: "night",
            daysWorking: this.scheduleArray[i-76]
        }
        this.schedule.push(this.schObj);
        console.log(this.schedule);
        }
    }

    generateNightScheduleArray() {
        let nightsArray = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
        let amountArray = [25, 34, 34, 34, 35, 35, 35];
        let tempArray = [];
        let randomNum;

        do {
            randomNum = Math.floor(Math.random() * amountArray.length);
            console.log(randomNum);
            if(tempArray.length < 3 && !tempArray.includes(nightsArray[randomNum])) {
                tempArray.push(nightsArray[randomNum]);
                console.log(tempArray);
                amountArray[randomNum] = amountArray[randomNum] - 1;
                console.log(amountArray);
                if(amountArray[randomNum] === 0) {
                    amountArray.splice(amountArray.indexOf(amountArray[randomNum]), 1);
                    nightsArray.splice(nightsArray.indexOf(nightsArray[randomNum]), 1);
                }
            } else if (tempArray.length === 3) {
                this.scheduleArray.push(tempArray.join(', '));
                tempArray.splice(0, 3);
            }
            console.log(this.scheduleArray);

        } while (amountArray.length >=3 && this.scheduleArray.length <= 73);
    }

    uploadSchedule() {
        for(let i=0; i<this.schedule.length; i++) {
            fetch('http://localhost:4000/load_schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.schedule[i])
                })
                .then(res => console.log(res.text()));
        }
    }

    render() {
        return(
            <div>
                <Button onClick={this.generateDayScheduleArray}>Generate Day Schedule</Button>{' '}
                <Button onClick={this.generateNightScheduleArray}>Generate night Schedule</Button>{' '}
                <Button onClick={this.uploadSchedule}>Upload Schedule</Button>
                <br />
                <Button onClick={this.buildDayScheduleArray}>Build Day Schedule Array</Button>{' '}
                <Button onClick={this.buildNightScheduleArray}>Build Night Schedule Array</Button>{' '}
            </div>
        )
    }
}

