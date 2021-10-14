import React from 'react';

import SearchBar from '../NurseDataTableComponents/SearchBar';

import DataTable, {defaultThemes} from 'react-data-table-component';
import Button from 'react-bootstrap/Button';


export default class NurseDataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nurseInfo: [],
            schInfo: [],
            selectedRows: [],
            toggleClearRows: false
        };

        this.originalData = [];

        this.deleteNurse = this.deleteNurse.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    componentDidUpdate(prevProps, prevState) {
        if(prevState !== this.state && this.state.selectedRows.length === 1) {
            const row = this.state.selectedRows[0];
            // searches the schedule data for the days working and shift info for the selected 
            // nurse and adds that to object before sending info up to parent component
            for (let x of this.state.schInfo) {
              if(x.nurseID === row.nurseID) {
                row['daysWorking'] = x.daysWorking;
                row['shift'] = x.shift;
                break;
              }
            }
            this.props.updateNurse(row);
        };

        // pulls updated nurse and schedule information and refreshes data table
        if(this.props.refresh !== prevProps.refresh) {
          fetch('http://localhost:4000/nurse_data')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    nurseInfo: data
                });
                this.originalData = data;
            });

        fetch('http://localhost:4000/nurse_sched')
            .then(res => res.json())
            .then(data2 => {
                this.setState({
                    schInfo: data2
                });
            });
        }
    }

    componentDidMount(){
        fetch('http://localhost:4000/nurse_data')
        .then(res => res.json())
        .then(data => {
            this.setState({
                nurseInfo: data
            });
            this.originalData = data;
        });

        fetch('http://localhost:4000/nurse_sched')
        .then(res => res.json())
        .then(data2 => {
            this.setState({
                schInfo: data2
            });
        });
    }

    deleteNurse(){
      if(window.confirm("Are you sure you want to delete? (This cannot be undone)")) {
        const deleteInfo = [];
        
        for(let i=0; i<this.state.selectedRows.length; i++) {
            deleteInfo.push(this.state.selectedRows[i].nurseID)
        }

        fetch('http://localhost:4000/delete_nurse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(deleteInfo)
          })
          .then(res => console.log(res.text()));

        if(this.state.selectedRows.length === 1) {
          alert(`${this.state.selectedRows[0].firstName} has been deleted`);
        } else if (this.state.selectedRows.length > 1) {
          alert('Selected nurses have been deleted');
        }

        this.setState({
          toggleClearRows: !this.state.toggleClearRows
        })

        this.props.refreshTables();

      } else {
        this.setState({
          toggleClearRows: !this.state.toggleClearRows
        })
      }
    }

    handleSelected(row) {
        this.setState({
            selectedRows: row.selectedRows
        })
    }

    handleSearch(input) {
        let filteredData = this.originalData.filter(el => {
          // returns results for a user enter either a nurse ID or name
          if(el.lastName.toLowerCase().startsWith(input) || el.lastName.startsWith(input) || el.firstName.toLowerCase().startsWith(input) || el.firstName.startsWith(input) || el.nurseID.toString().startsWith(input)){
            return el;  
          }
        })
        this.setState({
          nurseInfo: filteredData
        })  
    }

    handleClick() {
      if (this.state.selectedRows.length === 1) {
        // tells parent component to show update tab
        this.props.handleTab("update");
      } else if (this.state.selectedRows.length > 1) {
        alert('Please select only 1 nurse to view')
      }

      this.setState({
        toggleClearRows: !this.state.toggleClearRows
      })
    }


    render() {
      const columns = [
        {
            name: 'Lawson ID',
            selector: 'nurseID',
            sortable: true
          },
          {
            name: 'First Name',
            selector: 'firstName',
            sortable: true
          },
          {
            name: 'Last Name',
            selector: 'lastName',
            sortable: true
          },
      ];

      const customStyles = {
        header: {
          style: {
            minHeight: '56px',
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
              <SearchBar handleSearch={this.handleSearch} resetValue={this.props.refresh}/>
              <DataTable 
                  title="NICU Nurses"
                  columns={columns}
                  data={this.state.nurseInfo}
                  selectableRows
                  selectableRowsHighlight
                  striped
                  pagination
                  clearSelectedRows={this.state.toggleClearRows}
                  onSelectedRowsChange={row => this.handleSelected(row)}
                  customStyles={customStyles}
              />
              <Button onClick={this.handleClick}>View/Edit Details</Button>{' '}
              <Button onClick={this.deleteNurse}>Delete</Button>
              <br />
          </div>
      )
    }
}
