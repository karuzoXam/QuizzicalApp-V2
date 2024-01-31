function Answers(props) {
  return (
    <div>
      <form>
        <input
          type="radio"
          id="unique"
          name="allSame"
          value={props.answer}
          checked={false}
          onChange={(e) => props.handleChange(e)}
        ></input>
        <label htmlFor="1">{props.answer}</label>
      </form>
    </div>
  );
}

export default Answers;
