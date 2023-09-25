var score = 0;
var timeLeft = 5; // 1 minute
var currentQuestion = 0;
var answeredQuestions = {};
var startButton = document.querySelector(".start-button")
var timerElement = document.querySelector(".timer")
var questions = [
  {
    question: "In magic the gathering how many colors are there",
    choices: ["4", "5", "3", "6"],
    answer: "5",
  },
  {
    question: "in magic the gathering when can you cast sorceries",
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
      "in magic the gathering you lose when you take how much commander damage",
    choices: ["20", "21", "15", "10"],
    answer: "21",
  },
  {
    question: "in magic the gathering in what order does your turn begin",
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
      "what color in magic the gathering is most known for life-gain?",
    choices: ["blue", "red", "white", "green"],
    answer: "white",
  },
];
var body = document.body;
var endQuizTagName = document.createElement("h4");
endQuizTagName.textContent = "Game Over"
var isQuestion5Answered = false;


//TODO make an if statement that says if choice === !answer deduct 10 from time-left until time =0
function pointDeduct (){
    if (choice !== answer) {
        timeLeft -= 10;
    }
}




//TODO make a if statement that says once last question is answered take the time left as a score and put it in local storage
function lastQuestion() {
    // Check if it's the last question
    if (isQuestion5Answered) {
        // Store the remaining time (score) in local storage
        localStorage.setItem('score', timeLeft);
    }
}

//TODO once they get their score let them add 3 letters for initials and add that as a key and use the score as the value
function storeInitials(score, initials) {
    // Get the existing scores from local storage (if any)
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    // Add the new score and initials as an object to the scores array
    scores.push({ score, initials });

    // Sort the scores by score value (assuming higher scores are better)
    scores.sort((a, b) => b.score - a.score);

    // Store the updated scores array in local storage
    localStorage.setItem('scores', JSON.stringify(scores));
}

//TODO make a high-score list on page using a getItem from both the key and value and display that.


//TODO create a function that will display the next question and choices once they answer the following question


//TODO create a start button that wont display the questions until pressed
startButton.addEventListener("click", function() {

    startButton.disabled = true;
    displayQuestion();
  
   
    timerElement.textContent = timeLeft;
  
    timer = setInterval(function() {
      timeLeft--;
      timerElement.textContent = timeLeft;
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        
        startButton.disabled = false;
       
      }
      if (timeLeft <= 0) {
        
        body.appendChild(endQuizTagName)
      }
      
    }, 1000)
}),

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

// const timerInterval = setInterval(updateTimer, 1000);

endQuizTagName.setAttribute("style", "text-align: center; font-size: 40px;")