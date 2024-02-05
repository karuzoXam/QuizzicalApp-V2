# :game_die: QuizzApp
A quiz app that is a solo project from the Scrimba Frontend Career Path. Which requires the skills and technologies I have learned so far. The application uses the Open Trivia Database, from which the data is loaded. The app is not responsive as my main focus was on functionality.

## :hammer_and_wrench: Main Technologies
* `React`
  * useState
  * useEffect
* `Vite`
* `HTML`
  * HTML Entities
* `CSS`

## :dart: Requirements
-  Two screens(start & questions) :heavy_check_mark:
-  Pull 5 questions from the [OTDB API](https://opentdb.com/) :heavy_check_mark:
-  Tally correct answers after "Check answers" is clicked :heavy_check_mark:
-  Styled & polished :heavy_check_mark:

## :gear: Features 
 - **Loading Screen:**  Displays a loading screen during the fetch process to provide users with feedback on the ongoing process.
 - **Error Messages:** Displays error messages when errors occur during data loading to inform users of problems.
 - **User-friendly Interface:** Provides an intuitive and appealing user interface for displaying all questions and answers.
 - **Evaluation of given answers:** Allows review and evaluation of the answers given by the user.
- **Graphical presentation of Results:** Presents the results in a graphical form to show at a glance which questions were answered correctly or incorrectly.
 - **Count for correct Answers:** Displays the number of questions answered correctly to give users feedback on their performance.
 

## :no_entry: Bugs and Issues
 Sometimes the data is not displayed correctly decoded, but in the code itself, it is correctly decoded. I have tried to use a different decoding library, but unfortunately, this has not solved the problem.

## :movie_camera: Demo/Preview
https://github.com/karuzoXam/React-Quizz-App/assets/60605508/485c7caf-ec9b-4978-b037-e918e4a8f281


## :vertical_traffic_light: Running the Project
To run the project in your local environment, follow these steps: 
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/karuzoXam/React-Quizz-App.git
2. **Run** `npm install` or `yarn` in the project directory to install the required dependencies.
3. **Run** `npm run dev` or `yarn dev` to get the project started.
4. **Open** [http://localhost:5173](http://localhost:5173) (or the address shown in your console) in your web browser to view app.
