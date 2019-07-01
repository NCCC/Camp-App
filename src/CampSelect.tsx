import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

function CampSelect(props) {
  return (
    <div className="App-main">
      <Card>
        <CardHeader
          avatar={<Icon>folder_open</Icon>}
          title={
            <Typography variant="h5" color="inherit">
              Select a camp
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body1" color="inherit">
            Select a camp from the menu.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default CampSelect;
