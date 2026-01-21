import StatisticLine from "./StatisticLine";

const Statistics = ({
  good,
  bad,
  neutral,
  total,
  average,
  positivePercentage,
}) => {
  return total === 0 ? (
    <p>No feedback given</p>
  ) : (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="All" value={total} />
          <StatisticLine text="Average" value={average.toFixed(2)} />
          <StatisticLine
            text="Positive"
            value={positivePercentage.toFixed(2)}
          />
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
