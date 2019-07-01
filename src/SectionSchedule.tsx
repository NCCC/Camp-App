import React from 'react';
import ScheduleCard from './ScheduleCard';

interface SectionScheduleProps {
  scheduleList: any;
}

class SectionSchedule extends React.Component<SectionScheduleProps, {}> {
  render() {
    const { scheduleList } = this.props;
    let data: any = scheduleList;
    let days = {};
    data.forEach( (row) => {
      let start = this.parseNordicDate( row.Start );
      let end = this.parseNordicDate( row.End );
      row.StartTime = this.getHourMinutes( start );
      row.EndTime = this.getHourMinutes( end );
      let day = this.dayOfWeek( start );
      if (days[day]) {
        days[day].events.push( row );
      } else {
        start.setHours(0); start.setMinutes(0); start.setSeconds(0); start.setMilliseconds(0);
        days[day] = {
          date: start,
          title: day,
          events: [row]
        };
      }
    } );
    return (
      <div>
        { Object.values(days).map( (day) => {
          return (
            <ScheduleCard
              day={day}
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

  dayOfWeek( date ) {
    return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][date.getDay()]+' '+date.getDate()+'.'+(date.getMonth()+1);
  }

  getHourMinutes( date ) {
    return date.getHours()+':'+(date.getMinutes() < 10 ? '0' : '')+date.getMinutes();
  }
}

export default SectionSchedule;