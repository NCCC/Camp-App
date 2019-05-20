import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import './scss/BottomBar.scss';

interface BottomBarProps {
  campdata: any,
  index: number,
  handleSectionSelect: (event, index) => void;
}

export default class BottomBar extends React.Component<BottomBarProps, {}> {
  state = {
    index: 0,
    campData : null
  };
  
  componentWillReceiveProps(nextProps) {
    this.setState({ 
      index: nextProps.index,
      campData: nextProps.campdata
    });  
  }

  render() {
    const { index, campData } = this.state;

    if (!campData) {
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
      let config: any[] = [];
      let data: any = campData;
      for (let sheet of data.sheets) {
        if (sheet.properties.title === 'CONFIG') {
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
        }
      }
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
