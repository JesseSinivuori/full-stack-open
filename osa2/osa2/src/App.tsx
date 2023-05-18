import Note from "./components/Note";
import { Notes } from "./main";

const App = ({ notes }: { notes: Notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default App;
