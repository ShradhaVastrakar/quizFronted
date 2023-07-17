let baseurl = "https://nice-pink-seal-veil.cyclic.app/api"
const urlParams = new URLSearchParams(window.location.search);
let quizId = urlParams.get('id');
const quizUrl = `${baseurl}/quizzes/${quizId}/questions`;

let backtoDashboard = document.getElementById("backtoDashboard");

backtoDashboard.addEventListener("click", () => {
  window.location.href = "Dashboard.html"
})

let quizData = null;
let currentQuestionIndex = 0;
let userAnswers = [];

// Fetch quiz data from the server
fetch(quizUrl)
  .then(response => response.json())
  .then(data => {
    quizData = data;
    renderQuestion();
  })
  .catch(error => console.log(error));


    // Render the current question
    function renderQuestion() {
        const questionContainer = document.getElementById("question");
        const optionsContainer = document.getElementById("options");
        const prevButton = document.getElementById("prev-btn");
        const nextButton = document.getElementById("next-btn");
        const submitButton = document.getElementById("submit-btn");
  
        // Clear previous question and options
        questionContainer.innerHTML = "";
        optionsContainer.innerHTML = "";
  
        // Display current question
        const currentQuestion = quizData.questions[currentQuestionIndex];
        questionContainer.textContent = currentQuestion.title;
  
        // Display options
        currentQuestion.answerOptions.forEach((option, index) => {
          const optionElement = document.createElement("div");
          optionElement.textContent = option;
          optionElement.classList.add("option");
          optionElement.addEventListener("click", () => {
            userAnswers[currentQuestionIndex] = index;
            showResult();
          });
          optionsContainer.appendChild(optionElement);
        });
  
        // Enable/disable navigation buttons based on current question
        prevButton.disabled = currentQuestionIndex === 0;
        nextButton.disabled = currentQuestionIndex === quizData.questions.length - 1;
  
        // Show/hide submit button
        submitButton.style.display = currentQuestionIndex === quizData.questions.length - 1 ? "block" : "none";
      }
   // Show the result of the current question
   function showResult() {
    const optionsContainer = document.getElementById("options");
    const resultContainer = document.getElementById("result");
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const userAnswerIndex = userAnswers[currentQuestionIndex];

    // Clear previous result
    resultContainer.textContent = "";

    // Display correct/wrong message for the user's answer
    const resultElement = document.createElement("p");
    resultElement.textContent = currentQuestion.correctOptions.includes(userAnswerIndex)
      ? "Correct!"
      : "Wrong!";
    resultContainer.appendChild(resultElement);

    // Highlight the correct answer
    const options = optionsContainer.getElementsByClassName("option");
    for (let i = 0; i < options.length; i++) {
      options[i].classList.remove("correct", "wrong");
      if (currentQuestion.correctOptions.includes(i)) {
        options[i].classList.add("correct");
      }
      if (i === userAnswerIndex) {
        options[i].classList.add("wrong");
      }
    }
  }

  // Go to the next question
  function goToNextQuestion() {
    currentQuestionIndex++;
    renderQuestion();
  }

  // Go to the previous question
  function goToPreviousQuestion() {
    currentQuestionIndex--;
    renderQuestion();
  }

  // Submit the quiz and show the score
  function submitQuiz() {
    // Calculate the score
    let score = 0;
    quizData.questions.forEach((question, index) => {
      if (question.correctOptions.includes(userAnswers[index])) {
        score++;
      }
    });

    // Display the score and redirect to the leaderboard
    alert(`Your score: ${score}`);
    // Add code to redirect to the quiz leaderboard
  }

  // Event listeners for navigation buttons
  document.getElementById("prev-btn").addEventListener("click", goToPreviousQuestion);
  document.getElementById("next-btn").addEventListener("click", goToNextQuestion);
  document.getElementById("submit-btn").addEventListener("click", submitQuiz);

  // Render the initial question
  renderQuestion();

