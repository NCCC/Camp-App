import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import InfoIcon from '@material-ui/icons/Info';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MapIcon from '@material-ui/icons/Map';
import PhoneIcon from '@material-ui/icons/Phone';
import './scss/BottomBar.scss';

export default class BottomBar extends React.Component {
  state = {
    value : 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  
  render() {
    //const { classes } = this.props;
    const { value } = this.state;

    return (
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className="BottomBar"
        >
          <BottomNavigationAction
            label="Information"
            icon={<InfoIcon />}
            classes={{
              root: 'NavSection',
              selected:'NavSection-selected' }}
          />
          <BottomNavigationAction
            label="Schedule"
            icon={<ScheduleIcon />}
            classes={{
              root: 'NavSection',
              selected:'NavSection-selected' }}
          />
          <BottomNavigationAction
            label="Map"
            icon={<MapIcon />}
            classes={{
              root: 'NavSection',
              selected:'NavSection-selected' }}
          />
          <BottomNavigationAction
            label="Contact"
            icon={<PhoneIcon />}
            classes={{
              root: 'NavSection',
              selected:'NavSection-selected' }}
          />
        </BottomNavigation>
    );
  }
}
