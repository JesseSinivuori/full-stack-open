import { useState } from "react";

const Button = ({
  text,
  handleClick,
}: {
  text: string;
  handleClick: () => void;
}) => <button onClick={handleClick}>{text}</button>;

const Header = ({ text }: { text: string }) => <h1>{text}</h1>;

const Anecdote = ({
  anecdotes,
  selected,
  votes,
}: {
  anecdotes: string[];
  selected: number;
  votes: number[];
}) => (
  <p>
    {anecdotes[selected]} has {votes[selected]} votes
  </p>
);

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
  const [votes, setVotes] = useState<number[]>(Array(anecdotes.length).fill(0));
  const mostVotes = Math.max(...votes);
  const mostVoted = votes.indexOf(mostVotes);

  const randomNum = () => Number((Math.random() * anecdotes.length).toFixed());

  const handleNextAnecdote = () => {
    let newAnecdote = randomNum();
    while (newAnecdote === selected || newAnecdote === anecdotes.length) {
      newAnecdote = randomNum();
    }
    return setSelected(newAnecdote);
  };

  const handleVote = () => {
    setVotes((prev) => {
      const newVotes = [...prev];
      newVotes[selected] += 1;
      return newVotes;
    });
  };

  return (
    <div>
      <Header text={"Anecdote of the day"} />
      <Button text={"vote"} handleClick={handleVote} />
      <Button text={"next anecdote"} handleClick={handleNextAnecdote} />
      <Anecdote anecdotes={anecdotes} selected={selected} votes={votes} />
      <Header text={"Anecdote with most votes"} />
      <Anecdote anecdotes={anecdotes} selected={mostVoted} votes={votes} />
    </div>
  );
};

export default App;
