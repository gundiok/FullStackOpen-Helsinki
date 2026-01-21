import React, { useState } from "react";
import Statistics from "./Statistics";
import Button from "./Button";

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const total = good + bad + neutral;
  const score = good - bad;
  const average = total === 0 ? 0 : score / total;
  const positivePercentage = total === 0 ? 0 : (good / total) * 100;

  return (
    <div>
      <h1>Your Feedback</h1>
      <Button text="Good" onClick={() => setGood((p) => p + 1)} />
      <Button text="Bad" onClick={() => setBad((p) => p + 1)} />
      <Button text="Neutral" onClick={() => setNeutral((p) => p + 1)} />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
        average={average}
        positivePercentage={positivePercentage}
      />
    </div>
  );
};

export default App;
