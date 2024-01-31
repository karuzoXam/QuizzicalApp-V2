function Questions(props) {
  function shuffleAnswers() {
    const incorrectAnswers = props.incorrectAnswers;
    const correctAnswer = props.correctAnswer;

    const rdmIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1));
    const answers = [...incorrectAnswers];

    answers.splice(rdmIndex, 0, correctAnswer);
    return answers;
  }
  shuffleAnswers();

  function createNewQuestionObj() {
    const newQuestionObj = {
      ...props,
      shuffledAnswers: shuffleAnswers(),
    };
    console.log(newQuestionObj);
    return newQuestionObj;
  }

  createNewQuestionObj();

  return (
    <div>
      <h1>question</h1>
      <form>
        <input type="radio" id="1"></input>
        <label htmlFor="1">Label</label>
      </form>
    </div>
  );
}
export default Questions;
