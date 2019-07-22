import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ScrollToTop from './ScrollToTop';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import CampSelect from './CampSelect';
import CampInfo from './CampInfo';
import CircularProgress from '@material-ui/core/CircularProgress';
import './scss/App.scss';

class App extends React.Component {
  state = {
    redirect: '',
    error: null,
    sectionSelectedIndex: 0,
    campLoadedId: 0,
    campName: '',
    campData: {},
    campConfig: []
  };
  
  constructor( props ) {
    super( props );

    let pathname = localStorage.getItem('pathname');
    if (pathname) {
      console.log('Camp App: First load and pathname is set, loading saved pathname:',pathname);
      this.state.redirect = pathname;
    } else {
      console.log('Camp App: First load - No saved pathname, do nothing.' );
    }
  }

  saveRoute(route) {
    let pathname = route.location.pathname;
    console.log('Camp App: Saving pathname: ', pathname);
    localStorage.setItem( 'pathname', pathname );
  }

  loadCampInfo = (campid) => {
    console.log('Camp App: Loading info for camp selected: '+campid);
    fetch('https://api.nccc.se/camps/'+campid)
    .then(result => result.json())
    .then(
      (data) => {
        console.log('Data fetched complete for: '+campid);
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
                } else if (value.formattedValue) {
                  let val = value.formattedValue;
                  current[propertyNames[index]] = val;
                  // Preload all images so they're available in offline mode:
                  if (val.endsWith(".jpg") || val.endsWith(".jpeg") || val.endsWith(".png") || val.endsWith(".gif")) {
                    new Image().src = val;
                  }
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
              if (sheet.properties.title === 'CONFIG' && rowCounter === 5)
                break;
            }
            if (sheet.properties.title === 'CONFIG') {
              config = parsedData;
            } else {
              campData[sheet.properties.title] = parsedData;
            }
          }
          this.setState({
            campLoadedId: campid,
            campName: data.properties.name,
            campData: campData,
            campConfig: config
          });
        } else {
          let error = 'Camp App: Error when fetching camp data - Invalid data received.';
          this.setState({campLoadedId: campid, campData: null, campConfig: null, error});
          console.log(error);
        }
      },
      (error) => {
        this.setState({campLoadedId: campid, campData: null, campConfig: null, error});
        console.log('Camp App:  Fetching camp info failed:', error);
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
  
  render() {
    const { campName, redirect } = this.state
    
    console.log('Camp App: Rerendering...');
    
    return (
      <Router>
        <Suspense fallback={<CircularProgress />}>
          { redirect
            ? <Redirect
                to={redirect}
              />
            : null
          }
          <ScrollToTop>
            <Route exact path="/"
              render={routeProps => {
                this.saveRoute( routeProps )
                return (
                  <div className="App">
                    <div className="App-header">
                      <TopBar
                        campID=""
                        campName={campName}
                        sectionName=""
                      />
                    </div>
                    <CampSelect />
                  </div>
                )}
              }
            />
            <Route path="/:campid/:section?"
              render={routeProps => {
                const { campLoadedId, campData, campConfig } = this.state;
                this.saveRoute( routeProps )
                let sectionSelected = routeProps.match.params.section;
                let campid = routeProps.match.params.campid;
                let sectionIndex = 0;
                let config: any = campConfig;
                let sectionConfig: any = null;
                let sectionName: string = "";
                let sectionData: any = null;
                if (campid !== campLoadedId) {
                  this.loadCampInfo( campid );
                }
                else if (campConfig && campData) {
                  for (let index = 0; index < config.length; index++) {
                    if (config[index].Name === sectionSelected) {
                      sectionIndex = index;
                      break;
                    }
                  }
                  if (campConfig[sectionIndex]) {
                    sectionConfig = campConfig[sectionIndex];
                    sectionName = sectionConfig.Name;
                    sectionData = campData[sectionName];
                  }
                }
                return (
                <div className="App">
                  <div className="App-header">
                    <TopBar
                      campid={campid}
                      campname={campName}
                      sectionname={sectionName}
                    />
                  </div>
                  <div className="App-main">
                    <CampInfo
                      isLoaded={campLoadedId===campid}
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
                )
              }}
            />
          </ScrollToTop>
        </Suspense>
      </Router>
    );
  }
}

export default App;