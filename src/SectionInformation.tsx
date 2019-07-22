import React from 'react';
import InformationCard from './InformationCard';

export default function SectionInformation(props) {
  const { informationList } = props;
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