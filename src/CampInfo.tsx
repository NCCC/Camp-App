import React from 'react';
import SimpleCard from './SimpleCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import SectionInformation from './SectionInformation';
import SectionSchedule from './SectionSchedule';
import SectionMap from './SectionMap';
import SectionContact from './SectionContact';
import { useTranslation } from 'react-i18next';
import './scss/CampInfo.scss';

export default function CampInfo( props ) {
  const { isLoaded, sectionConfig, sectionData } = props;
  const { t } = useTranslation();

  if (!isLoaded) {
    return (
      <SimpleCard
        icon={<CircularProgress />}
        title={t('loading')+'...'}
        text="For where two or three gather in my name, there am I with them. - Matthew 18:20"
        color="textSecondary"
      />
    )
  } else if (!sectionData || !sectionConfig) {
    return (
      <SimpleCard
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
          <SimpleCard
            icon={<Icon>error</Icon>}
            title={t('campinfo.unknown_section')+': '+config.Type}
          />
        );
    }
  }
}