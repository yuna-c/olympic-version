import { createContext, useContext, useEffect, useState } from 'react';

// 컨텍스트 객체 생성
export const OlympicContext = createContext();

// OlympicContext의 공급자 역할
export const OlympicProvider = ({ children }) => {
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
      alert('국가명을 입력하세요.');
      return;
    }

    if (countries.find((e) => e.country === medal.country)) {
      alert('이미 등록된 국가입니다.');
      return;
    }

    if (medal.gold < 0 || medal.silver < 0 || medal.bronze < 0) {
      alert('메달 수는 0 이상이어야 합니다.');
      return;
    }

    const newMedal = {
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...medal
    };

    const total = [...countries, newMedal];
    setCountries(total);
    localStorage.setItem('countries', JSON.stringify(total));
    alert('입력 완료');
    setMedal({ country: '', gold: 0, silver: 0, bronze: 0 });
  };

  const onUpdate = (e) => {
    e.preventDefault();

    if (!medal.country) {
      alert('수정할 국가명을 입력하세요.');
      return;
    }

    if (!countries.find((e) => e.country === medal.country)) {
      alert('등록되지 않은 국가입니다.');
      return;
    }

    const updated = countries.map((e) => (e.country === medal.country ? { ...e, ...medal } : e));

    setCountries(updated);
    localStorage.setItem('countries', JSON.stringify(updated));
    alert('수정 완료');
    setMedal({ country: '', gold: 0, silver: 0, bronze: 0 });
  };

  const onDelete = (id) => {
    const deleted = countries.filter((e) => e.id !== id);

    if (window.confirm('정말 삭제할까요?')) {
      setCountries(deleted);
      alert('삭제 완료');
    }

    localStorage.setItem('countries', JSON.stringify(deleted));
  };

  const onSorted = (e) => {
    setSortOption(e.target.value);
  };

  const sortedList = [...countries].sort((a, b) => {
    if (sortOption === 'gold') {
      if (b.gold !== a.gold) return b.gold - a.gold;
      if (b.silver !== a.silver) return b.silver - a.silver;
      return b.bronze - a.bronze;
    }
    if (sortOption === 'total') {
      const totalA = a.gold + a.silver + a.bronze;
      const totalB = b.gold + b.silver + b.bronze;
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
    <OlympicContext.Provider
      value={{
        countries,
        setCountries,
        medal,
        setMedal,
        sortOption,
        setSortOption,
        onChange,
        onCreate,
        onDelete,
        onSorted,
        onUpdate,
        sortedList
      }}
    >
      {children}
    </OlympicContext.Provider>
  );
};

// Context를 쉽게 꺼내 쓰기 위한 헬퍼 함수(커스텀 훅)
export const useOlympicContext = () => useContext(OlympicContext);
