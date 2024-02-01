import React from 'react';
import Answers from './Answers';

function Questions({ question, selectedAnswer, onAnswerChange }) {
  console.log('Decoded Question:', question.question);
  console.log('Decoded Incorrect Answers:', question.incorrect_answers);
  console.log('Decoded Correct Answer:', question.correct_answer);

  const handleAnswerChange = (answer) => {
    onAnswerChange(question.id, answer);
  };

  const answerElements = question.answers.map((answer, i) => (
    <Answers
      key={i}
      id={`${question.id}-${i}`}
      answer={answer}
      handleChange={() => handleAnswerChange(answer)}
      selectedAnswer={selectedAnswer}
    />
  ));

  return (
    <div>
      <h1>{question.question}</h1>
      <form>{answerElements}</form>
    </div>
  );
}

export default Questions;
