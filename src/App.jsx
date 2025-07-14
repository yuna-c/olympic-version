import Form from './components/form/Form';
import Sort from './components/form/Sort';
import Table from './components/table/Table';
import Providers from './providers/Providers';
import './App.css';

function App() {
  return (
    <div id="wrap">
      <Providers>
        <Form />
        <Sort />
        <Table />
      </Providers>
    </div>
  );
}

export default App;
