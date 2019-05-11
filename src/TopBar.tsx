import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BusinessIcon from '@material-ui/icons/Business';

class TopBar extends React.Component {
  state = {
    open: false,
    selectedIndex: 0
  };

  toggleDrawer = () => () => {
    this.setState(state => ({ open: !this.state.open }));
  };
  
  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };
  
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu"
                        onClick={this.toggleDrawer()}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            NCCC Camp App
          </Typography>
        </Toolbar>
        <SwipeableDrawer
          open={this.state.open}
          onClose={this.toggleDrawer()}
          onOpen={this.toggleDrawer()}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer()}
            onKeyDown={this.toggleDrawer()}
          >
            <List>
              <ListItem>
                <ListItemText>Select a camp:</ListItemText>
              </ListItem>
              {['Prep Camp 2019', 'SC19 - Chinese Camp', 'SC19 - Junior/Youth/YA Camp',].map((text, index) => (
                <ListItem button
                  key={text}
                  selected={this.state.selectedIndex === index}
                  onClick={event => this.handleListItemClick(event, index)}
                >
                  <ListItemIcon><BusinessIcon /></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        </SwipeableDrawer>
      </AppBar>
    );
  }
}

export default TopBar;
