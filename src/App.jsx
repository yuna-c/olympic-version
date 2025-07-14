import Form from './components/form/Form';
import Sort from './components/form/Sort';
import Table from './components/table/Table';
import './App.css';

function App() {
  return (
    <div id="wrap">
      <h1>Context : 올림픽 매달 트래커</h1>
      <Form />
      <Sort />
      <Table />
    </div>
  );
}

export default App;
