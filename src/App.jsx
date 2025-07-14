import { useEffect, useRef } from 'react';
import Form from './components/form/Form';
import Sort from './components/form/Sort';
import Table from './components/table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalCountries, setLocalCountries } from './utils/localStorage';
import { loadFormStorage } from './redux/slices/olympicSlice';

function App() {
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.olympic.countries);
  const isFirst = useRef(true);

  useEffect(() => {
    const loaded = getLocalCountries();
    dispatch(loadFormStorage(loaded));
  }, [dispatch]);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setLocalCountries(countries);
  }, [countries]);

  return (
    <>
      <Form />
      <Sort />
      <Table />
    </>
  );
}

export default App;
