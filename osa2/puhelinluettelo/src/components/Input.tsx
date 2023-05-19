export default function Input({
  value,
  handleChange,
  text,
}: {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
}) {
  return (
    <div>
      {text} <input value={value} onChange={handleChange} />
    </div>
  );
}
