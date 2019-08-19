import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ScrollToTop from './ScrollToTop';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import CampSelect from './CampSelect';
import CampInfo from './CampInfo';
import CircularProgress from '@material-ui/core/CircularProgress';
import './scss/App.scss';

export const CAMP_APP_VERSION = '0.3.1';

export default function App() {
  console.log('Camp App: Rendering App...');
    
  const [campData, setCampData] = useState<{ ID: string; Name: string; Sheets: {}; Config: any[]; }>( {
    ID: '',
    Name: '',
    Sheets: {},
    Config: []
  } );

  let redirect = '';
  let pathname = localStorage.getItem('pathname');
  if (pathname && pathname !== '/') {
    console.log('Camp App: First load and pathname is set, setting redirect variable to: ',pathname);
    redirect = pathname;
  } else {
    console.log('Camp App: First load - No saved pathname or pathname is /, do nothing.' );
  }

  function saveRoute(route) {
    let pathname = route.location.pathname;
    console.log('Camp App: Saving pathname: ', pathname);
    localStorage.setItem( 'pathname', pathname );
  }

  const loadCampInfo = (campid) => {
    console.log('Camp App: Loading info for camp selected: '+campid);
    fetch('https://api.nccc.se/camps/'+campid)
    .then(result => result.json())
    .then(
      (data) => {
        console.log('Camp App: Data fetched complete for: '+campid);
        let sheets = {};
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
              sheets[sheet.properties.title] = parsedData;
            }
          }
          setCampData( {
            ID: campid,
            Name: data.properties.name,
            Sheets: sheets,
            Config: config
          } );
        } else {
          setCampData( {
            ID: campid,
            Name: '',
            Sheets: {},
            Config: []
          } );
          console.log('Camp App: Error when fetching camp data - Invalid data received.');
        }
      },
      (error) => {
          setCampData( {
            ID: campid,
            Name: '',
            Sheets: {},
            Config: []
          } );
        console.log('Camp App: Fetching camp info failed:', error);
      }
    );
  };
  
  return (
    <Router>
      <Suspense fallback={<CircularProgress />}>
        <ScrollToTop>
          <Route exact path="/"
            render={routeProps => {
              if (redirect) {
                console.log('Camp App: Redirect variable was set, redirecting user to "'+redirect+'"...');
                let redirect_now = redirect;
                // Reset the variable so we won't be redirected again
                redirect = '';
                return (<Redirect
                          to={redirect_now}
                        />)
              } else {
                saveRoute( routeProps );
                return (
                  <div className="App">
                    <div className="App-header">
                      <TopBar
                        campID=""
                        campName=""
                        sectionName=""
                        version={CAMP_APP_VERSION}
                      />
                    </div>
                    <CampSelect />
                  </div>
                )
              }
            }}
          />
          <Route path="/:campid/:section?"
            render={routeProps => {
              // Reset the redirect variable, won't be needed for the rest of this session (until a reload)
              redirect = '';
              saveRoute( routeProps );
              let sectionSelected = routeProps.match.params.section;
              let campid = routeProps.match.params.campid;
              let sectionIndex = 0;
              let config: any = campData.Config;
              let sectionConfig: any = null;
              let sectionName: string = "";
              let sectionData: any = null;
              if (campid !== campData.ID) {
                loadCampInfo( campid );
              }
              else if (config.length > 0) {
                for (let index = 0; index < config.length; index++) {
                  if (config[index].Name === sectionSelected) {
                    sectionIndex = index;
                    break;
                  }
                }
                if (config[sectionIndex]) {
                  sectionConfig = config[sectionIndex];
                  sectionName = sectionConfig.Name;
                  sectionData = campData.Sheets[sectionName];
                }
              }
              return (
              <div className="App">
                <div className="App-header">
                  <TopBar
                    campID={campid}
                    campName={campData.Name}
                    sectionName={sectionName}
                  />
                </div>
                <div className="App-main">
                  <CampInfo
                    isLoaded={campData.ID === campid}
                    sectionConfig={sectionConfig}
                    sectionData={sectionData}
                  />
                </div>
                <div className="App-footer">
                  <BottomBar
                    index={sectionIndex}
                    campid={campid}
                    campConfig={campData.Config}
                  />
                </div>
              </div>
              )
            }}
          />
        </ScrollToTop>
      </Suspense>
    </Router>
  )
}