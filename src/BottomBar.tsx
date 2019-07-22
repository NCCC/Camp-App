import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import './scss/BottomBar.scss';

export default function BottomBar(props) {
  const { index, campid, campConfig } = props;

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
