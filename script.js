const quizData = [
  {
    question: "Which is the smallest country in the World?",
    options: ["Vatican City", "India", "Bhutan", "Nepal"],
    answer: "Vatican City"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Saturn", "Venus"],
    answer: "Mars"
  },
  {
    question: "What is the capital of France?",
    options: ["Rome", "Madrid", "Paris", "Berlin"],
    answer: "Paris"
  },
  {
    question: "What language is used in making this Project?",
    options:["JS" , "PHP" , "C++" , "Python"],
    answer: "JS"
  }
];


let currentQ = 0;
let score = 0;

// DOM references
const box = document.querySelector(".box");

// Load question
function loadQuestion() {
  const qData = quizData[currentQ];
  box.innerHTML = `
    <h2>Start Quiz Game</h2>
    <div class="ques">
      <h3>${qData.question}</h3>
      <div class="options">
        ${qData.options.map((opt) => `<button class="option">${opt}</button>`).join("")}
      </div>
    </div>
    <button class="next">Next</button>
  `;
  addListeners();
}

function addListeners() {
  const optionButtons = document.querySelectorAll(".option");
  const nextBtn = document.querySelector(".next");

  optionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      optionButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });

  nextBtn.addEventListener("click", () => {
    const selected = document.querySelector(".selected");
    if (!selected) {
      alert("Please select an option.");
      return;
    }

    // if (selected.textContent.trim() === quizData[currentQ].answer) {
    //   score++;
    // }

    // currentQ++;
    const correctAnswer = quizData[currentQ].answer;

    optionButtons.forEach(btn => {
    const btnText = btn.textContent.trim();

    if (btnText === correctAnswer) {
      btn.classList.add("correct"); // green for correct option
    }

    if (btn.classList.contains("selected") && btnText !== correctAnswer) {
      btn.classList.add("incorrect"); // red only if wrong selection
    }

    btn.disabled = true; // disable all buttons after answer
  });

  if (selected.textContent.trim() === correctAnswer) {
    score++; // increment score only if correct
  }
  setTimeout(() => {
    currentQ++;
    if (currentQ < quizData.length) {
      loadQuestion();
    } else {
      showScore();
    }
  }, 1500);

    // if (currentQ < quizData.length) {
    //   loadQuestion();
    // } else {
    //   showScore();
    // }
  });
}

function showScore() {
  box.innerHTML = `
    <h2>Quiz Completed</h2>
    <p>Your Score: ${score} / ${quizData.length}</p>
    <button class="next" onclick="location.reload()">Restart</button>
  `;
}

// Start the quiz
loadQuestion();
