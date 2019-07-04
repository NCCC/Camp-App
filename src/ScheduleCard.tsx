import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { withTranslation, WithTranslation } from 'react-i18next';

const styles = theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  activeDay: {
    background: 'black'
  }
});

interface ScheduleCardProps {
  classes: any,
  day: any,
  now: any
}

class ScheduleCard extends React.Component<ScheduleCardProps & WithTranslation, {}> {
  state = {
    expanded: true
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !this.state.expanded }));
  };
  
  constructor(props) {
    super(props);
    let today = new Date( props.now.getTime() );
    today.setHours(0); today.setMinutes(0); today.setSeconds(0); today.setMilliseconds(0);
    if (props.day.date < today)
      this.state.expanded = false;
  }
  
  render() {
    const { t, classes, day, now } = this.props;
    const { expanded } = this.state;
    let today = new Date();
    today.setHours(0); today.setMinutes(0); today.setSeconds(0); today.setMilliseconds(0);
    
    return (
      <Card classes={{ root: 'CampCard' }} >
        <CardHeader
          title={day.title}
          avatar={
            <Avatar classes={{
              root: (day.date >= today ? classes.activeDay : '')
            }}>
              {day.avatar}
            </Avatar>
          }
          action={
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={expanded}
              aria-label={t('schedule.show')}
            >
              <Icon>expand_more</Icon>
            </IconButton>
          }
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {day.events.map( (data: any,index) => {
              let eventStyle = {
                'padding': '2px 5px'
              }
              if (data.Color)
                eventStyle['backgroundColor'] = data.Color
              if (data.EndDateObject < now)
                eventStyle['color'] = 'gray'
              if (data.StartDateObject < now && now < data.EndDateObject) {
                eventStyle['border'] = '2px solid black'
                eventStyle['padding'] = '0 3px'
              }
              return (
                <Typography variant="body1" key={index} style={eventStyle}>
                  {data.StartTime} - {data.EndTime}: {data.Name} {data.Location ? '('+data.Location+')' : ''}
                </Typography>
              )
            })}
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

export default withStyles(styles)(withTranslation()(ScheduleCard));