import Header from "./Header";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

const PersonForm = ({
  handleSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  newName: string;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newNumber: string;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <form onSubmit={handleSubmit}>
    <Header text={"Add a new"} />
    <Input value={newName} handleChange={handleNameChange} text={"name: "} />
    <Input
      value={newNumber}
      handleChange={handleNumberChange}
      text={"number: "}
    />
    <SubmitButton text={"add"} />
  </form>
);

export default PersonForm;
