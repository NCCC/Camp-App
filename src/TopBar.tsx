import React, { useEffect } from 'react';
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
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useTranslation } from 'react-i18next';
import i18n from './i18n';

import './scss/TopBar.scss';

export default function TopBar( props ) {
  const { campID, campName, sectionName } = props;
  const { t } = useTranslation();
  
  const [open, setOpen] = React.useState( false );
  const [error, setError] = React.useState( null );
  const [campList, setCampList] = React.useState( [] );
  const [isLoaded, setIsLoaded] = React.useState( false );

  useEffect(() => {
    async function fetchData() {
      fetch('https://api.nccc.se/camps/')
      .then(result => result.json())
      .then(
        (data) => {
          console.log('Camp App: List of camps fetched from server.');
          setIsLoaded( true );
          setCampList( data.camps );
        },
        (error) => {
          console.log('Camp App: Fetching list of camps failed:',error);
          setIsLoaded( true );
          setError( error );
        }
      );
    }
    fetchData();
  }, []);
  
  const toggleDrawer = () => {
    setOpen( !open );
  }
  
  function changeLanguage( lng ) {
    i18n.changeLanguage( lng );
  }
  
  function CampList() {
    if (error) {
      return (<List>
                <ListItem>
                  <ListItemText>
                    { error }
                  </ListItemText>
                </ListItem>
              </List>);
    }
    if (campList.length > 0) {
      return (<List
        onClick={toggleDrawer}
      >
        <ListSubheader>
          {t('campselect.title')}:
        </ListSubheader>
        { isLoaded
          ? campList.map((item) => {
            // Had to cast item to "any" for it to not crash with error TS2339
            let camp: any = item;
            return (
            <ListItem button
              key={camp.name}
              selected={campID === camp.id}
              component={Link}
              to={'/'+camp.id}
            >
              <ListItemIcon><Icon>business</Icon></ListItemIcon>
              <ListItemText primary={camp.name} />
            </ListItem>
          )})
          : <ListItem>
              <ListItemIcon><CircularProgress /></ListItemIcon>
              <ListItemText>{t('campselect.loading')}...</ListItemText>
            </ListItem>
        }
      </List>);
    } else {
      return (<List>
                <ListItem>
                  <ListItemText>{ t('campselect.nocamps') }</ListItemText>
                </ListItem>
              </List>);
    }
  }
  
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu"
                      onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          { campName ?
            (campName+' - '+sectionName) :
            t('campapp')
          }
        </Typography>
      </Toolbar>
      <SwipeableDrawer
        classes={{paper: 'main_menu'}}
        open={open}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
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
          <ListItem button
            key="0"
            selected={campID === null}
            component={Link}
            to={'/'}
          >
            <ListItemIcon><Icon>home</Icon></ListItemIcon>
            <ListItemText primary={t('campselect.home')} />
          </ListItem>
        </List>
        <CampList />
        <List>
          <ListSubheader>NCCC Camp App v{props.version}</ListSubheader>
        </List>
      </SwipeableDrawer>
    </AppBar>
  )
}