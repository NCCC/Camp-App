import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import SectionInformation from './SectionInformation';
import SectionSchedule from './SectionSchedule';
import SectionMap from './SectionMap';
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
      let data: any = sectionData;
      switch (config.Type) {
        case 'Information':
          return (
            <SectionInformation
              informationList={data}
            />
          )
        case 'Schedule':
          return (
            <SectionSchedule
              scheduleList={data}
            />
          )
        case 'Map':
          return (
            <SectionMap
              mapList={data}
            />
          )
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