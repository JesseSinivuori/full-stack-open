import { type Note } from "../main";

const Note = ({ note }: { note: Note }) => {
  return <li>{note.content}</li>;
};

export default Note;
