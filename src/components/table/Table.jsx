import { useOlympicContext } from '../../context/Context';

function Table() {
  const { sortedList, onDelete } = useOlympicContext();
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
