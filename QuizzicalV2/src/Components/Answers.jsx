import React from 'react';

function Answer({ id, answer, handleChange, selectedAnswer }) {
  return (
    <div>
      <input
        type="radio"
        id={id}
        name="option"
        value={answer}
        checked={selectedAnswer === answer}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={id}>{answer}</label>
    </div>
  );
}

export default Answer;
