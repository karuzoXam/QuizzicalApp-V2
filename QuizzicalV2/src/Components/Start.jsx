function Start(props) {
  return (
    <div className="start_container">
      <h1 className="start_header">Quizzical</h1>
      <p className="start_description">Click Start quiz to start the game!</p>
      <button className="start_btn" onClick={props.handleStartClick}>
        Start quiz
      </button>
    </div>
  );
}

export default Start;
