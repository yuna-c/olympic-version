import { useEffect } from 'react';
import Form from './components/form/Form';
import Sort from './components/form/Sort';
import Table from './components/table/Table';
import { useDispatch } from 'react-redux';
import { loadFormStorage } from './redux/slices/OlympicSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFormStorage());
  }, [dispatch]);

  return (
    <>
      <Form />
      <Sort />
      <Table />
    </>
  );
}

export default App;
