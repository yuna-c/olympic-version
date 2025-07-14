import { useEffect, useState } from 'react';
import Form from './components/form/Form';
import Sort from './components/form/Sort';
import Table from './components/table/Table';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [medal, setMedal] = useState({ country: '', gold: 0, silver: 0, bronze: 0 });
  const [sortOption, setSortOption] = useState('gold');

  const onChange = (e) => {
    const { name, value } = e.target;
    setMedal((prev) => ({ ...prev, [name]: name === 'country' ? String(value) : Number(value) }));
  };

  const onCreate = (e) => {
    e.preventDefault();

    if (!medal.country) {
      alert('국가 없음');
      return;
    }

    if (countries.find((e) => e.country === medal.country)) {
      alert('국가 중복');
      return;
    }

    const newMedal = {
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...medal
    };

    const total = [...countries, newMedal];
    setCountries(total);
    localStorage.setItem('countries', JSON.stringify(total));
    alert('추가완료');
    setMedal({ country: '', gold: 0, silver: 0, bronze: 0 });
  };

  const onUpdate = (e) => {
    e.preventDefault();

    const updated = countries.map((e) => (e.country === medal.country ? { ...e, ...medal } : e));

    setCountries(updated);
    localStorage.setItem('countries', JSON.stringify(updated));
    alert('수정완료');
    setMedal({ country: '', gold: 0, silver: 0, bronze: 0 });
  };

  const onDelete = (id) => {
    const deleted = countries.filter((e) => e.id !== id);

    setCountries(deleted);
    localStorage.setItem('countries', JSON.stringify(deleted));
    alert('삭제완료');
  };

  const onSorted = (e) => {
    setSortOption(e.target.value);
  };

  const sortedList = [...countries].sort((a, b) => {
    if (sortOption === 'gold') {
      if (b.gold !== a.gold) return b.gold - a.gold;
      if (b.sliver !== a.sliver) return b.sliver - a.sliver;
      return b.bronze - a.bronze;
    }
    if (sortOption === 'total') {
      const totalA = a.gold + a.sliver + a.bronze;
      const totalB = b.gold + b.sliver + b.bronze;
      return totalB - totalA;
    }
    if (sortOption === 'latest') {
      return Number(b.id.split('-')[0]) - Number(a.id.split('-')[0]);
    }
    return 0;
  });

  useEffect(() => {
    const saved = localStorage.getItem('countries');
    if (saved) setCountries(JSON.parse(saved));
  }, []);

  return (
    <div id="wrap">
      <h1>Prop : 올림픽 매달 트래커</h1>
      <Form medal={medal} onCreate={onCreate} onChange={onChange} onUpdate={onUpdate} />
      <Sort sortOption={sortOption} onSorted={onSorted} />
      <Table sortedList={sortedList} onDelete={onDelete} />
    </div>
  );
}

export default App;
