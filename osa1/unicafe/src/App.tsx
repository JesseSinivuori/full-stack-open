import { useState } from "react";

const Header = ({ text }: { text: string }) => <h1>{text}</h1>;

const Button = ({
  handleClick,
  text,
}: {
  handleClick: () => void;
  text: string;
}) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({ text, value }: { text: string; value: string }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({
  good,
  neutral,
  bad,
}: {
  good: number;
  neutral: number;
  bad: number;
}) => {
  const all = good + neutral + bad;
  const average = (good + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;

  if (all === 0) return <p>no feedback given</p>;

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good.toString()} />
        <StatisticLine text="neutral" value={neutral.toString()} />
        <StatisticLine text="bad" value={bad.toString()} />
        <StatisticLine text="all" value={all.toString()} />
        <StatisticLine text="average" value={average.toFixed(1).toString()} />
        <StatisticLine
          text="positive"
          value={`${positive.toFixed(1).toString()} %`}
        />
      </tbody>
    </table>
  );
};

const App = () => {
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
