import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';
import { contactsSelector, filterSelector } from '../../redux/selectors';

const ContactList = () => {
  const filter = useSelector(filterSelector);

  const contactsData = useSelector(contactsSelector);

  const visibleContact = (contactsData, filter) => {
    if (filter === '') return contactsData;
    return contactsData.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <ul className={styles.contactsList}>
      {visibleContact(contactsData, filter).map(contact => {
        return <Contact contactData={contact} key={contact.id} />;
      })}
    </ul>
  );
};

export default ContactList;
