import React from 'react';
import Answers from './Answers';

function Questions({
  question,
  selectedAnswer,
  onAnswerChange,
  checked,
  correctAnswer,
  isDisabled,
}) {
  const handleAnswerChange = (answer) => {
    onAnswerChange(question.id, answer);
  };

  const answerElements = question.answers.map((answer, i) => (
    <Answers
      key={`${question.id}-${i}`}
      id={`${question.id}-${i}`}
      answer={answer}
      handleChange={() => handleAnswerChange(answer)}
      selectedAnswer={selectedAnswer}
      checked={checked}
      correctAnswer={correctAnswer}
      isDisabled={isDisabled}
    />
  ));

  return (
    <div className="question_container">
      <h1 className="question_header">{question.question}</h1>
      <form className="answer_form">{answerElements}</form>
    </div>
  );
}

export default Questions;
