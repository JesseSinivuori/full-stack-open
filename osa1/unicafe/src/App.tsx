import { useState } from "react";

const Header = ({ text }: { text: string }) => <h1>{text}</h1>;

const Button = ({
  handleClick,
  text,
}: {
  handleClick: () => void;
  text: string;
}) => <button onClick={handleClick}>{text}</button>;

const Statistics = (props: { good: number; neutral: number; bad: number }) => {
  const { good, neutral, bad } = props;
  const all = good + neutral + bad;
  const average = (good + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;

  if (all === 0) return <p>no feedback given</p>;

  return (
    <>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {all}</p>
      <p>average: {average}</p>
      <p>positive: {positive} %</p>
    </>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <Header text={"give feedback"} />
      <Button handleClick={() => setGood((prev) => prev + 1)} text={"good"} />
      <Button
        handleClick={() => setNeutral((prev) => prev + 1)}
        text={"neutral"}
      />
      <Button handleClick={() => setBad((prev) => prev + 1)} text={"bad"} />
      <Header text={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
