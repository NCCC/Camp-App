import React from 'react';
import ScheduleCard from './ScheduleCard';
import { withTranslation, WithTranslation } from 'react-i18next';

const SCHEDULE_UPDATE_TIME = 15*1000;

interface SectionScheduleProps {
  scheduleList: any;
}

class SectionSchedule extends React.Component<SectionScheduleProps & WithTranslation, {}> {
  state = {
    now: new Date(),
    nowTimer: null
  }
  
  constructor(props) {
    super(props);
    this.state = {
      now: new Date(),
      nowTimer: null
    }
  }
  
  componentDidMount() {
    let timer = setInterval(this.nowInterval.bind(this), SCHEDULE_UPDATE_TIME);
    // store intervalId in the state so it can be accessed later:
    this.setState({nowTimer: timer});
  }
  
  nowInterval() {
    let now = new Date();
    this.setState({now: now});
  }
  
  render() {
    const { now } = this.state;
    const { scheduleList } = this.props;
    let data: any = scheduleList;
    let days = {};
    for (let index = 0; index < data.length; index++) {
      let row_data = data[index];
      if (!row_data.Start || !row_data.End)
        continue;
      let start = this.parseNordicDate( row_data.Start );
      row_data.StartDateObject = start;
      let end = this.parseNordicDate( row_data.End );
      row_data.EndDateObject = end;
      row_data.StartTime = this.getHourMinutes( start );
      row_data.EndTime = this.getHourMinutes( end );
      let day = this.dayAndDate( start );
      if (days[day]) {
        days[day].events.push( row_data );
      } else {
        start.setHours(0); start.setMinutes(0); start.setSeconds(0); start.setMilliseconds(0);
        let avatar = this.getAvatar( start );
        days[day] = {
          date: start,
          title: day,
          avatar: avatar,
          events: [row_data]
        };
      }
    }
    return (
      <div>
        { Object.keys(days).map( (key) => {
          return (
            <ScheduleCard
              key={key}
              now={now}
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
    return (date.getHours() < 10 ? '0' : '')+date.getHours()+':'+(date.getMinutes() < 10 ? '0' : '')+date.getMinutes();
  }
}

export default withTranslation()(SectionSchedule);