import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles( theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.short,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}) );

export default function InformationCard( props ) {
  const { information } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState( false );

  const handleExpandClick = () => {
    setExpanded( !expanded );
  };
  
  return (
    <Card classes={{ root: 'CampCard' }} >
      <CardHeader
        title={information.Title}
        avatar={
          <Avatar style={{backgroundColor: (information.Color ? information.Color : 'black')}}>
            <Icon>{information.Icon}</Icon>
          </Avatar>
        }
        action={ information.Text
          ? (<IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <Icon>expand_more</Icon>
          </IconButton>)
          : ""
        }
      />
      { information.Text
        ? (<Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {information.Text.split('\n').map((line,index) => (
              !line.match(/^\s*$/)
              ? (<Typography variant="body1" key={index}>
                {line}
              </Typography>)
              : (<br key={index} />)
            ))}
          </CardContent>
        </Collapse>)
        : ""
      }
    </Card>
  )
}