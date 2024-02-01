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
      const incorrect_answers = dataObj.incorrect_answers.map((answer) => decode(answer));

      return {
        id: uuidv4(),
        question: decode(dataObj.question),
        correct_answer: decode(dataObj.correct_answer),
        incorrect_answers: incorrect_answers,
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

  function handleStartBtnClick() {
    setPage('question');
  }

  console.log(selectedAnswers);
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
    />
  ));

  return (
    <div>
      {page === 'start' && <Start handleStartClick={handleStartBtnClick} />}
      {page === 'question' && questionEl}
    </div>
  );
}

export default App;
