import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withTranslation, WithTranslation } from 'react-i18next';
import './scss/SectionMap.scss';

interface SectionMapProps {
  mapList: any;
}

class SectionMap extends React.Component<SectionMapProps & WithTranslation, {}> {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState( {open: true});
  };

  handleClose = () => {
    this.setState( {open: false});
  };

  render() {
    const { t, mapList } = this.props;
    let mapURL: string = '';
    let list: any[] = mapList.slice(); // Make a copy
    if (list[0].Name === 'Map Image' || list[0].Location.startsWith('http')) {
      mapURL = list[0].Location;
      list.shift();
    }
    return (
      <Card>
        <CardActionArea
          onClick={this.handleOpen}
        >
          <img
            src={mapURL}
            className="map_image"
            title={t('map.title')}
            alt={t('map.title')}
          />
        </CardActionArea>
        <List>
        { list.map( (row, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>
                <Icon>{row.Icon}</Icon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={row.Name} secondary={row.Location} />
          </ListItem>
        ))}
        </List>
        <Dialog
          fullScreen
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          >
          <DialogTitle id="simple-dialog-title">
            <Typography variant="h4">{t('map.title')}</Typography>
            <IconButton aria-label="Close" className="map_close_button" onClick={this.handleClose}>
              <Icon>close</Icon>
            </IconButton>
          </DialogTitle>
          <Box className="map_image_container">
            <img
              src={mapURL}
              title={t('map.title')}
              alt={t('map.title')}
            />
          </Box>
        </Dialog>
      </Card>
    )
  }
}

export default withTranslation()(SectionMap);