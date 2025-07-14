import useOlympicStore from '../../zustand/olympicStore';
import Button from './Button';
import Input from './Input';

function Form() {
  const { medal, countries, onCreated, onChanged, onUpdated } = useOlympicStore((state) => state);

  const onChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'country' ? value : Number(value);
    onChanged({ [name]: parsedValue });
  };

  const onCreate = (e) => {
    e.preventDefault();
    if (!medal.country) return alert('국가명을 입력하세요.');
    if (countries.find((e) => e.country === medal.country)) return alert('이미 등록된 국가입니다.');
    if (medal.gold < 0 || medal.silver < 0 || medal.bronze < 0) return alert('메달 수는 0 이상이어야 합니다.');

    onCreated();
    alert('입력 완료');
  };

  const onUpdate = (e) => {
    e.preventDefault();
    if (!medal.country) return alert('수정할 국가명을 입력하세요.');
    if (!countries.find((e) => e.country === medal.country)) return alert('등록되지 않은 국가입니다.');
    if (medal.gold < 0 || medal.silver < 0 || medal.bronze < 0) return alert('메달 수는 0 이상이어야 합니다.');

    onUpdated();
    alert('수정 완료');
  };

  return (
    <form onSubmit={onCreate}>
      <Input id="country" name="country" label="나라" value={medal.country} onChange={onChange} />
      <Input type="number" id="gold" name="gold" label="금메달" value={medal.gold} onChange={onChange} />
      <Input type="number" id="silver" name="silver" label="은메달" value={medal.silver} onChange={onChange} />
      <Input type="number" id="bronze" name="bronze" label="동메달" value={medal.bronze} onChange={onChange} />

      <div className="button">
        <Button type="submit">추가하기</Button>
        <Button onClick={onUpdate}>수정하기</Button>
      </div>
    </form>
  );
}

export default Form;
