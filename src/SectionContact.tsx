import React from 'react';
import ContactCard from './ContactCard';

interface SectionContactProps {
  contactList: any;
}

class SectionContact extends React.Component<SectionContactProps, {}> {

  
  render() {
    const { contactList } = this.props;

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
}

export default SectionContact;