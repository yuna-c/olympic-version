import Button from './Button';
import Input from './Input';

function Form({ medal, onCreate, onChange, onUpdate }) {
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
