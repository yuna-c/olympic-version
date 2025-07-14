import { useOlympicContext } from '../../context/Context';

function Sort() {
  const { sortOption, onSorted } = useOlympicContext();

  return (
    <div className="sort">
      <label htmlFor="sort">정렬기준</label>
      <select name="sort" id="sort" value={sortOption} onChange={onSorted}>
        <option value="gold">금은동순</option>
        <option value="total">총메달순</option>
        <option value="latest">최신순</option>
      </select>
    </div>
  );
}

export default Sort;
