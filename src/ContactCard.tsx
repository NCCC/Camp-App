import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { withTranslation, WithTranslation } from 'react-i18next';

interface ContactCardProps {
  data: any
}

class ContactCard extends React.Component<ContactCardProps & WithTranslation, {}> {
  state = {
    dialog: false
  }
  
  handleCallDialog = () => {
    this.setState( state => ({dialog: true}) );
  }

  handleClose = () => {
    this.setState( state => ({dialog: false}) );
  }

  handleCall = () => {
    this.setState( state => ({dialog: false}) );
    window.location.href = 'tel:'+this.props.data.Phone;
  }
  
  handleLink = () => {
    window.open(this.props.data.URL, '_blank');
  }
  
  handleEmail = () => {
    window.location.href = 'mailto:'+this.props.data.Email;
  }

  render() {
    const { dialog } = this.state;
    const { data, t } = this.props;
    return (
      <Card className="CampCard">
        <CardHeader
          avatar={<Icon>{data.Icon}</Icon>}
          title={data.Title}
          subheader={data.Phone}
          action={
            <div>
            { data.Phone
              ? (<IconButton aria-label="Phone" color="primary" onClick={this.handleCallDialog}>
                <Icon>phone</Icon>
              </IconButton>)
              : ''
            }
            { data.Email 
              ? (<IconButton aria-label="Link" color="primary" onClick={this.handleEmail}>
                <Icon>email</Icon>
              </IconButton>)
              : ''
            }
            { data.URL 
              ? (<IconButton aria-label="Link" color="primary" onClick={this.handleLink}>
                <Icon>link</Icon>
              </IconButton>)
              : ''
            }
            </div>
          }
        />
        <Dialog
          open={dialog}
          onClose={this.handleClose}
        >
          <DialogTitle>{t('contact.call_title')}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t('contact.call_text', {data})}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <IconButton onClick={this.handleCall} color="primary">
              <Icon>call</Icon>
            </IconButton>
            <IconButton onClick={this.handleClose} color="secondary" autoFocus>
              <Icon>cancel</Icon>
            </IconButton>
          </DialogActions>
        </Dialog>
      </Card>
    )
  }
}

export default withTranslation()(ContactCard);