import { useEffect, useState } from 'react';
import Form from './components/form/Form';
import Sort from './components/form/Sort';
import Table from './components/table/Table';
import Providers from './providers/Providers';

function App() {
  return (
    <Providers>
      <Form />
      <Sort />
      <Table />
    </Providers>
  );
}

export default App;
