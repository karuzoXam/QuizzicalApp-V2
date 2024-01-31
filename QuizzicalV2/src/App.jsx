import Start from './Components/Start';
import Questions from './Components/Questions';
import { useState, useEffect } from 'react';
import fetchData from './fetchData';

function App() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const res = await fetchData();
        setData(res);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };

    fetchAndSetData();
  }, []);

  console.log(data);

  function handleStartBtnClick() {
    console.log(1);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Start handleStartClick={handleStartBtnClick} />
      <Questions />
    </div>
  );
}

export default App;
