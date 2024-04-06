import { useId, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUserLock } from 'react-icons/fa6';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';

import styles from './ContactForm.module.css';
import { addContact } from '../../redux/contactsOps';

// import { addContact } from '../../redux/contactsSlice';

const ContactForm = () => {
  const dataValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    number: Yup.string()
      .matches(/^\d+$/, 'Phone number is not valid')
      .required('Required')
      .min(10, 'Too Short!')
      .max(10, 'Too Long!'),
  });

  const usernameId = useId();
  const phoneNumberId = useId();

  const dispatch = useDispatch();
  const addUser = (data, actions) => {
    dispatch(addContact({ ...data }));
    actions.resetForm();
  };

  const [visibleSvg, setVisibleSvg] = useState(true);

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      onSubmit={addUser}
      validationSchema={dataValidationSchema}
    >
      <Form className={styles.addContactForm}>
        <div className={styles.inputFieldContainer}>
          <label htmlFor={usernameId}>Name</label>
          <div className={styles.inputSvgContainer}>
            <Field
              type="text"
              name="name"
              id={usernameId}
              className={clsx(styles.inputField, styles.inputFieldAddition)}
              onFocus={() => {
                setVisibleSvg(prevState => !prevState);
              }}
              onBlur={() => {
                setVisibleSvg(prevState => !prevState);
              }}
            />
            <FaUserLock
              className={clsx(styles.userLock, {
                [styles.notVisible]: visibleSvg,
              })}
            />
          </div>
          <ErrorMessage
            name="name"
            render={msg => <span className={styles.formError}>{msg}</span>}
          />
        </div>
        <div className={styles.inputFieldContainer}>
          <label htmlFor={phoneNumberId}>Number</label>
          <Field
            type="text"
            name="number"
            id={phoneNumberId}
            className={styles.inputField}
          />
          <ErrorMessage
            name="number"
            render={msg => <span className={styles.formError}>{msg}</span>}
          />
        </div>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
