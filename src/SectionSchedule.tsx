import React, { useEffect } from 'react';
import ScheduleCard from './ScheduleCard';
import { useTranslation } from 'react-i18next';

const SCHEDULE_UPDATE_TIME = 5*1000;

export default function SectionSchedule( props ) {
  const { scheduleList } = props;
  const { t } = useTranslation();
  const [now, setNow] = React.useState( new Date() );
  
  useEffect( () => {
    var timerID = setInterval( () => nowInterval(), SCHEDULE_UPDATE_TIME );
  
    return function cleanup() {
      clearInterval( timerID );
    }
  })
  
  function nowInterval() {
    let newNow = new Date();
    if (now.getMinutes() !== newNow.getMinutes()) {
      console.log( 'Camp App: Updating schedule...' );
      setNow( newNow );
    }
  }
  
  function dayAndDate( date ) {
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

  function getAvatar( date ) {
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

  function getHourMinutes( date ) {
    return (date.getHours() < 10 ? '0' : '')+date.getHours()+':'+(date.getMinutes() < 10 ? '0' : '')+date.getMinutes();
  }
  
  let data: any = scheduleList;
  let days = {};
  for (let index = 0; index < data.length; index++) {
    let row_data = data[index];
    if (!row_data.Date)
      continue;
    let start = new Date( Date.parse(row_data.Date+' '+row_data.Start) );
    row_data.StartDateObject = start;
    let end = new Date( Date.parse(row_data.Date+' '+row_data.End) );
    row_data.EndDateObject = end;
    let day = dayAndDate( start );
    if (days[day]) {
      days[day].events.push( row_data );
    } else {
      start.setHours(0); start.setMinutes(0); start.setSeconds(0); start.setMilliseconds(0);
      let avatar = getAvatar( start );
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