async function fetchData() {
  try {
    const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
    if (!res.ok) {
      const errorMessage = `Failed to fetch! Error:(${res.status})`;
      if (res.status === 429) {
        throw new Error(errorMessage + ` Too Many Requests`);
      } else {
        throw new Error(errorMessage);
      }
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
}

export default fetchData;
