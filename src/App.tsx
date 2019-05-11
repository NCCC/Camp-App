import React from 'react';
import Grid from '@material-ui/core/Grid';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import CampSelect from './CampSelect';
import logo from './logo.svg';
import './scss/App.scss';

const App: React.FC = () => {
  return (
    <Grid container className="App">
      <Grid item className="App-header">
        <TopBar />
      </Grid>
      <Grid item className="App-main">
        <CampSelect />
      </Grid>
      <Grid item className="App-footer">
        <BottomBar />
      </Grid>
    </Grid>
  );
}

export default App;
