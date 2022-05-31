import classes from "../modules/Question.module.css";
import { useState, useEffect } from "react";
import Answer from "./Answer";
function Question(props) {
  const [answers, setAnswers] = useState(props.answers);
  const [chosenAnswer, setChosenAnswer] = useState("");

  function select(id) {
    setAnswers((oldAnswers) =>
      oldAnswers.map((answer) => {
        if (answer.id === id) {
          setChosenAnswer(answer.answer);
        }
        return answer.id === id
          ? { ...answer, isChosen: !answer.isChosen }
          : answer;
      })
    );
  }
  useEffect(() => {
    var odgovori = JSON.parse(localStorage.getItem("chosenAnswers")) || []
    odgovori.push(chosenAnswer)
    localStorage.setItem("chosenAnswers", JSON.stringify(odgovori))
  }, [chosenAnswer]);
  return (
    <div className={classes.main}>
      <h1 className={classes.question}>{props.question}</h1>
      <div className={classes.answers}>
        {answers.map((answer) => {
          return (
            <Answer
              key={answer.id}
              className={classes.button}
              chosen={answer.isChosen}
              select={() => select(answer.id)}
              data={answer}
            >
              {answer.answer}
            </Answer>
          );
        })}
      </div>
    </div>
  );
}
export default Question;
