import React from 'react';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import CampSelect from './CampSelect';
import CampInfo from './CampInfo';
//import CampInfo from './CampInfo';
import './scss/App.scss';

class App extends React.Component {
  state = {
    error: null,
    campSelectedID: '',
    sectionSelectedIndex: 0,
    sectionSelectedName: '',
    isLoaded: false,
    campData: null,
    campConfig: null
  };
  
  handleCampSelect = (event, campid) => {
    this.setState({ isLoaded: false, campSelectedID: campid, campData: null });
    console.log('Camp selected: '+campid);
    fetch('https://api.nccc.se/camps/'+campid)
    .then(result => result.json())
    .then(
      (data) => {
        console.log('Camp info fetched for '+campid);
        let config: any[] = [];
        for (let sheet of data.sheets) {
          if (sheet.properties.title === 'CONFIG') {
            var counter = 0;
            for (let row of sheet.data[0].rowData) {
              let current: string[] = [];
              if (row.values) for (let value of row.values) {
                if (value.formattedValue === "Section") {
                  break;
                } else if (value.formattedValue !== "")  {
                  current.push( value.formattedValue );
                }
              }
              if (current.length > 0)
                config.push( current );
              counter++;
              if (counter === 5)
                break;
            }
          }
        }
        this.setState({isLoaded: true, campData: data, campConfig: config});
        console.log('state', this.state.campData);
      },
      (error) => {
        this.setState({isLoaded: true, error});
        console.log(error);
      }
    );
  };
  
  handleSectionSelect = (event, index) => {
    this.setState({
      sectionSelectedIndex: index
      //sectionSelectedName: sectionName
    });
    console.log('Section selected: ('+index+')');
  };
  
  findSheet = ( sheetName ) => {
    let data: any = this.state.campData;
    if (data) {
      for (let sheet of data.sheets) {
        if (sheet.properties.title === sheetName) {
          return sheet;
        }
      }
    }
    return null;
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <TopBar
            campid={this.state.campSelectedID}
            handleCampSelect={this.handleCampSelect.bind(this)}
          />
        </div>
        <div className="App-main">
        { this.state.campSelectedID === ''
        ? <CampSelect />
        : <CampInfo
            isLoaded={this.state.isLoaded}
            sectionData={this.state.campData}
          />
        }
        </div>
        <div className="App-footer">
          <BottomBar
            index={this.state.sectionSelectedIndex}
            campConfig={this.state.campConfig}
            handleSectionSelect={this.handleSectionSelect.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
