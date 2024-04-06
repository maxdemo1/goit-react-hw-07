import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';
import { selectFilteredContacts } from '../../redux/selectors';

const ContactList = () => {
  const visibleContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={styles.contactsList}>
      {visibleContacts.map(contact => {
        return <Contact contactData={contact} key={contact.id} />;
      })}
    </ul>
  );
};

export default ContactList;
