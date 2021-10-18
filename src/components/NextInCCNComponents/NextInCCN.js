import React from 'react';

import DataTable, {defaultThemes} from 'react-data-table-component';
import Button from 'react-bootstrap/Button';


export default class NextInCCN extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ccnInfo: [],
            mainInfo: [],
            selectedRows: [[]],
            toggleClearRows: false
        }

        this.nursesWorking = [];
        this.loopCounter = 0;
        // used to determine if the main unit has a nurse with either ECMO, DR, or Charge skill
        this.skillWords = [{skill: 'ECMO', present: false}, {skill:'DR', present: false}, {skill: 'Charge', present: true}];
        // used to convert Date object's getDay() method to necessary string
        this.days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        this.currentDate = new Date();


        this.filterSchedArray = this.filterSchedArray.bind(this);
        this.filterNurseArray = this.filterNurseArray.bind(this);
        this.sortArrayByLastCCNdate = this.sortArrayByLastCCNdate.bind(this);
        this.checkForTwoSenNurses = this.checkForTwoSenNurses.bind(this);
        this.highestSeniorityIndex = this.highestSeniorityIndex.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
        this.updateCCNdate = this.updateCCNdate.bind(this);
        this.mainCCNlogic = this.mainCCNlogic.bind(this);
        this.convertDate = this.convertDate.bind(this);
        this.moveNurse = this.moveNurse.bind(this);
    }

    // updates data tables if nurse data changes in the DB
    async componentDidUpdate(prevProps) {
      if(this.props.refresh !== prevProps.refresh) {
        Promise.all([
          await fetch('https://backend-ccn.herokuapp.com/nurse_sched')
          .then(res => res.json())
          .then(data => {
              this.filterSchedArray(data);
              return 'refresh nurse sched all Good'            
          }),
          await fetch('https://backend-ccn.herokuapp.com/nurse_data')
          .then(res => res.json())
          .then(data2 => {
              this.setState({
                  ccnInfo: this.filterNurseArray(data2)
              });
              return 'refresh nurse data all Good'
        })])
        .then(values => console.log(values));
      };
  }

    // Pulls nurse data and schedule from DB before page is rendered
    async componentDidMount(){
      Promise.all([
        await fetch('https://backend-ccn.herokuapp.com/nurse_sched')
        .then(res => res.json())
        .then(schedData => {
            console.log(schedData);
            this.filterSchedArray(schedData);
            return 'nurse sched all Good'          
        }),
        await fetch('https://backend-ccn.herokuapp.com/nurse_data')
        .then(res => res.json())
        .then(nurseData => {
            console.log(nurseData);
            this.filterNurseArray(nurseData)
            return 'nurse data all Good'
        })
      ])
      .then(value => console.log(value));
    }

    // narrows the DB data down to only the nurses working at the current day and time
    filterSchedArray(schedData) {
      const dayOfWeek = this.days[this.currentDate.getDay()];
      const time = this.currentDate.getHours();
      if ((time >= 0 && time < 6) || (time >= 18 && time < 24)) {
        this.nursesWorking = schedData.filter(el => el.shift === 'night' && el.daysWorking.includes(dayOfWeek));
      } else if (time >= 6 && time < 18) {
        this.nursesWorking = schedData.filter(el => el.shift === 'day' && el.daysWorking.includes(dayOfWeek));
      }
    }

    filterNurseArray(nurseData) {
      // Array of IDs of nurses scheduled to work
      const idArray = this.nursesWorking.map(el => el.nurseID);
      // Narrows down the nurse data to just the nurses working current shift
      const shiftNurses = nurseData.filter(el => idArray.includes(el.nurseID));
      const sortedNurseArray = this.sortArrayByLastCCNdate(shiftNurses);
      const ccn = sortedNurseArray.slice(0, 3);
      const mainUnit = sortedNurseArray.slice(3);

      this.mainCCNlogic(ccn, mainUnit);
    }

    mainCCNlogic(ccn, main) {
      // Loops until there are two junior nurses and one senior nurse. 
      // Ignores nurses that are been marked to move to main unit
      while (this.checkForTwoSenNurses(ccn) || ccn.every(el => el.seniority < 2) || ccn.find(el => el.moved === 1)) {
        if(this.loopCounter > 50) {
          alert("Can't find the correct combination of nurses");
          this.loopCounter = 0;
          break;
        }
        // checks if all the nurses in CCN are junior nurses, if so move the nurse with the most recent
        // ccn date to the main unit and bring the next nurse from the main unit. Otherwise the nurse with
        // the highest seniority is moved to main unit
        if(ccn.every(el => el.seniority < 2)) {
          main.push(ccn[2]);
          ccn.pop();
          ccn.push(main[0]);
          main.splice(0, 1);
        } else {
            main.push(ccn[this.highestSeniorityIndex(ccn)]);
            ccn.splice(this.highestSeniorityIndex(ccn), 1);
            ccn.push(main[0]);
            main.splice(0, 1);
        }
      
        // checks the main unit for nurses with an ECMO, Charge, or DR skill. If any of these skills
        // are missing in the main unit a CCN nurse with that skill is moved to the main unit 
        this.skillWords.forEach(el => {
          for (let x of main) {
            if(x.skills.includes(el.skill)) {
              el.present = true;
              break;
            }
          }
          if(el.present === false) {
            let index = ccn.map(el2 => el2.skills).findIndex(el3 => el3.includes(el.skill));
            main.push(ccn[index]);
            ccn.splice(index, 1);
            ccn.push(main[0]);
            main.splice(0, 1);
            el.present = true;
          }
        })
        
        // checks if there is at least 1 clinical ladder II nurse and one clinical ladder (CL) III or IV 
        // nurse. If not, it searches for the next nurse in the main unit with the appropriate CL
        if(!ccn.map(el => el.clinicalLadder).includes("II")) {
          let index = main.findIndex(el => el.clinicalLadder === "II");
          main.push(ccn[this.highestSeniorityIndex(ccn)]);
          ccn.splice(this.highestSeniorityIndex(ccn), 1);
          ccn.push(main[index]);
          main.splice(index, 1);
        } else if (ccn.every(el => el.clinicalLadder === "II")) {
            let index = main.findIndex(el => el.clinicalLadder === "III" || el.clinicalLadder === "IV");
            main.push(ccn[this.highestSeniorityIndex(ccn)]);
            ccn.splice(this.highestSeniorityIndex(ccn), 1);
            ccn.push(main[index]);
            main.splice(index, 1);
        }

        this.loopCounter++;
      }

      this.loopCounter = 0;

      this.setState({
        ccnInfo: ccn,
        mainInfo: main
      });
    }

    checkForTwoSenNurses(ccnArr) { 
      let counter = 0;
        for(let x of ccnArr) {
            if(x.seniority > 5 && (++counter > 1)) return true        
        }
        return false
    }

    highestSeniorityIndex(ccnArr) { 
      let senArr = ccnArr.map(el => {return el.seniority});
      let highestIndex = senArr.indexOf(senArr.reduce((a, b) => {return Math.max(a, b)}));
      return highestIndex;
    }

    // sorts array in ascending order
    sortArrayByLastCCNdate(shiftNursesArr) {
      shiftNursesArr = shiftNursesArr.sort((el1, el2) => {
        if(el1.lastDateInCCN < el2.lastDateInCCN){
          return -1
        } else if (el1.lastDateInCCN > el2.lastDateInCCN){
          return 1
        } else {
          return 0
        };  
      });
      return shiftNursesArr;
    }

    handleSelected(row) {
      this.setState({
        selectedRows: row.selectedRows
      });
    };

    updateCCNdate(e) {
      let alertArray = [];
      // updates the CCN date of the selected rows to the current date before sending information web server
      this.state.selectedRows.forEach(el => {
        el.lastDateInCCN = this.convertDate(this.currentDate);
        el.hour = this.currentDate.getHours();
        console.log(el);
        alertArray.push(el.firstName);
        fetch('https://backend-ccn.herokuapp.com/update_ccnDate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(el)
        })
        .then(res => console.log(res.text()));
      });

      e.preventDefault();

      if (alertArray.length === 1) {
        alert(`${alertArray[0]}'s CCN date will be updated at the end of their shift.`);
      } else if (alertArray.length === 2) {
        alert(`${alertArray[0]} and ${alertArray[1]}'s CCN dates will be updated at the end of their shifts.`);
      } else if (alertArray.length === 3) {
        alert(`${alertArray[0]}, ${alertArray[1]}, and ${alertArray[2]}'s CCN dates will be updated at the end of their shifts.`);
      }

      this.setState({
        toggleClearRows: !this.state.toggleClearRows
      })
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

    // changes boolean value in DB to indicate that a nurse should be ignored by this
    // components logic
    moveNurse() {
      const nursesToMove = this.state.selectedRows;

      nursesToMove.forEach(el => {
        fetch('https://backend-ccn.herokuapp.com/move_nurse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(el)
          })
          .then(res => console.log(res.text()));
        });
      
      this.setState({
        toggleClearRows: !this.state.toggleClearRows
      })
      
      window.location.reload();
   
    }

    render() {
      // info for setting up data table
      const columns = [
        {
            name: 'First Name',
            selector: 'firstName',
            sortable: false
          },
          {
            name: 'Last Name',
            selector: 'lastName',
            sortable: false
          },
          {
            name: 'Date last in CCN',
            selector: 'lastDateInCCN',
            sortable: false
          },
      ];

      // styling for data table
      const customStyles = {
        header: {
          style: {
            minHeight: '20px',
          },
        },
        headRow: {
          style: {
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            borderTopColor: defaultThemes.default.divider.default,
          },
        },
        headCells: {
          style: {
            '&:not(:last-of-type)': {
              borderRightStyle: 'solid',
              borderRightWidth: '1px',
              borderRightColor: defaultThemes.default.divider.default,
            },
          },
        },
        cells: {
          style: {
            '&:not(:last-of-type)': {
              borderRightStyle: 'solid',
              borderRightWidth: '1px',
              borderRightColor: defaultThemes.default.divider.default,
            },
          },
        },
      };

      return(
        <div>
            <br />
            <h2>Next in CCN</h2>
            <DataTable 
              columns={columns}
              data={this.state.ccnInfo}
              keyField='nurseID'
              selectableRows
              selectableRowsHighlight
              clearSelectedRows={this.state.toggleClearRows}
              onSelectedRowsChange={row => this.handleSelected(row)}
              noDataComponent='Data is loading, please wait'
              striped={true}
              customStyles={customStyles}
            />
            <br />
            <Button onClick={this.updateCCNdate}>Update CCN Date</Button>{' '}
            <Button onClick={this.moveNurse}>Move Nurse to Main Unit</Button>
            <br /><br />
            <h2>Main Unit Nurses</h2>
            <DataTable 
              columns={columns}
              data={this.state.mainInfo}
              keyField={"nurseID"}
              striped={true}
              customStyles={customStyles}
              noDataComponent='Data is loading, please wait'
              pagination={true}
              paginationPerPage={5}
            />
        </div>
      );
    }
}