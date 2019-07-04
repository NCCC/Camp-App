import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { useTranslation } from 'react-i18next';

function CampSelect(props) {
  const { t } = useTranslation();
  
  return (
    <div className="App-main">
      <Card>
        <CardHeader
          avatar={<Icon>folder_open</Icon>}
          title={
            <Typography variant="h5" color="inherit">
            {t('campselect.title')}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body1" color="inherit">
            {t('campselect.text')}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default CampSelect;
