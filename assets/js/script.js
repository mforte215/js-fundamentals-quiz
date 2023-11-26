const SCORE_VALUE = 100;
const STARTING_SCORE = 0;
let currentScore = 0;
const QUESTION_ONE = {
    id: 1,
    question: "What is the extension for javascript files?",
    answers: [".doc", ".css", ".html", ".js"],
    correctAnswerIndex: 3
}

const QUESTION_TWO = {
    id: 2,
    question: "What of the following is not a javascript datatype?",
    answers: ["Number", "Letter", "String", "Boolean"],
    correctAnswerIndex: 1
}
const QUESTION_THREE = {
    id: 3,
    question: "What is the HTML tag to add a javacript file?",
    answers: ["<href>", "<body>", "<link>", "<script>"],
    correctAnswerIndex: 3
}
const QUESTION_FOUR = {
    id: 4,
    question: "What object is the main entry point for all client-side js features and APIs?",
    answers: ["Window", "Global", "Position", "Location"],
    correctAnswerIndex: 0
}
const QUESTION_FIVE = {
    id: 5,
    question: "Why is the JS engine needed?",
    answers: ["To compile script", "To compile and then interpert script", "To interpert script", "None of the above"],
    correctAnswerIndex: 2
}

const QUESTION_BANK = [QUESTION_ONE, QUESTION_TWO, QUESTION_THREE, QUESTION_FOUR, QUESTION_FIVE];

const onGameLoad = () => {
    startGame();
}

const startGame = () => {
    console.log("Starting Game!");
    const startText = "Welcome to the JS Fundamentals quiz game! This quiz will text your knowledge of Javascript. Press Start to begin!";
    const mainDisplayText = document.querySelector(".main-display-text");
    console.log(mainDisplayText);
    mainDisplayText.innerText = startText;
    const startBtn = document.createElement("button");
    startBtn.id = "start-button";
    startBtn.innerText = "Start"
    startBtn.classList.add("start-btn");
    const buttonDisplayContainer = document.querySelector(".button-display-container");
    buttonDisplayContainer.appendChild(startBtn);
    isPlaying = true;
    startBtn.addEventListener("click", startQuiz);
}

const startQuiz = () => {
    setScore();
    let currentQuestion = 0;
    if (currentQuestion < QUESTION_BANK.length) {
        displayQuestion(currentQuestion);
    }
    else {
        isPlaying = false;
    }
}

const displayQuestion = (questionIndex) => {
    const startBtn = document.getElementById("start-button");
    if (startBtn != null) {
        startBtn.remove();
    }

    console.log("Displaying Question: " + questionIndex);
    const mainDisplayText = document.querySelector(".main-display-text");
    mainDisplayText.innerText = QUESTION_BANK[questionIndex].id + ". " + QUESTION_BANK[questionIndex].question
    const buttonDisplayContainer = document.querySelector(".button-display-container");
    for (let i = 0; i < QUESTION_BANK[questionIndex].answers.length; i++) {
        const answerBtn = document.createElement("button");
        answerBtn.id = "a" + i;
        answerBtn.innerText = QUESTION_BANK[questionIndex].answers[i];
        answerBtn.classList.add("answer-btn");
        answerBtn.addEventListener("click", () => {
            checkAnswer(questionIndex, i);
        })
        buttonDisplayContainer.appendChild(answerBtn);

    }
}

const checkAnswer = (questionIndex, answerIndex) => {
    console.log("QUESTION:" + questionIndex + " Answer Clicked:" + answerIndex);
    if (QUESTION_BANK[questionIndex].correctAnswerIndex == answerIndex) {
        console.log("CORRECT!");
        currentScore = currentScore + SCORE_VALUE;
        setScore(currentScore);
        document.getElementById("a" + answerIndex).classList.add("correct");
        let nextQuestionIndex = questionIndex + 1;
        if (nextQuestionIndex < QUESTION_BANK.length) {
            removePreviousQuestion();
            setTimeout(() => displayQuestion(nextQuestionIndex), 200);
        }
        else {
            console.log("DONE!");
        }
    }
    else {
        console.log("WRONG!");
        document.getElementById("a" + answerIndex).classList.add("wrong");
        let nextQuestionIndex = questionIndex + 1;
        if (nextQuestionIndex < QUESTION_BANK.length) {
            removePreviousQuestion();
            setTimeout(() => displayQuestion(nextQuestionIndex), 200);
        }
        else {
            console.log("DONE!");
        }

    }
}

const setScore = () => {
    document.querySelector(".score-board").innerText = "SCORE: " + currentScore;
}

const removePreviousQuestion = () => {

    setTimeout(() => {

        const a1 = document.getElementById("a0");
        if (a1 != null) {
            a1.remove();
        }
        const a2 = document.getElementById("a1");
        if (a2 != null) {
            a2.remove();
        }
        const a3 = document.getElementById("a2");
        if (a3 != null) {
            a3.remove();
        }
        const a4 = document.getElementById("a3");
        if (a4 != null) {
            a4.remove();
        }
    }, 200);
}

const startTimer = () => {
    let timeleft = 25;
    let timer = setInterval(() => {
        if (timeleft >= 1) {
            document.querySelector(".timer-text").innerText = "Time: " + timeleft + "s";
            timeleft -= 1;
        }
        else {

            clearInterval(timer);
            document.querySelector(".timer-text").innerText = "out of time"
            return false;
        }
    }, 1000);
}

onGameLoad();