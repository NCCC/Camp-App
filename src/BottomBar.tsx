import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import './scss/BottomBar.scss';

interface BottomBarProps {
  campConfig: any,
  index: number,
  handleSectionSelect: (event, index) => void;
}

export default class BottomBar extends React.Component<BottomBarProps, {}> {
  state = {
    index: 0,
    campConfig: null
  };
  
  componentWillReceiveProps(nextProps) {
    this.setState({ 
      index: nextProps.index,
      campConfig: nextProps.campConfig
    });  
  }

  render() {
    const { index, campConfig } = this.state;

    if (!campConfig) {
      return (
        <BottomNavigation
          value={index}
          onChange={this.props.handleSectionSelect}
          className="BottomBar"
        >
          <BottomNavigationAction
            label="Start"
            icon={<Icon>home</Icon>}
            classes={{
              root: 'NavSection',
              selected:'NavSection-selected' }}
          />
        </BottomNavigation>
      );
    } else {
      let config: any = campConfig;
      return (
        <BottomNavigation
          value={index}
          onChange={this.props.handleSectionSelect}
          showLabels
          className="BottomBar"
        >
        { config.map( (section) => (
          <BottomNavigationAction
            key={section[0]}
            label={section[2]}
            icon={<Icon>{section[1]}</Icon>}
            classes={{
              root: 'NavSection',
              selected:'NavSection-selected' }}
          />
        ))}
        </BottomNavigation>
      );
    }
  }
}
