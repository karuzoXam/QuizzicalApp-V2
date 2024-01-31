import Answers from './Answers';
import { useEffect, useState } from 'react';

function Questions(props) {
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    function shuffleAnswers() {
      const incorrectAnswers = props.incorrectAnswers;
      const correctAnswer = props.correctAnswer;

      const rdmIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1));
      const answers = [...incorrectAnswers];

      answers.splice(rdmIndex, 0, correctAnswer);

      return answers;
    }
    setAnswers(shuffleAnswers());
  }, [props]);

  function handleAnswerChange(e) {
    setSelectedAnswer(e.target.value);
    console.log(e.target.value);
  }

  const answerEl = answers.map((answer, i) => {
    return (
      <Answers
        key={i}
        answer={answer}
        id={`${props.id}-${i}`}
        handleChange={handleAnswerChange}
        selectedAnswer={selectedAnswer}
      />
    );
  });

  return (
    <div>
      <h1>{props.question}</h1>
      <form>{answerEl}</form>
    </div>
  );
}
export default Questions;
