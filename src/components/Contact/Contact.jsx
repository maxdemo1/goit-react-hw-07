import { FaUser } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

import styles from './Contact.module.css';

import { deleteContact } from '../../redux/contactsSlice';

const Contact = ({ contactData }) => {
  const dispatch = useDispatch();

  return (
    <li className={styles.userItem}>
      <div>
        <div className={styles.nameContainer}>
          <FaUser />
          <p>{contactData.name}</p>
        </div>
        <div className={styles.phoneContainer}>
          <FaPhone />
          <p>{contactData.phoneNumber}</p>
        </div>
      </div>

      <button
        type="button"
        className={styles.deleteButton}
        onClick={() => {
          dispatch(deleteContact(contactData.id));
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;
