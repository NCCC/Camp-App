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
  sectionData: any
  //handleDataSelect: (event, index) => void;
}

export default class CampInfo extends React.Component<CampInfoProps, {}> {
  state = {
    isLoaded: 0,
    sectionData: null
  };
  
  componentWillReceiveProps(nextProps) {
    this.setState({ 
      isLoaded: nextProps.isLoaded,
      sectionData: nextProps.sectionData
    });  
  }

  render() {
    const { isLoaded, sectionData } = this.state;

    if (!isLoaded) {
      return (
        <Card>
          <CardHeader
            avatar={<CircularProgress />}
            title="Loading data..."
          />
        </Card>
      )
    } else if (!sectionData) {
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