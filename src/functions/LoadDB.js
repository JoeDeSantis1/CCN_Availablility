import React from 'react';
import { data } from '../components/NurseDataTableComponents/NurseDataTable';

export default class LoadDB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            firstName: "",
            lastName: "",
            clinicalLadder: "",
            lastDateInCCN: "",
            hireDate: "",
            seniority: 0
        };

        this.userArray = [];
        this.randomDate1 = new Date();
        this.randomDate2 = new Date();

        this.handleGenerate = this.handleGenerate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.generateInfo = this.generateInfo.bind(this);
        this.generateID = this.generateID.bind(this);
        this.generateCL = this.generateCL.bind(this);
        this.generateSkills = this.generateSkills.bind(this);
        this.generateCCNdate = this.generateCCNdate.bind(this);
        this.generatehireDate = this.generatehireDate.bind(this);
        this.showMe = this.showMe.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState !== this.state) {
            this.userArray.push(this.state);
        }
    }

    generateInfo() {
        fetch('https://randomuser.me/api/?results=150&nat=us')
        .then(res => res.json())
        .then(info => {
            console.log(info);
            for(let i=0; i<info.results.length; i++) {
                this.setState({
                    id: this.generateID(),
                    firstName: info.results[i].name.first,
                    lastName: info.results[i].name.last,
                    clinicalLadder: this.generateCL(),
                    skills: this.generateSkills(),
                    lastDateInCCN: this.generateCCNdate(),
                    hireDate: this.generatehireDate(),
                    seniority: this.generateSeniority()
                });
            }
        })
        
    }

    generateID() {
        return Math.floor(Math.random() * (99999 - 10000) + 10000);
    }

    generateCL() {
        let randomNum = Math.floor(Math.random() * 3);
        if(randomNum === 0) {
            return 'II';
        } else if (randomNum === 1) {
            return 'III';
        } else {
            return 'IV';
        };
    }

    generateSkills() {
        let skillsArray = [];
        for(let i=0; i<5; i++) {
            let randomNum = Math.floor(Math.random() * 100);
            if(randomNum < 8 && !skillsArray.includes('Charge')) {
                skillsArray.push('Charge');
            } else if (randomNum >= 8 && randomNum < 15 && !skillsArray.includes('DR/Resource')) {
                skillsArray.push('DR/Resource');
            } else if (randomNum >= 15 && randomNum <= 25 && !skillsArray.includes('Preceptor')) {
                skillsArray.push('Preceptor');
            } else if (randomNum > 25 && randomNum < 27 && !skillsArray.includes('ECMO')) {
                skillsArray.push('ECMO');
            }
        }

        if (skillsArray.length > 1) {
            return skillsArray.join(", ");
        } else {
            return skillsArray.join();
        }
    }

    generateCCNdate() {
        const start = new Date(2020, 0, 1);
        const end = new Date();

        this.randomDate1 = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

        const year = this.randomDate1.getFullYear();
        const month = this.randomDate1.getMonth() + 1;
        const day = this.randomDate1.getDate();
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

    generatehireDate() {
        const start = new Date(2012, 0, 1);
        const end = new Date(2019, 11, 31);

        this.randomDate2 = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

        const year = this.randomDate2.getFullYear();
        const month = this.randomDate2.getMonth() + 1;
        const day = this.randomDate2.getDate();
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

    generateSeniority(){
        const currentDate = new Date();
        const d1Y = this.randomDate2.getFullYear();
        const d2Y = currentDate.getFullYear();
        const d1M = this.randomDate2.getMonth();
        const d2M = currentDate.getMonth();
        const dateDifference = (((d2M+12*d2Y)-(d1M+12*d1Y))/12);

        console.log(dateDifference.toFixed(1));
        return dateDifference.toFixed(1);
    }

    handleGenerate() {
        this.generateInfo();
    }

    handleSubmit() {
        for(let i=0; i<this.userArray.length; i++) {
            fetch('http://localhost:4000/load_db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.userArray[i])
                })
                .then(res => console.log(res.text()));
        }
    }

    showMe() {
        console.log(this.userArray);
    }

    render() {
        return(
            <div>
                <input type="submit" value="Generate Nurses" onClick={this.handleGenerate} className="mb-3"></input>
                <input type="submit" value="Show info" onClick={this.showMe} className="mb-3"></input>
                <input type="submit" value="Submit" onClick={this.handleSubmit} className="mb-3"></input>
            </div>
        )
    }
}