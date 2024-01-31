function Answers(props) {
  return (
    <div>
      <form>
        <input
          type="radio"
          id="unique"
          name="allSame"
          value="value"
          checked={false}
          onChange={() => console.log(1)}
        ></input>
        <label htmlFor="1">{props.answer}</label>
      </form>
    </div>
  );
}

export default Answers;
