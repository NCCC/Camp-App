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
import { useTranslation } from 'react-i18next';

function ContactCardDialog( props ) {
  const { open, onClose, data, handleCall } = props;
  const { t } = useTranslation();
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{t('contact.call_title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('contact.call_text', {data})}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={handleCall} color="primary">
          <Icon>call</Icon>
        </IconButton>
        <IconButton onClick={onClose} color="secondary" autoFocus>
          <Icon>cancel</Icon>
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}

export default function ContactCard( props ) {
  const { data } = props;
  const [open, setOpen] = React.useState(false);
  
  const handleCallDialog = () => {
    setOpen( true );
  }

  const handleClose = () => {
    setOpen( false );
  }

  const handleCall = () => {
    setOpen( false );
    window.location.href = 'tel:'+data.Phone;
  }
  
  const handleLink = () => {
    window.open(data.URL, '_blank');
  }
  
  const handleEmail = () => {
    window.location.href = 'mailto:'+data.Email;
  }

  return (
    <Card className="CampCard">
      <CardHeader
        avatar={<Icon>{data.Icon}</Icon>}
        title={data.Title}
        subheader={data.Phone}
        action={
          <div>
          { data.Phone
            ? (<IconButton aria-label="Phone" color="primary" onClick={handleCallDialog}>
              <Icon>phone</Icon>
            </IconButton>)
            : ''
          }
          { data.Email 
            ? (<IconButton aria-label="Link" color="primary" onClick={handleEmail}>
              <Icon>email</Icon>
            </IconButton>)
            : ''
          }
          { data.URL 
            ? (<IconButton aria-label="Link" color="primary" onClick={handleLink}>
              <Icon>link</Icon>
            </IconButton>)
            : ''
          }
          </div>
        }
      />
      <ContactCardDialog
        open={open}
        onClose={handleClose}
        data={data}
        handleCall={handleCall}
      />
    </Card>
  )
}