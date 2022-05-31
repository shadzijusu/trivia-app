import classes from "../modules/Question.module.css";
import { useState } from "react";

function Answer(props) {
  
  const style = {
    backgroundColor: props.chosen === true ? "#D6DBF5" : "white"
  };
  return (
    <button className={classes.button} onClick={props.select} style={style}>
      {props.data.answer}
    </button>
  );
}
export default Answer;
