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
  }, []);

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
      console.log('Bitte beantworten Sie alle Fragen.');
      return;
    }
    setChecked(true);
  }

  function handleCheckAnswers() {
    if (!selectedAnswers.length === 5) {
      console.log();
    }
    checkAnswers();
  }

  function handleStartBtnClick() {
    setPage('question');
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const questionEl = shuffledData.map((questionObj, i) => (
    <Questions
      key={i}
      question={questionObj}
      selectedAnswer={selectedAnswers[questionObj.id]}
      onAnswerChange={handleAnswerChange}
      checked={checked}
      correctAnswer={questionObj.correct_answer}
    />
  ));

  return (
    <div>
      {page === 'start' && <Start handleStartClick={handleStartBtnClick} />}
      {page === 'question' && questionEl}
      {page === 'question' && <button onClick={handleCheckAnswers}>Check answers</button>}
    </div>
  );
}

export default App;
