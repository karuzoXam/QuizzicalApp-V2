import React from 'react';

function Answer({ id, answer, handleChange, selectedAnswer, checked, correctAnswer, isDisabled }) {
  let className = 'label';

  if (checked) {
    if (answer === correctAnswer) {
      className = 'correct';
    } else if (selectedAnswer === answer) {
      className = 'incorrect';
    }
  }

  if (isDisabled && answer !== correctAnswer) {
    className += ' disabled';
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
      <label className={className} htmlFor={id}>
        {answer}
      </label>
    </div>
  );
}

export default Answer;
