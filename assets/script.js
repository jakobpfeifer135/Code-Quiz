var score = 0;
var timeLeft = 120; // 2 minutes
var currentQuestion = 1;
var answeredQuestions = {};

function updateTimer() {
    const timerElement = document.getElementById("quizTimer");
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    //This line of code is used to update the text content of an HTML element with the id "quizTimer" to display the remaining time in minutes and seconds.
    timerElement.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
    const selectedAnswer = document.querySelector(`input[name="${questionId}"]:checked`);

    if (selectedAnswer) {
        const correctAnswers = {
            "q1": ["b"], // Add correct answers for each 
            "q2": ["c"]
        };

        const feedbackElement = document.createElement("p");
        feedbackElement.textContent = `Your answer is ${correctAnswers[questionId].includes(selectedAnswer.value) ? "correct" : "incorrect"}.`;

        const questionElement = document.getElementById(questionId);
        questionElement.appendChild(feedbackElement);

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
    } else {
        alert("Please select an answer before submitting.");
    }
}
//function to end the quiz once questions have been answered
function endQuiz() {
    clearInterval(timerInterval);

    // Display the final score
    const quizScore = document.getElementById("quizScore");
    quizScore.textContent = `Your Score: ${score}`;

    // Hide the remaining questions
    document.getElementById("question1").style.display = "none";
    document.getElementById("question2").style.display = "none";
}

const timerInterval = setInterval(updateTimer, 1000);