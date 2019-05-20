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
    isLoaded: false,
    campData: {},
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
        let campData = {};
        let config: any[] = [];
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
        this.setState({isLoaded: true, campData: campData, campConfig: config});
        console.log('state',this.state);
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
    });
    console.log('Section selected: '+index);
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
    const { isLoaded, campData, campSelectedID, sectionSelectedIndex, campConfig } = this.state
    
    let sectionConfig: any = null
    let sectionName: string = ''
    let sectionData: any = null
    if (campConfig && campData) {
      sectionConfig = campConfig[sectionSelectedIndex]
      sectionName = sectionConfig.Name
      sectionData = campData[sectionName]
    }
    return (
      <div className="App">
        <div className="App-header">
          <TopBar
            campid={campSelectedID}
            handleCampSelect={this.handleCampSelect.bind(this)}
          />
        </div>
        <div className="App-main">
        { campSelectedID === ''
        ? <CampSelect />
        : <CampInfo
            isLoaded={isLoaded}
            sectionConfig={ sectionConfig }
            sectionData={ sectionData }
          />
        }
        </div>
        <div className="App-footer">
          <BottomBar
            index={sectionSelectedIndex}
            campConfig={campConfig}
            handleSectionSelect={this.handleSectionSelect.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
