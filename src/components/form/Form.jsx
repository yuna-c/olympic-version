import Button from './Button';
import Input from './Input';
import { useDispatch, useSelector } from 'react-redux';
import { createMedal, setMedal, updateMedal } from '../../redux/slices/OlympicSlice';

function Form() {
  const dispatch = useDispatch();
  const medal = useSelector((state) => state.olympic.medal);

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(setMedal({ [name]: name === 'country' ? String(value) : Number(value) }));
  };

  const onCreate = (e) => {
    e.preventDefault();
    dispatch(createMedal());
  };

  const onUpdate = (e) => {
    e.preventDefault();
    dispatch(updateMedal());
  };

  return (
    <form onSubmit={onCreate}>
      <Input id="country" name="country" label="나라" value={medal.country} onChange={onChange} />
      <Input type="number" id="gold" name="gold" label="금메달" value={medal.gold} onChange={onChange} />
      <Input type="number" id="silver" name="silver" label="은메달" value={medal.silver} onChange={onChange} />
      <Input type="number" id="bronze" name="bronze" label="동메달" value={medal.bronze} onChange={onChange} />

      <Button type="submit">추가하기</Button>
      <Button onClick={onUpdate}>수정하기</Button>
    </form>
  );
}

export default Form;
