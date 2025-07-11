import { useEffect, useRef } from 'react';
import Form from './components/form/Form';
import Sort from './components/form/Sort';
import Table from './components/table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { loadFormStorage } from './redux/slices/OlympicSlice';

function App() {
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.olympic.countries);
  const isFirst = useRef(true);

  useEffect(() => {
    const saved = localStorage.getItem('countries');
    if (saved && saved !== 'undefined') {
      dispatch(loadFormStorage(JSON.parse(saved)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    localStorage.setItem('countries', JSON.stringify(countries));
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
