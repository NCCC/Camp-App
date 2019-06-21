import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import CampSelect from './CampSelect';
import CampInfo from './CampInfo';
import './scss/App.scss';

class App extends React.Component {
  state = {
    error: null,
    campSelectedID: '',
    sectionSelectedIndex: 0,
    isLoaded: false,
    campName: '',
    sectionName: '',
    campData: {},
    campConfig: null
  };
  
  loadCampInfo = (campid) => {
    console.log('Loading info for camp selected: '+campid);
    fetch('https://api.nccc.se/camps/'+campid)
    .then(result => result.json())
    .then(
      (data) => {
        console.log('Camp info fetched for '+campid);
        let campData = {};
        let config: any[] = [];
        if (data.sheets) {
          for (let sheet of data.sheets) {
            let parsedData: any[] = [];
            let rowCounter = 0;
            let propertyNames: string[] = [];
            for (let row of sheet.data[0].rowData) {
              let current = {};
              if (row.values) for (let index in row.values) {
                let value = row.values[index];
                if (rowCounter === 0) {
                  propertyNames.push( value.formattedValue );
                } else if (value.formattedValue !== "")  {
                  current[propertyNames[index]] = value.formattedValue;
                }
              }
              if (rowCounter > 0 &&
                (
                  sheet.properties.title !== 'CONFIG'
                  || (current.hasOwnProperty('Icon') && current.hasOwnProperty('Name') && current.hasOwnProperty('Type'))
                )
              )
                parsedData.push( current );
              rowCounter++;
              if (rowCounter === 5)
                break;
            }
            if (sheet.properties.title === 'CONFIG') {
              config = parsedData;
            } else {
              campData[sheet.properties.title] = parsedData;
            }
          }
          this.setState({
            isLoaded: true,
            campSelectedID: campid,
            campName: data.properties.name,
            campData: campData,
            campConfig: config
          });
        } else {
          let error = 'Error fetching camp data.';
          this.setState({isLoaded: true, error});
          console.log(error);
        }
      },
      (error) => {
        this.setState({isLoaded: true, error});
        console.log(error);
      }
    );
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
  
  CampInfoContainer = ({match}) => {
    const { isLoaded, campData, campConfig } = this.state;
    console.log('Camp Info Container loading...');
    let sectionSelected = match.params.section;
    let sectionIndex = 0;
    let config: any = campConfig;
    let sectionConfig: any = null;
    let sectionName: string = '';
    let sectionData: any = null;
    if (campConfig && campData) {
      for (let index = 0; index < config.length; index++) {
        if (config[index].Name === sectionSelected) {
          sectionIndex = index;
          break;
        }
      }
      sectionConfig = campConfig[sectionIndex];
      sectionName = sectionConfig.Name;
      sectionData = campData[sectionName];
      if (sectionName !== this.state.sectionName) {
        this.setState({ sectionName: sectionName });
      }
    }
    let campid = match.params.campid;
    if (!isLoaded) {
      this.loadCampInfo( campid );
    }

    return <div>
      <div className="App-main">
        <CampInfo
          isLoaded={isLoaded}
          sectionConfig={sectionConfig}
          sectionData={sectionData}
        />
      </div>
      <div className="App-footer">
        <BottomBar
          index={sectionIndex}
          campid={campid}
          campConfig={campConfig}
        />
      </div>
    </div>
  }
  
  render() {
    const { campSelectedID, campName, sectionName } = this.state
    
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <TopBar
              campid={campSelectedID}
              campname={campName}
              sectionname={sectionName}
            />
          </div>
          <Route exact path="/" component={CampSelect} />
          <Route path="/:campid/:section?"
            render={this.CampInfoContainer}
          />
        </div>
      </Router>
    );
  }
}


export default App;