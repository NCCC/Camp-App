import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function CampSelect(props) {
  const { classes } = props;

  return (
    <div className="App-main">
      <Paper className={classes.root}>
        <Typography variant="h4" color="inherit">
          Select a camp
        </Typography>
        <Typography variant="body1" color="inherit">
          Select a camp from the menu.
        </Typography>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(CampSelect);
