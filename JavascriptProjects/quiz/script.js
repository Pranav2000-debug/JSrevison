const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const choicesList = document.getElementById("choices-list");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score");

// const clickedLi = e.target.closest('li');
// if (clickedLi && choicesList.contains(clickedLi)) {
//   // Do your logic here with clickedLi
// }

let currentQuestionIndex = 0;
let score = 0;

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Mars", "Venus", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["Charles Dickens", "Jane Austen","William Shakespeare","Mark Twain",],
    answer: "William Shakespeare",
  },
];


startBtn.addEventListener('click', startQuiz);

function showQuestions() {
  nextBtn.classList.add('hidden');
  questionText.textContent = questions[currentQuestionIndex].question;
  questions[currentQuestionIndex].choices.forEach((choice) => {
    const option = document.createElement('li');
    option.dataset.answer = choice; 
    option.textContent = choice;
    choicesList.append(option);
  });
}

// EVENT DELEGATION
choicesList.addEventListener('click', (e) => {
  // console.log(currentQuestionIndex);
  // console.log(e.target);
  
  if(e.target.tagName === 'LI') {
    const testAnswer = e.target.dataset.answer;
    // console.log(testAnswer);
    if(questions[currentQuestionIndex].answer === testAnswer) {
      score++;
    }
    [...choicesList.children].forEach((child) => {
      if(child !== e.target) {
        child.remove();
      }
    });
    e.target.style.pointerEvents = 'none';
    nextBtn.classList.remove('hidden');
    console.log(score);
  }
});

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    // console.log(currentQuestionIndex);
    choicesList.innerHTML ='';
    showQuestions();
  } else {
    resultContainer.classList.remove('hidden');
    questionContainer.classList.add('hidden');
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
    nextBtn.classList.add('hidden');
  }
});

restartBtn.addEventListener('click', () => {
  currentQuestionIndex = 0;
  score = 0;
  resultContainer.classList.add('hidden');
  choicesList.innerHTML = '';
  questionContainer.classList.add('hidden');
  startBtn.classList.remove('hidden');
})

function startQuiz() {
  startBtn.classList.add('hidden');
  resultContainer.classList.add('hidden');
  questionContainer.classList.remove('hidden');
  showQuestions();
}

