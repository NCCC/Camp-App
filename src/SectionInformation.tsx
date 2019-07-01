import React from 'react';
import InformationCard from './InformationCard';

interface SectionInformationProps {
  informationList: any;
}

class SectionInformation extends React.Component<SectionInformationProps, {}> {
  render() {
    const { informationList } = this.props;
    return (
      <div>
        { informationList.map( (row, index) => (
            <InformationCard
              key={index}
              information={row}
            />
        ))}
      </div>
    )
  }
}

export default SectionInformation;