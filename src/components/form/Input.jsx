function Input({ type = 'text', id, onChange, label, value, ...rest }) {
  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} name={id} placeholder={label} value={value} onChange={onChange} {...rest} />
    </fieldset>
  );
}

export default Input;
