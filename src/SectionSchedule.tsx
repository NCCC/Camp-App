import React, { useEffect } from 'react';
import SimpleCard from './SimpleCard';
import ScheduleCard from './ScheduleCard';
import Icon from '@material-ui/core/Icon';
import { useTranslation } from 'react-i18next';

const SCHEDULE_UPDATE_TIME = 5*1000;
const SCHEDULE_REGEX_DATE = /(\d{1,2})[./](\d{1,2})[./](\d{4}) (\d{1,2}):(\d{2})/;
const SCHEDULE_REGEX_SQL_DATE = /([0-9]{4})-([0-9]{1,2})-([0-9]{1,2}) (\d{1,2}):(\d{2})/;

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
  
  function makeDate( datestring ) {
    let matches = datestring.match(SCHEDULE_REGEX_DATE);
    if (matches)
      return new Date(matches[3],matches[2]-1,matches[1],matches[4],matches[5],0,0);
    matches = datestring.match(SCHEDULE_REGEX_SQL_DATE);
    if (matches)
      return new Date(matches[1],matches[2]-1,matches[3],matches[4],matches[5],0,0);
    throw new Error("Unable to parse date: "+datestring);
  }

  let data: any = scheduleList;
  let days = {};
  try {
    for (let index = 0; index < data.length; index++) {
      let row_data = data[index];
      if (!row_data.Date)
        continue;
      let start = makeDate(row_data.Date+' '+row_data.Start);
      row_data.StartDateObject = start;
      let end = makeDate(row_data.Date+' '+row_data.End);
      row_data.EndDateObject = end;
      let day = dayAndDate( start );
      if (days[day]) {
        days[day].events.push( row_data );
      } else {
        let avatar = getAvatar( start );
        days[day] = {
          date: start,
          title: day,
          avatar: avatar,
          events: [row_data]
        };
      }
    }
  } catch (error) {
    return (
      <SimpleCard text={ error.message } color="error" title="Error" icon={<Icon>error</Icon>} />
    );
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