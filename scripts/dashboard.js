
let url = "https://nice-pink-seal-veil.cyclic.app/api"

const quizList = document.getElementById('quizList');
const createQuizForm = document.getElementById('createQuizForm');




fetch(`${url}/quizzes`)
.then(response => response.json())
.then(data => {
  const quizList = document.getElementById('quizList');
  displayQuizzes(data)
})
.catch(error => {
  console.error('Error fetching quizzes:', error);
});

function displayQuizzes(data) {
    data.quizzes.forEach(quiz => {
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');
        quizCard.innerHTML = `
          <h2>${quiz.title}</h2>
          <p>Created by: ${quiz.creator}</p>
          <p>${quiz.description}</p>
          <p>No. of Questions: ${quiz.questions.length}</p>
          <button onclick="takeQuiz('${quiz._id}')">Take Quiz</button>
          <button onclick="viewLeaderboard('${quiz._id}')">Leaderboard</button>
          <button onclick="deleteQuiz('${quiz._id}')" id="Delete-button">Delete Quiz</button>
         
        `;
        quizList.append(quizCard);
      });  
}


function takeQuiz(quizId) {
    // Redirect to the Quiz Page with the selected quiz ID
    window.location.href = `Quiz.html?id=${quizId}`;
  }

  // Leaderboard button click handler
  function viewLeaderboard(quizId) {
    // Redirect to the Leaderboard Page with the selected quiz ID
    window.location.href = `Leaderboard.html?quizId=${quizId}`;
  }

  // Delete Quiz button click handler
  function deleteQuiz(quizId) {
    // Send a DELETE request to the backend API to delete the quiz
    fetch(`${url}/quizzes/${quizId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("Deleted Successfully")
  
        // Remove the quiz card from the DOM
        const quizCard = document.getElementById(quizId);
        if (quizCard) {
          quizCard.remove();
        }
        displayQuizzes(data);
      }
 
      
    })
    .catch(error => {
      console.error('Error deleting quiz:', error);
    });
  }



  // Edit Quiz button click handler
  function editQuiz(quizId) {
    // Redirect to the Edit Quiz Page with the selected quiz ID
    window.location.href = `/edit-quiz?id=${quizId}`;
  }

  function openCreateQuizForm() {
    createQuizForm.style.display = 'block';
  }


  // Create Quiz form submit handler
  function createQuiz(event) {
    event.preventDefault();

    const quizTitleInput = document.getElementById('quizTitle');
    const quizDescriptionInput = document.getElementById('quizDescription');

    const newQuiz = {
      creator: 'user@example.com',
      title: quizTitleInput.value,
      description: quizDescriptionInput.value,
      questions: []
    };

    quizzes.push(newQuiz);
    console.log('New quiz:', newQuiz);

    // Send the new quiz data to the server through the /quizzes route
    fetch(`${url}/quizzes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuiz)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Quiz added:', data);
      })
      .catch(error => {
        console.error('Error adding quiz:', error);
      });

    // Reset the form and hide it
    quizTitleInput.value = '';
    quizDescriptionInput.value = '';
    createQuizForm.style.display = 'none';

    // Refresh the quiz list
    quizList.innerHTML = '';
    displayQuizzes();
  }


  const questionsContainer = document.getElementById('questionsContainer');
let questionCount = 0;

function addQuestion() {
  questionCount++;

  const questionDiv = document.createElement('div');
  questionDiv.classList.add('question');
  questionDiv.innerHTML = `
    <h3>Question ${questionCount}</h3>
    <label for="questionTitle${questionCount}">Question Title:</label>
    <input type="text" id="questionTitle${questionCount}" required>
    <label for="answerOptions${questionCount}">Answer Options (comma-separated):</label>
    <input type="text" id="answerOptions${questionCount}" required>
    <label for="correctOptions${questionCount}">Correct Options (comma-separated):</label>
    <input type="text" id="correctOptions${questionCount}" required>
  `;

  questionsContainer.appendChild(questionDiv);
}

function createQuiz(event) {
  event.preventDefault();

  const quizTitleInput = document.getElementById('quizTitle');
  const quizDescriptionInput = document.getElementById('quizDescription');
  const questionDivs = document.getElementsByClassName('question');

  const questions = [];

  for (let i = 0; i < questionDivs.length; i++) {
    const questionTitleInput = document.getElementById(`questionTitle${i + 1}`);
    const answerOptionsInput = document.getElementById(`answerOptions${i + 1}`);
    const correctOptionsInput = document.getElementById(`correctOptions${i + 1}`);

    const answerOptions = answerOptionsInput.value.split(',').map(option => option.trim());
    const correctOptions = correctOptionsInput.value.split(',').map(option => parseInt(option.trim()));

    const question = {
      title: questionTitleInput.value,
      answerOptions: answerOptions,
      correctOptions: correctOptions
    };

    questions.push(question);
  }

  const newQuiz = {
    creator: 'marie@gmail.com',
    title: quizTitleInput.value,
    description: quizDescriptionInput.value,
    questions: questions
  };

  // Send the new quiz data to the server through the /quizzes route
  fetch(`${url}/quizzes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newQuiz)
  })
    .then(response => response.json())
    .then(data => {
        alert("Quiz Added")
      console.log('Quiz added:', data);
    })
    .catch(error => {
      console.error('Error adding quiz:', error);
    });

  // Reset the form and hide it
  quizTitleInput.value = '';
  quizDescriptionInput.value = '';
  questionsContainer.innerHTML = '';
  createQuizForm.style.display = 'none';

  // Refresh the quiz list
  quizList.innerHTML = '';
  displayQuizzes();
}

let create = document.getElementById("createQuizForm")
let closed = document.getElementById("closebutton")

closed.addEventListener("click", () =>{
    create.style.display = "none";
})

let logout = document.getElementById("logout-main");
logout.addEventListener("click", () => {
    window.location.href = "index.html"
})




