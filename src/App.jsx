import { useEffect, useState } from 'react';
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
    <div id="wrap">
      <h1>State : 올림픽 매달 트래커</h1>

      <form onSubmit={onCreate}>
        <fieldset>
          <label htmlFor="country">국가</label>
          <input type="text" id="country" name="country" placeholder="국가" value={medal.country} onChange={onChange} />
        </fieldset>
        <fieldset>
          <label htmlFor="gold">금메달</label>
          <input type="text" id="gold" name="gold" placeholder="금메달" value={medal.gold} onChange={onChange} />
        </fieldset>
        <fieldset>
          <label htmlFor="silver">은메달</label>
          <input type="text" id="silver" name="silver" placeholder="은메달" value={medal.silver} onChange={onChange} />
        </fieldset>
        <fieldset>
          <label htmlFor="bronze">동메달</label>
          <input type="text" id="bronze" name="bronze" placeholder="동메달" value={medal.bronze} onChange={onChange} />
        </fieldset>

        <div className="button">
          <button type="submit">추가하기</button>
          <button type="button" onClick={onUpdate}>
            수정하기
          </button>
        </div>
      </form>

      <div className="sort">
        <label htmlFor="sort">정렬기준</label>
        <select name="sort" id="sort" value={sortOption} onChange={onSorted}>
          <option value="gold">금은동순</option>
          <option value="total">총메달순</option>
          <option value="latest">최신순</option>
        </select>
      </div>

      {sortedList.length === 0 ? (
        <p>데이터 없음</p>
      ) : (
        <table width="100%">
          <caption>메달 획득 현황</caption>
          <colgroup>
            <col style={{ width: '16.66%' }} />
            <col style={{ width: '16.66%' }} />
            <col style={{ width: '16.66%' }} />
            <col style={{ width: '16.66%' }} />
            <col style={{ width: '16.66%' }} />
            <col style={{ width: '16.66%' }} />
          </colgroup>

          <thead>
            <tr>
              <th>국가</th>
              <th>금메달</th>
              <th>은메달</th>
              <th>동메달</th>
              <th>총메달</th>
              <th>액션</th>
            </tr>
          </thead>

          <tbody>
            {sortedList.map((country) => {
              return (
                <tr key={country.id}>
                  <td>{country.country}</td>
                  <td>{country.gold}</td>
                  <td>{country.silver}</td>
                  <td>{country.bronze}</td>
                  <td>{country.gold + country.silver + country.bronze}</td>
                  <td>
                    <button onClick={() => onDelete(country.id)}>삭제</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
