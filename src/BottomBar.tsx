import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import InfoIcon from '@material-ui/icons/Info';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MapIcon from '@material-ui/icons/Map';
import PhoneIcon from '@material-ui/icons/Phone';


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
        >
          <BottomNavigationAction label="Information" icon={<InfoIcon />} />
          <BottomNavigationAction label="Schedule" icon={<ScheduleIcon />} />
          <BottomNavigationAction label="Map" icon={<MapIcon />} />
          <BottomNavigationAction label="Contact" icon={<PhoneIcon />} />
        </BottomNavigation>
    );
  }
}
