async function fetchData() {
  try {
    const res = await fetch('https://opentdb.com/api.php?amount=5');
    if (!res.ok) {
      throw new Error(`Failed to fetch! Error: ${res.status}  `);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
}

export default fetchData;
