import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import './scss/BottomBar.scss';

interface BottomBarProps {
  campdata: any
}

export default class BottomBar extends React.Component<BottomBarProps, {}> {
  state = {
    value : 0,
    campData : null
  };
  
  componentWillReceiveProps(nextProps) {
    this.setState({ campData: nextProps.campdata });  
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  
  render() {
    const { value, campData } = this.state;

    if (!campData) {
      return (
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
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
      let config: any[] = [];
      let data: any = campData;
      for (let sheet of data.sheets) {
        if (sheet.properties.title === 'CONFIG') {
          console.log('Configuration found',sheet);
          let counter = 0;
          for (let row of sheet.data[0].rowData) {
            let current: string[] = [];
            if (row.values) for (let value of row.values) {
              if (value.formattedValue === "Section") {
                break;
              } else if (value.formattedValue !== "")  {
                current.push( value.formattedValue );
              }
            }
            if (current.length > 0)
              config.push( current );
            counter++;
            if (counter === 5)
              break;
          }
          console.log( 'Configuration', config );
        }
      }
      return (
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
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
