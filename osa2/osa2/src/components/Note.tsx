import { type TypeNote } from "../App";

const Note = ({ note }: { note: TypeNote }) => {
  return <li>{note.content}</li>;
};

export default Note;
