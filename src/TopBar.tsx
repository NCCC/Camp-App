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
import CircularProgress from '@material-ui/core/CircularProgress';

interface TopBarProps {
  campid: string;
  campname: string;
  sectionname: string;
}

class TopBar extends React.Component<TopBarProps, {}> {
  state = {
    open: false,
    error: null,
    campList: [],
    isLoaded: false,
    campid: '',
    campName: '',
    sectionName: ''
  };

  toggleDrawer = () => () => {
    this.setState(state => ({ open: !this.state.open }));
  };
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      campid: nextProps.campid,
      campName: nextProps.campname,
      sectionName: nextProps.sectionname
    });  
  }

  componentDidMount() {
    fetch('https://api.nccc.se/camps/')
    .then(result => result.json())
    .then(
      (data) => {
        console.log('List of camps fetched from server.');
        this.setState({isLoaded: true, campList: data.camps});
      },
      (error) => {
        this.setState({isLoaded: true, error});
        console.log(error);
      }
    );
  }
  
  render() {
    const { campName, sectionName } = this.state
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu"
                        onClick={this.toggleDrawer()}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            { campName ?
              (campName+': '+sectionName) :
              "NCCC Camp App"
            }
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
              { this.state.isLoaded
                ? this.state.campList.map((item) => {
                  // Had to cast item to "any" for it to not crash with error TS2339
                  let camp: any = item;
                  return (
                  <ListItem button
                    key={camp.name}
                    selected={this.props.campid === camp.id}
                    component="a"
                    href={camp.id}
                  >
                    <ListItemIcon><BusinessIcon /></ListItemIcon>
                    <ListItemText primary={camp.name} />
                  </ListItem>
                )})
                : <ListItem>
                    <ListItemIcon><CircularProgress /></ListItemIcon>
                    <ListItemText>Fetching list of camps from the server...</ListItemText>
                  </ListItem>
              }
            </List>
          </div>
        </SwipeableDrawer>
      </AppBar>
    );
  }
}

export default TopBar;
