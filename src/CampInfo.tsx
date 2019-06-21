import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import CampInfoCard from './CampInfoCard';
import ScheduleCard from './ScheduleCard';
import './scss/CampInfo.scss';

interface CampInfoProps {
  isLoaded: boolean,
  sectionConfig: any,
  sectionData: any
  //handleDataSelect: (event, index) => void;
}

export default class CampInfo extends React.Component<CampInfoProps, {}> {
  state = {
    isLoaded: 0,
    sectionConfig: null,
    sectionData: null
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ 
      isLoaded: nextProps.isLoaded,
      sectionConfig: nextProps.sectionConfig,
      sectionData: nextProps.sectionData
    })
    console.log('CampInfo state',this.state)
  }

  render() {
    const { isLoaded, sectionConfig, sectionData } = this.state

    if (!isLoaded) {
      return (
        <CampSimpleCard
          icon={<CircularProgress />}
          title="Loading data..."
        />
      )
    } else if (!sectionData || !sectionConfig) {
      return (
        <CampSimpleCard
          icon={<Icon>error</Icon>}
          title="Error loading data."
        />
      )
    } else {
      let config: any = sectionConfig;
      switch (config.Type) {
        case 'Information':
          return this.renderInformation();
        case 'Schedule':
          return this.renderSchedule();
        default:
          return (
            <CampSimpleCard
              icon={<Icon>error</Icon>}
              title={"Section type unknown: "+config.Type}
            />
          );
      }
    }
  }
  
  renderInformation = () => {
    const { sectionConfig, sectionData } = this.state;
    let config: any = sectionConfig;
    let data: any = sectionData;
    return (
      <div>
        { data.map( (row, index) => (
            <CampInfoCard
              key={index}
              information={row}
            />
        ))}
      </div>
    )
  }
  
  renderSchedule = () => {
    const { sectionConfig, sectionData } = this.state;
    let config: any = sectionConfig;
    let data: any = sectionData;
    let days = {};
    data.forEach( (row) => {
      let start = parseNordicDate( row.Start );
      let end = parseNordicDate( row.End );
      row.StartTime = getHourMinutes( start );
      row.EndTime = getHourMinutes( end );
      let day = dayOfWeek( start );
      if (days[day]) {
        days[day].push( row );
      } else {
        days[day] = [ row ];
      }
    } );
    return (
      <div>
        { Object.keys(days).map( (key) => {
          return (
            <ScheduleCard
              day={key}
              events={days[key]}
            />
          );
        })}
      </div>
    )
  }
}

function CampSimpleCard( props ) {
  return (
    <Card classes={{ root: 'CampCard' }} >
      <CardHeader
        avatar={props.icon}
        title={props.title}
      />
    </Card>
  )
}

function CampHeaderCard( props ) {
  return (
    <Card classes={{ root: 'CampCard' }} >
      <CardContent>
        <Typography variant={props.variant}>
          {props.header}
        </Typography>
      </CardContent>
    </Card>
  )
}

function parseNordicDate( datestring ) {
  //                               1=day          2=month        3=year   kl.   4=hour         5=minutes      6=seconds
  let matches = datestring.match(/([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)[^0-9]*([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)/);
  return new Date(matches[3],matches[2]-1,matches[1],matches[4],matches[5],matches[6],0);
}

function dayOfWeek( date ) {
  return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][date.getDay()]+' '+date.getDate()+'.'+(date.getMonth()+1);
}

function getHourMinutes( date ) {
  return date.getHours()+':'+(date.getMinutes() < 10 ? '0' : '')+date.getMinutes();
}