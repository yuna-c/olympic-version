import Button from './Button';
import Input from './Input';
import { useDispatch, useSelector } from 'react-redux';
import { createMedal, setMedal, updateMedal } from '../../redux/slices/OlympicSlice';
import { useEffect, useRef } from 'react';

function Form() {
  const dispatch = useDispatch();
  const medal = useSelector((state) => state.olympic.medal);
  const countries = useSelector((state) => state.olympic.countries);
  const countryRef = useRef(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(setMedal({ [name]: name === 'country' ? String(value) : Number(value) }));
  };

  const onCreate = (e) => {
    e.preventDefault();

    if (!medal.country.trim()) {
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

    dispatch(createMedal());
  };

  const onUpdate = (e) => {
    e.preventDefault();

    if (!medal.country.trim()) {
      alert('수정할 국가명을 입력하세요.');
      return;
    }

    dispatch(updateMedal());
  };

  useEffect(() => {
    countryRef.current?.focus();
  }, []);

  return (
    <form onSubmit={onCreate}>
      <Input id="country" name="country" label="나라" value={medal.country} onChange={onChange} ref={countryRef} />
      <Input type="number" id="gold" name="gold" label="금메달" value={medal.gold} onChange={onChange} />
      <Input type="number" id="silver" name="silver" label="은메달" value={medal.silver} onChange={onChange} />
      <Input type="number" id="bronze" name="bronze" label="동메달" value={medal.bronze} onChange={onChange} />

      <Button type="submit">추가하기</Button>
      <Button onClick={onUpdate}>수정하기</Button>
    </form>
  );
}

export default Form;
