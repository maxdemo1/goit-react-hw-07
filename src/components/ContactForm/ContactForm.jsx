import { useId, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUserLock } from 'react-icons/fa6';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import styles from './ContactForm.module.css';

import { addContact } from '../../redux/contactsSlice';

const ContactForm = () => {
  const dataValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, 'Phone number is not valid')
      .required('Required')
      .min(7, 'Too Short!')
      .max(7, 'Too Long!'),
  });

  const usernameId = useId();
  const phoneNumberId = useId();

  const dispatch = useDispatch();
  const addUser = (data, actions) => {
    dispatch(addContact({ ...data, id: nanoid(5) }));
    actions.resetForm();
  };

  const [visibleSvg, setVisibleSvg] = useState(true);

  return (
    <Formik
      initialValues={{
        name: '',
        phoneNumber: '',
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
            name="phoneNumber"
            id={phoneNumberId}
            className={styles.inputField}
          />
          <ErrorMessage
            name="phoneNumber"
            render={msg => <span className={styles.formError}>{msg}</span>}
          />
        </div>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
