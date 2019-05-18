import React from 'react';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import CampSelect from './CampSelect';
import './scss/App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App-header">
        <TopBar />
      </div>
      <div className="App-main">
        <CampSelect />
        <CampSelect />
        <CampSelect />
        <CampSelect />
        <CampSelect />
        <CampSelect />
        <CampSelect />
      </div>
      <div className="App-footer">
        <BottomBar />
      </div>
    </div>
  );
}

export default App;
