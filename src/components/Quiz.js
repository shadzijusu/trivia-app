import { nanoid } from "nanoid";
import { useState, useMemo } from "react";
import classes from "../modules/Quiz.module.css";
import Question from "./Question";
function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [points, setPoints] = useState(0);
  const [checking, setChecking] = useState(false);

  function checkAnswers() {
    setChecking(true);
    var object = JSON.parse(localStorage.getItem("chosenAnswers"));
    var filteredArray = object.filter((answer) => answer !== "");
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correct_answer === filteredArray[i]) {
        setPoints((prevValue) => prevValue + 1);
      }
    }
    localStorage.clear()

  }
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      const data = await response.json();
      setQuestions(data.results);
   
    } catch (error) {
      console.log("Failed to fetch from API", error);
    }
  };
  useMemo(() => {
    fetchData();
  }, []);
  const handleClick = () => {
    setChecking(false)
    fetchData();
    localStorage.clear();

  };

  return (
    <div className={classes.main}>
        {   console.log(questions)}
      <div className={classes.questions}>
        {questions.map((question) => {
          let odgovori = [];
          for (let i = 0; i < question.incorrect_answers.length; i++)
            odgovori.push({
              answer: question.incorrect_answers[i],
              id: nanoid(),
              isChosen: false,
            });
          odgovori.push({ answer: question.correct_answer, id: nanoid() });
          for (let i = odgovori.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [odgovori[i], odgovori[j]] = [odgovori[j], odgovori[i]];
        }
          return (
            <Question
              key={nanoid()}
              question={question.question}
              answers={odgovori}
              data={questions}
            ></Question>
          );
        })}
      </div>
      {checking === true ? (
        <>
          <h1 className={classes.score}>
            You scored {points}/5 correct answers
          </h1>
          <button className={classes.button} onClick={handleClick}>
            Play Again
          </button>
        </>
      ) : (
        <button className={classes.button} onClick={checkAnswers}>
          Check Answers
        </button>
      )}
    </div>
  );
}
export default Quiz;
