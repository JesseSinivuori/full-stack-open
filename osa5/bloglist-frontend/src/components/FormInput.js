export default function FormInput({ text, value, onChange }) {
  return (
    <div>
      {text}
      <input type="text" value={value} name={text} onChange={onChange} />
    </div>
  );
}
