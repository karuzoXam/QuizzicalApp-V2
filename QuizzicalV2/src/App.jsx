import Start from './Components/Start';
import Questions from './Components/Questions';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  async function fetchData() {
    try {
      const res = await fetch('https://opentdb.com/api.php?amount=5');
      if (!res.ok) {
        throw new Error('Failed to fetch!');
      }
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <div>
      <Start />
      <Questions />
    </div>
  );
}

export default App;
