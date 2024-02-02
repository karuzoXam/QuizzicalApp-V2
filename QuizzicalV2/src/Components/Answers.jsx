import React from 'react';

function Answer({ id, answer, handleChange, selectedAnswer, checked, correctAnswer, isDisabled }) {
  let color = 'black';

  if (checked) {
    if (answer === correctAnswer) {
      color = 'green';
    } else if (selectedAnswer === answer) {
      color = 'red';
    }
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
        className="radio"
      />
      <label htmlFor={id} style={{ color: color }} className="label">
        {answer}
      </label>
    </div>
  );
}

export default Answer;
