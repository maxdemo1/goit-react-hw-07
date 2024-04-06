import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import styles from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from './redux/contactsOps';
import Loader from './components/Loader/Loader';
import { errorSelector, loaderSelector } from './redux/selectors';

function App() {
  const dispatch = useDispatch();
  const loadingState = useSelector(loaderSelector);
  const errorState = useSelector(errorSelector);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.appContainer}>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loadingState && <Loader />}
      {errorState && (
        <h2
          style={{
            marginTop: 50,
            textAlign: 'center',
          }}
        >
          {errorState}
        </h2>
      )}
      {!loadingState && <ContactList />}
    </div>
  );
}

export default App;
