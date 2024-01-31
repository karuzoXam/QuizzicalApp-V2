function Answers(props) {
  return (
    <div>
      <input
        type="radio"
        id={props.id}
        name="option"
        value={props.answer}
        checked={props.selectedAnswer === props.answer}
        onChange={(e) => props.handleChange(e)}
      ></input>
      <label htmlFor={props.id}>{props.answer}</label>
    </div>
  );
}

export default Answers;
