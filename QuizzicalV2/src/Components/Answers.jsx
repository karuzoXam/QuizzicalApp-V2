import React from 'react';

function Answer({ id, answer, handleChange, selectedAnswer, checked, correctAnswer, isDisabled }) {
  // const color = ' #293264';
  // let backgroundColor = '#fff';
  let className = 'label';

  if (checked) {
    if (answer === correctAnswer) {
      // backgroundColor = '#94D7A2';
      className = 'correct';
    } else if (selectedAnswer === answer) {
      // backgroundColor = '#F8BCBC';
      className = 'incorrect';
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
      />
      <label className={className} htmlFor={id}>
        {answer}
      </label>
    </div>
  );
}

export default Answer;
