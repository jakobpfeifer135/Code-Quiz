var score = 0;
var timeLeft = 60; // 1 minute
var currentQuestion = 1;
var answeredQuestions = {};


var questions = [
  {
    questionTitle: "In magic the gathering how many colors are there",
    choices: ["4", "5", "3", "6"],
    answer: "5",
  },
  {
    questionTitle: "in magic the gathering when can you cast sorceries",
    choices: [
      "on your turn and your opponents turn",
      "on only your opponents turn",
      "on only your turn",
      "only at the beginning of your turn",
    ],
    answer: "on only your turn",
  },
  {
    questionTitle:
      "in magic the gathering you lose when you take how much commander damage",
    choices: ["20", "21", "15", "10"],
    answer: "21",
  },
  {
    questionTitle: "in magic the gathering in what order does your turn begin",
    choices: [
      "draw, upkeep, un-tap",
      "upkeep, draw, un-tap",
      "upkeep, un-tap, draw",
      "un-tap, upkeep, draw",
    ],
    answer: "un-tap, upkeep, draw",
  },
  {
    questionTitle:
      "what color in magic the gathering is most known for life-gain?",
    choices: ["blue", "red", "white", "green"],
    answer: "white",
  },
];

function updateTimer() {
  const timerElement = document.getElementById("quizTimer");
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  //This line of code is used to update the text content of an HTML element with the id "quizTimer" to display the remaining time in minutes and seconds.
  timerElement.textContent = `Time Left: ${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
  //this allows the quiz to end once the time hits 0
  if (timeLeft === 0) {
    clearInterval(timerInterval);
    endQuiz();
  } else {
    timeLeft--;
  }
}
// this should return an alert if they try to answer the question more than once

function submitAnswer(questionId) {
  if (answeredQuestions[questionId]) {
    alert("You have already answered this question.");
    return;
  }
  // selecting the css element and storing the users selected answer
  // it selects the user's chosen answer to the current question by looking for the checked input element with a specific name attribute
  const selectedAnswer = document.querySelector(
    `input[name="${questionId}"]:checked`
  );

  

    if (correctAnswers[questionId].includes(selectedAnswer.value)) {
      score++;
    } else {
      timeLeft -= 15; // Deduct 15 seconds for incorrect answers
    }

    answeredQuestions[questionId] = true;
    //sets up a timer to execute this code after a 2 second delay
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion <= 2) {
        const nextQuestionId = `question${currentQuestion}`;
        document.getElementById(questionId).style.display = "none";
        document.getElementById(nextQuestionId).style.display = "block";
      } else {
        endQuiz();
      }
    }, 2000); // Display feedback for 2 seconds before moving to the next question
  }
  

//function to end the quiz once questions have been answered
function endQuiz() {
  clearInterval(timerInterval);

  // Display the final score
  const quizScore = document.getElementById("quizScore");
  quizScore.textContent = `Your Score: ${score}`;

  // Hide the remaining questions
//   document.getElementById("question1").style.display = "none";
//   document.getElementById("question2").style.display = "none";
 }

const timerInterval = setInterval(updateTimer, 1000);

// var questions = {
// question1 : "In magic the gathering how many colors are their",
// question2 : "in magic the gathering when can you cast sorceries",
// question3 : "in magic the gathering you lose when you take how much commander damage",
// question4 : "in magic the gathering in what order does your turn begin",
// question5 : "what color in magic the gathering is most known for life-gain?"

// }

// var correctAnswers = {
//    question1: "5",
//    question2: "on only your turn",
//    question3: "21",
//    question4: "un-tap, upkeep, draw",
//    question5: "white"

// }

// var firstQuestion = {
//  question1Option1 : "4",
//  question1Option2 : "5",
//  question1Option3 : "3",
//  question1Option4 : "6"
// }

// var secondQuestion = {
//  "on your turn and your opponents turn",
//  "on only your opponents turn",
//  "on only your turn",
//  "only at the beginning of your turn",

// }

// var thirdQuestion = {

// }

// var fourthQuestion = {

// }

// var fifthQuestion = {

// }
