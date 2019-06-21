import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

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
  day: any
}

class ScheduleCard extends React.Component<ScheduleCardProps, {}> {
  state = {
    expanded: true
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !this.state.expanded }));
  };
  
  constructor(props) {
    super(props);
    let now = new Date();
    now.setHours(0); now.setMinutes(0); now.setSeconds(0); now.setMilliseconds(0);
    if (props.day.date < now)
      this.state.expanded = false;
  }
  
  render() {
    const { classes, day } = this.props;
    let now = new Date();
    now.setHours(0); now.setMinutes(0); now.setSeconds(0); now.setMilliseconds(0);
    
    return (
      <Card classes={{ root: 'CampCard' }} >
        <CardHeader
          title={day.title}
          avatar={
            <Avatar classes={{
              root: (day.date >= now ? classes.activeDay : '')
            }}>
              {day.title.substr(0,2)}
            </Avatar>
          }
          action={
            <IconButton
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <Icon>expand_more</Icon>
            </IconButton>
          }
        />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {day.events.map( (data: any,index) => (
              <Typography variant="body1" key={index}>
                {data.StartTime} - {data.EndTime}: {data.Name} {data.Location ? '('+data.Location+')' : ''}
              </Typography>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

export default withStyles(styles)(ScheduleCard);