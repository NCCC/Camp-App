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
    <Paper className={classes.root}>
      <Typography variant="h4" color="inherit">
        Select a camp
      </Typography>
      <Typography variant="body1" color="inherit">
        Select a camp from the menu.
      </Typography>
      <Typography variant="body1" color="inherit">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Typography>
    </Paper>
  );
}

export default withStyles(styles)(CampSelect);
