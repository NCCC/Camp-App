import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import BusinessIcon from '@material-ui/icons/Business';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withTranslation, WithTranslation } from 'react-i18next';
import i18n from './i18n';

import './scss/TopBar.scss';

// define the function outside of component scope
const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
};

interface TopBarProps {
  campid: string;
  campname: string;
  sectionname: string;
}

class TopBar extends React.Component<TopBarProps & WithTranslation, {}> {
  state = {
    open: false,
    error: null,
    campList: [],
    isLoaded: false,
    campid: '',
    campName: '',
    sectionName: ''
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
        console.log(error);
        this.setState({isLoaded: true, error});
      }
    );
  }
  
  toggleDrawer = () => () => {
    this.setState(state => ({ open: !this.state.open }));
  };
  
  render() {
    const { campName, sectionName } = this.state;
    const { t } = this.props;
    
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu"
                        onClick={this.toggleDrawer()}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            { campName ?
              (campName+' - '+sectionName) :
              "NCCC Camp App"
            }
          </Typography>
        </Toolbar>
        <SwipeableDrawer
          classes={{paper: 'main_menu'}}
          open={this.state.open}
          onClose={this.toggleDrawer()}
          onOpen={this.toggleDrawer()}
        >
          <List>
            <ListItem>
              <ListItemText>{t('language')}:</ListItemText>
              <ListItemSecondaryAction>
                <Button
                  variant="outlined"
                  onClick={(e) => changeLanguage('en')}
                >Eng</Button>
                <Button
                  variant="outlined"
                  onClick={(e) => changeLanguage('zh')}
                >中文</Button>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <List
            onClick={this.toggleDrawer()}
          >
            <ListSubheader>
              {t('campselect.title')}:
            </ListSubheader>
            { this.state.isLoaded
              ? this.state.campList.map((item) => {
                // Had to cast item to "any" for it to not crash with error TS2339
                let camp: any = item;
                return (
                <ListItem button
                  key={camp.name}
                  selected={this.props.campid === camp.id}
                  component={Link}
                  to={'/'+camp.id}
                >
                  <ListItemIcon><BusinessIcon /></ListItemIcon>
                  <ListItemText primary={camp.name} />
                </ListItem>
              )})
              : <ListItem>
                  <ListItemIcon><CircularProgress /></ListItemIcon>
                  <ListItemText>{t('campselect.loading')}...</ListItemText>
                </ListItem>
            }
          </List>
        </SwipeableDrawer>
      </AppBar>
    );
  }
}

export default withTranslation()(TopBar);