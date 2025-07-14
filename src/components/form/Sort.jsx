import { useDispatch, useSelector } from 'react-redux';
import { setSortOption } from '../../redux/slices/OlympicSlice';

function Sort() {
  const dispatch = useDispatch();
  const sortOption = useSelector((state) => state.olympic.sortOption);

  const onSorted = (e) => {
    dispatch(setSortOption(e.target.value));
  };
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
