import { useState, useEffect } from 'react';
import { decode } from 'html-entities';
import Start from './Components/Start';
import Questions from './Components/Questions';
import fetchData from './fetchData';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState('start');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [shuffledData, setShuffledData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [playAgain, setPlayAgain] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const res = await fetchData();
        setData(res);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
      setIsLoading(false);
    };

    fetchAndSetData();
  }, [playAgain]);

  useEffect(() => {
    if (data && data.results) {
      const questionData = extractRequiredData();
      setShuffledData(questionData);
    }
  }, [data]);

  function extractRequiredData() {
    if (!data?.results) return [];

    const extractedData = data.results.map((dataObj) => {
      const incorrectAnswers = dataObj.incorrect_answers.map((answer) => decode(answer));

      return {
        id: uuidv4(),
        question: decode(dataObj.question),
        correct_answer: decode(dataObj.correct_answer),
        incorrect_answers: incorrectAnswers,
        answers: shuffleAnswers(dataObj),
      };
    });

    return extractedData;
  }

  function shuffleAnswers(question) {
    const incorrectAnswers = question.incorrect_answers;
    const correctAnswer = question.correct_answer;

    const shuffledAnswers = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);
    return shuffledAnswers;
  }

  function handleAnswerChange(questionId, answer) {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: answer,
    }));
  }

  function checkAnswers() {
    if (Object.keys(selectedAnswers).length !== shuffledData.length) {
      displayMessage();

      return;
    }

    let correctCount = 0;
    for (let key in selectedAnswers) {
      const givenAnswer = selectedAnswers[key];
      const questionObj = shuffledData.find((obj) => obj.id === key);

      if (questionObj && questionObj.correct_answer === givenAnswer) {
        correctCount++;
      }
    }
    console.log(`You answered ${correctCount}/${shuffledData.length} correct!`);
    setCorrectCount(correctCount);
    setChecked(true);
  }
  function handleStartBtnClick() {
    setPage('question');
  }

  function handleButtonClick() {
    if (checked) {
      handlePlayAgain();
    } else {
      handleCheckAnswers();
    }
  }

  function handleCheckAnswers() {
    setIsDisabled(true);
    checkAnswers();
  }

  function displayMessage() {
    return 'Please answer all Questions';
  }

  function handlePlayAgain() {
    console.log('play again');
    // Reset all states
    setError(null);
    setData(null);
    setIsLoading(true);
    setSelectedAnswers({});
    setShuffledData([]);
    setChecked(false);
    setCorrectCount(0);
    setIsDisabled(false);
    setPlayAgain((prevPlayAgain) => !prevPlayAgain);
  }

  const questionEl = shuffledData.map((questionObj, i) => (
    <Questions
      key={i}
      question={questionObj}
      selectedAnswer={selectedAnswers[questionObj.id]}
      onAnswerChange={handleAnswerChange}
      checked={checked}
      correctAnswer={questionObj.correct_answer}
      isDisabled={isDisabled}
    />
  ));

  function renderQuestionPage() {
    return (
      <div>
        {questionEl}
        <p>
          {checked
            ? `You answered ${correctCount}/${shuffledData.length} correct!`
            : displayMessage()}
        </p>
        <button onClick={handleButtonClick}>{checked ? 'Play again' : 'Check answers'}</button>
      </div>
    );
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!isLoading && !error && (
        <div>
          {page === 'start' && <Start handleStartClick={handleStartBtnClick} />}
          {page === 'question' && renderQuestionPage()}
        </div>
      )}
    </div>
  );
}

export default App;
