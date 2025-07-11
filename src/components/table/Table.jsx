import { useDispatch, useSelector } from 'react-redux';
import { deleteMedal } from '../../redux/slices/OlympicSlice';

function Table() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.olympic.countries);
  const sortOption = useSelector((state) => state.olympic.sortOption);

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

  const onDelete = (id) => {
    if (window.confirm('정말 삭제할까요?')) {
      dispatch(deleteMedal(id));
    }
  };
  return (
    <>
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
    </>
  );
}

export default Table;
