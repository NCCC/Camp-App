import React from 'react';
import ScheduleCard from './ScheduleCard';
import { withTranslation, WithTranslation } from 'react-i18next';

interface SectionScheduleProps {
  scheduleList: any;
}

class SectionSchedule extends React.Component<SectionScheduleProps & WithTranslation, {}> {
  render() {
    const { scheduleList } = this.props;
    let data: any = scheduleList;
    let days = {};
    data.forEach( (row) => {
      let start = this.parseNordicDate( row.Start );
      let end = this.parseNordicDate( row.End );
      row.StartTime = this.getHourMinutes( start );
      row.EndTime = this.getHourMinutes( end );
      let day = this.dayAndDate( start );
      if (days[day]) {
        days[day].events.push( row );
      } else {
        start.setHours(0); start.setMinutes(0); start.setSeconds(0); start.setMilliseconds(0);
        let avatar = this.getAvatar( start );
        days[day] = {
          date: start,
          title: day,
          avatar: avatar,
          events: [row]
        };
      }
    } );
    return (
      <div>
        { Object.keys(days).map( (key) => {
          return (
            <ScheduleCard
              key={key}
              day={days[key]}
            />
          );
        })}
      </div>
    )
  }
  
  parseNordicDate( datestring ) {
    //                               1=day          2=month        3=year   kl.   4=hour         5=minutes      6=seconds
    let matches = datestring.match(/([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)[^0-9]*([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)/);
    return new Date(matches[3],matches[2]-1,matches[1],matches[4],matches[5],matches[6],0);
  }

  dayAndDate( date ) {
    const { t } = this.props;

    return [
      t('schedule.sunday'),
      t('schedule.monday'),
      t('schedule.tuesday'),
      t('schedule.wednesday'),
      t('schedule.thursday'),
      t('schedule.friday'),
      t('schedule.saturday')
    ][date.getDay()]+' '+date.getDate()+'.'+(date.getMonth()+1);
  }

  getAvatar( date ) {
    const { t } = this.props;

    return [
      t('schedule.avatar_sunday'),
      t('schedule.avatar_monday'),
      t('schedule.avatar_tuesday'),
      t('schedule.avatar_wednesday'),
      t('schedule.avatar_thursday'),
      t('schedule.avatar_friday'),
      t('schedule.avatar_saturday')
    ][date.getDay()];
  }

  getHourMinutes( date ) {
    return date.getHours()+':'+(date.getMinutes() < 10 ? '0' : '')+date.getMinutes();
  }
}

export default withTranslation()(SectionSchedule);