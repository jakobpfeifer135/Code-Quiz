var timeLeft = 60; // 60 seconds (1 minute)
var score = 0; // Initialize the score to 0
var startButton = document.getElementById("startButton");
var quizContainer = document.getElementById("quizContainer");
var timerElement = document.getElementById("timerValue");
var quizScoreElement = document.getElementById("quizScore");

// Questions, Choices, and Answers
var questions = [
  {
    question: "In magic the gathering how many colors are there",
    choices: ["4", "5", "3", "6"],
    answer: "5",
  },
  {
    question: "In magic the gathering when can you cast sorceries",
    choices: [
      "on your turn and your opponents turn",
      "on only your opponents turn",
      "on only your turn",
      "only at the beginning of your turn",
    ],
    answer: "on only your turn",
  },
  {
    question:
      "In magic the gathering you lose when you take how much commander damage",
    choices: ["20", "21", "15", "10"],
    answer: "21",
  },
  {
    question: "In magic the gathering in what order does your turn begin",
    choices: [
      "draw, upkeep, un-tap",
      "upkeep, draw, un-tap",
      "upkeep, un-tap, draw",
      "un-tap, upkeep, draw",
    ],
    answer: "un-tap, upkeep, draw",
  },
  {
    question:
      "What color in magic the gathering is most known for life-gain?",
    choices: ["blue", "red", "white", "green"],
    answer: "white",
  },
];

var currentQuestionIndex = 0; // Initialize currentQuestionIndex

// Event listener for the start button
startButton.addEventListener("click", function () {
  startButton.disabled = true;
  quizContainer.style.display = "block"; // Show the quiz container
  startTimer();
  displayQuestion(); // Display the first question
});

// Function to start the timer
function startTimer() {
    var timer = setInterval(function () {
      timeLeft--;
      timerElement.textContent = timeLeft;
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        endQuiz();
      }
    }, 1000);
  }
  
  // Function to display the current question and choices
  function displayQuestion() {
    var questionElement = document.getElementById("question");
    var choicesList = document.getElementById("choices");
  
    var currentQuestion = questions[currentQuestionIndex];
  
    // Display the question
    questionElement.textContent = currentQuestion.question;
  
    // Clear previous choices
    choicesList.innerHTML = "";
  
    // Display answer choices
    currentQuestion.choices.forEach(function (choice, index) {
      var listItem = document.createElement("li");
      listItem.textContent = choice;
      listItem.addEventListener("click", function () {
        // Check if the selected choice is correct
        if (choice === currentQuestion.answer) {
          // Increment score if correct
          score++;
        } else {
          // Deduct 10 seconds for incorrect answers
          timeLeft -= 10;
        }
  
        // Move to the next question
        currentQuestionIndex++;
  
    // Check if there are more questions
    if (currentQuestionIndex < questions.length) {
        displayQuestion(); // Display the next question
      } else {
        endQuiz();
      }
    });

    choicesList.appendChild(listItem);
  });
}
// Function to end the quiz
function endQuiz() {
    quizContainer.style.display = "none"; // Hide the quiz container
    quizScoreElement.textContent = "Your Score: " + score;
    storeHighScore();
  }
  
  // Function to store high scores in local storage
  function storeHighScore() {
    var initials = prompt("Enter your initials (3 characters):");
    if (initials && initials.length === 3) {
      var scores = JSON.parse(localStorage.getItem("scores")) || [];
      scores.push({ score: timeLeft, initials: initials });
      scores.sort(function (a, b) {
        return b.score - a.score;
      });
      localStorage.setItem("scores", JSON.stringify(scores));
      displayHighScores();
    } else {
      alert("Please enter 3 initials.");
    }
  }
  
  // Function to display high scores from local storage
  function displayHighScores() {
    var highScoresList = document.getElementById("highScoresList");
    highScoresList.innerHTML = "";
  
    var scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.forEach(function (scoreData, index) {
      var listItem = document.createElement("li");
      listItem.textContent = index + 1 + ". " + scoreData.initials + ": " + scoreData.score;
      highScoresList.appendChild(listItem);
    });
  }
  