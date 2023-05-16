import { useState } from "react";

const Button = ({
  text,
  handleClick,
}: {
  text: string;
  handleClick: () => void;
}) => <button onClick={handleClick}>{text}</button>;

const Anecdotes = ({
  anecdotes,
  selected,
}: {
  anecdotes: string[];
  selected: number;
}) => <div>{anecdotes[selected]}</div>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  const randomNum = () => Number((Math.random() * anecdotes.length).toFixed());

  const handleNextAnecdote = () => {
    let newAnecdote = randomNum();
    while (newAnecdote === selected || newAnecdote === anecdotes.length) {
      newAnecdote = randomNum();
    }
    return setSelected(newAnecdote);
  };

  return (
    <div>
      <Button text={"next anecdote"} handleClick={handleNextAnecdote} />
      <Anecdotes anecdotes={anecdotes} selected={selected} />
    </div>
  );
};

export default App;
