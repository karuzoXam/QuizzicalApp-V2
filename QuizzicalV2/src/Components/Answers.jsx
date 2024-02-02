import React from 'react';

function Answer({ id, answer, handleChange, selectedAnswer, checked, correctAnswer, isDisabled }) {
  const isCorrect = answer === correctAnswer;

  let color;
  if (checked) {
    if (isCorrect) {
      color = 'green';
    } else if (selectedAnswer === answer) {
      color = 'red';
    } else {
      color = 'black';
    }
  } else {
    color = 'black';
  }

  return (
    <div>
      <input
        type="radio"
        id={id}
        name="option"
        value={answer}
        checked={selectedAnswer === answer}
        onChange={(e) => handleChange(e)}
        disabled={isDisabled}
      />
      <label htmlFor={id} style={{ color: color }}>
        {answer}
      </label>
    </div>
  );
}

export default Answer;
