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
    campData: null
  };
  
  handleCampSelect = (event, campid) => {
    this.setState({ isLoaded: false, campSelectedID: campid, campData: null });
    console.log('Camp selected: '+campid);
    fetch('https://api.nccc.se/camps/'+campid)
    .then(result => result.json())
    .then(
      (data) => {
        console.log('Camp info fetched for '+campid);
        this.setState({isLoaded: true, campData: data});
        console.log('state', this.state.campData);
      },
      (error) => {
        this.setState({isLoaded: true, error});
        console.log(error);
      }
    );
  };
  
  handleSectionSelect = (event, index) => {
    this.setState({ sectionSelectedIndex: index });
    console.log('Section selected: '+index);
  };
  
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
            sectionSelectedIndex={this.state.sectionSelectedIndex}
            campdata={this.state.campData}
          />
        }
        </div>
        <div className="App-footer">
          <BottomBar
            index={this.state.sectionSelectedIndex}
            campdata={this.state.campData}
            handleSectionSelect={this.handleSectionSelect.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
