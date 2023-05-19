import { type TypeNote } from "../App";

const Note = ({
  note,
  toggleImportance,
}: {
  note: TypeNote;
  toggleImportance: () => void;
}) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
