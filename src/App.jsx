import { useEffect, useState } from "react";
import "./App.css";
import Question from "./components/Question";
import Start from "./components/Start";
import { moneyPyramid } from "./data/moneyPyramid";

function App() {
  const [username, setUsername] = useState(null);
  const [questionOrder, setQuestionOrder] = useState(1);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [earnedMoney, setEarnedMoney] = useState("$ 0");

  useEffect(() => {
    questionOrder > 1 &&
      setEarnedMoney(
        moneyPyramid.find((m) => m.id === questionOrder - 1).amount
      );
  }, [questionOrder]);

  return (
    <div className="app">
      {username ? (
        <>
          <div className="main-field">
            {isGameFinished ? (
              <div className="finish-field">
                <div className="finished-text">You just earned {earnedMoney}</div>
                <button className="refresh-button" onClick={() => window.location.reload()}>Refresh</button>;
              </div>
            ) : (
              <Question
                questionOrder={questionOrder}
                setQuestionOrder={setQuestionOrder}
                setIsGameFinished={setIsGameFinished}
              />
            )}
          </div>
          <div className="pyramid-field">
            <ul className="progress-list">
              {moneyPyramid.map((item) => (
                <li
                  key={item.id}
                  className={
                    questionOrder === item.id
                      ? "progress-item active"
                      : "progress-item"
                  }
                >
                  <span className="progress-item-number">{item.id}</span>
                  <span className="progress-item-amount">{item.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
