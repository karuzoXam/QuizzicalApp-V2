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

  // console.log(data);

  function extractRequiredData() {
    if (!data) return;

    const extractedData = data.results.map((dataObj) => {
      const question = decode(dataObj.question);
      const correct_answer = decode(dataObj.correct_answer);
      const incorrect_answers = dataObj.incorrect_answers.map((answer) => decode(answer));
      const id = uuidv4();

      return { id, question, correct_answer, incorrect_answers };
    });
    return extractedData;
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

  const questionData = extractRequiredData();
  const questionEl = questionData.map((questionObj) => (
    <Questions
      key={questionObj.id}
      id={questionObj.id}
      question={questionObj.question}
      correctAnswer={questionObj.correct_answer}
      incorrectAnswers={questionObj.incorrect_answers}
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
