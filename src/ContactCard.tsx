import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

interface ContactCardProps {
  data: any
}

class ContactCard extends React.Component<ContactCardProps, {}> {
  state = {
    dialog: false
  }
  
  handleOpen = () => {
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
    const { data } = this.props;
    return (
      <Card className="CampCard">
        <CardHeader
          avatar={<Icon>{data.Icon}</Icon>}
          title={data.Title}
          subheader={data.Phone}
          action={
            <div>
            { data.Phone
              ? (<IconButton aria-label="Phone" onClick={this.handleOpen}>
                <Icon>phone</Icon>
              </IconButton>)
              : ''
            }
            { data.Email 
              ? (<IconButton aria-label="Link" onClick={this.handleEmail}>
                <Icon>email</Icon>
              </IconButton>)
              : ''
            }
            { data.URL 
              ? (<IconButton aria-label="Link" onClick={this.handleLink}>
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
          <DialogTitle>Make a phone call?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will make a phone call to {data.Phone}. Are you sure you want to do this?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCall} color="primary">
              Call
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    )
  }
}

export default ContactCard;