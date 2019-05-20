import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

interface CampInfoProps {
  isLoaded: boolean,
  campdata: any,
  sectionSelectedIndex: number
  //handleDataSelect: (event, index) => void;
}

export default class CampInfo extends React.Component<CampInfoProps, {}> {
  state = {
    isLoaded: 0,
    sectionSelectedIndex: 0,
    campData: null
  };
  
  componentWillReceiveProps(nextProps) {
    this.setState({ 
      isLoaded: nextProps.isLoaded,
      campData: nextProps.campdata,
      sectionSelectedIndex: nextProps.sectionSelectedIndex
    });  
  }

  render() {
    const { isLoaded, sectionSelectedIndex, campData } = this.state;

    if (!isLoaded) {
      return (
        <Card>
          <CardHeader
            avatar={<CircularProgress />}
            title="Loading data..."
          />
        </Card>
      )
    } else if (!campData) {
      return (
        <Card>
          <CardHeader
            avatar={<Icon>error</Icon>}
            title="Error loading data."
          />
        </Card>
      )
    } else {
      return (<p>Yes data</p>)
    }
  }
}