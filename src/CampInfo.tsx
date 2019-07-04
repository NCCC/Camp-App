import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import SectionInformation from './SectionInformation';
import SectionSchedule from './SectionSchedule';
import SectionMap from './SectionMap';
import SectionContact from './SectionContact';
import { withTranslation, WithTranslation } from 'react-i18next';
import './scss/CampInfo.scss';

interface CampInfoProps {
  isLoaded: boolean,
  sectionConfig: any,
  sectionData: any
  //handleDataSelect: (event, index) => void;
}

class CampInfo extends React.Component<CampInfoProps & WithTranslation, {}> {
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
  }

  render() {
    const { isLoaded, sectionConfig, sectionData } = this.state;
    const { t } = this.props;

    if (!isLoaded) {
      return (
        <CampSimpleCard
          icon={<CircularProgress />}
          title={t('loading')}
        />
      )
    } else if (!sectionData || !sectionConfig) {
      return (
        <CampSimpleCard
          icon={<Icon>error</Icon>}
          title={t('campinfo.error_title')}
          text={t('campinfo.error_message')}
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
        case 'Contact':
          return (
            <SectionContact
              contactList={data}
            />
          )
        default:
          return (
            <CampSimpleCard
              icon={<Icon>error</Icon>}
              title={t('campinfo.unknown_section')+': '+config.Type}
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
      <CardContent>
        <Typography variant="body1">
          {props.text}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default withTranslation()(CampInfo)