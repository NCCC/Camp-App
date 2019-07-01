import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import './scss/BottomBar.scss';

interface BottomBarProps {
  campConfig: any,
  campid: '',
  index: number
}

export default class BottomBar extends React.Component<BottomBarProps, {}> {
  state = {
    index: 0,
    campid: '',
    campConfig: null
  };
  
  componentWillReceiveProps(nextProps) {
    this.setState({ 
      index: nextProps.index,
      campid: nextProps.campid,
      campConfig: nextProps.campConfig
    });  
  }

  render() {
    const { index, campid, campConfig } = this.state;

    if (!campConfig) {
      return (<div/>);
    } else {
      let config: any = campConfig;
      return (
        <BottomNavigation
          value={index}
          showLabels
          className="BottomBar"
        >
        { config.map( (section) => (
          <BottomNavigationAction
            component={Link}
            to={`/${campid}/${section.Name}`}
            key={section.Section}
            label={section.Name}
            icon={<Icon>{section.Icon}</Icon>}
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
