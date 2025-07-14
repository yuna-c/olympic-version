import { useEffect } from 'react';
import Form from './components/form/Form';
import Sort from './components/form/Sort';
import Table from './components/table/Table';
import useOlympicStore from './zustand/olympicStore';
import './App.css';

function App() {
  const { loadFromStorage } = useOlympicStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <div id="wrap">
      <h1>Zustand : 올림픽 매달 트래커</h1>
      <Form />
      <Sort />
      <Table />
    </div>
  );
}

export default App;
