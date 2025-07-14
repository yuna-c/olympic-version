import useOlympicStore from '../../zustand/olympicStore';

function Sort() {
  const { sortOption, onSorted } = useOlympicStore((state) => state);

  const onSort = (e) => {
    onSorted(e.target.value);
  };

  return (
    <div className="sort">
      <label htmlFor="sort">정렬기준</label>
      <select name="sort" id="sort" value={sortOption} onChange={onSort}>
        <option value="gold">금은동순</option>
        <option value="total">총메달순</option>
        <option value="latest">최신순</option>
      </select>
    </div>
  );
}

export default Sort;
