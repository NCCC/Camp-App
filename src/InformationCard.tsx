import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
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
  }
});

interface InformationCardProps {
  information: any
}

class InformationCard extends React.Component<InformationCardProps, {}> {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !this.state.expanded }));
  };
  
  render() {
    const { information } = this.props;
    
    return (
      <Card classes={{ root: 'CampCard' }} >
        <CardHeader
          title={information.Title}
          avatar={
            <Avatar>
              <Icon>{information.Icon}</Icon>
            </Avatar>
          }
          action={ information.Text
            ? (<IconButton
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <Icon>expand_more</Icon>
            </IconButton>)
            : ""
          }
        />
        { information.Text
          ? (<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {information.Text.split('\n').map((line,index) => (
                !line.match(/^\s+$/)
                ? (<Typography variant="body1" key={index}>
                  {line}
                </Typography>)
                : (<br/>)
              ))}
            </CardContent>
          </Collapse>)
          : ""
        }
      </Card>
    )
  }
}

export default withStyles(styles)(InformationCard);