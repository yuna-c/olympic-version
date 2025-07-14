import Form from './components/form/Form';
import Sort from './components/form/Sort';
import Table from './components/table/Table';
import Providers from './providers/Providers';
import './App.css';

function App() {
  return (
    <div id="wrap">
      <h1>Context : 올림픽 매달 트래커</h1>
      <Providers>
        <Form />
        <Sort />
        <Table />
      </Providers>
    </div>
  );
}

export default App;
