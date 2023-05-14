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

  return (
    <>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
    </>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(1);
  const [neutral, setNeutral] = useState(2);
  const [bad, setBad] = useState(3);

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
