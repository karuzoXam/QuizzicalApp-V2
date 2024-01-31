function Start(props) {
  return (
    <div>
      <h1 className="start_header">Quizzical</h1>
      <p className="start_description">Some description if needed</p>
      <button className="start_btn" onClick={props.handleStartClick}>
        Start quiz
      </button>
    </div>
  );
}

export default Start;
