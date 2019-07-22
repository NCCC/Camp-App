import React from 'react';
import ContactCard from './ContactCard';

export default function SectionContact(props) {
  const { contactList } = props;

  return (
    <div>
      { contactList.map( (row, index) => (
        <ContactCard
          key={index}
          data={row}
        />
      ))}
    </div>
  )
}