import Answers from './Answers';
import { useEffct, useState } from 'react';

function Questions(props) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  function shuffleAnswers() {
    const incorrectAnswers = props.incorrectAnswers;
    const correctAnswer = props.correctAnswer;

    const rdmIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1));
    const answers = [...incorrectAnswers];

    answers.splice(rdmIndex, 0, correctAnswer);

    return answers;
  }

  // function handleAnswerChange(e) {
  //   setSelectedAnswer(e.target.value);
  //   console.log(selectedAnswer);
  // }

  const answers = shuffleAnswers();
  const answerEl = answers.map((answer, i) => <Answers key={i} answer={answer} />);

  return (
    <div>
      <h1>{props.question}</h1>
      {answerEl}
    </div>
  );
}
export default Questions;
