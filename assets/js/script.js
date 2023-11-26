let isPlaying = false;

const QUESTION_ONE = {
    id: 1,
    question: "What is the extension for javascript files?",
    answers: [".doc", ".css", ".html", ".js"],
    correctAnswerIndex: 3
}

const QUESTION_TWO = {
    id: 2,
    question: "What of the following is not a javascript datatype?",
    answers: ["Number", "String", "Letter", "Boolean"],
    correctAnswerIndex: 3
}
const QUESTION_THREE = {
    id: 3,
    question: "What is the HTML tag to add a javacript file?",
    answers: ["<href>", "<body>", "<link>", "<script>"],
    correctAnswerIndex: 3
}
const QUESTION_FOUR = {
    id: 4,
    question: "What is the extension for javascript files?",
    answers: [".doc", ".css", ".html", ".js"],
    correctAnswerIndex: 3
}
const QUESTION_FIVE = {
    id: 5,
    question: "What is the extension for javascript files?",
    answers: [".doc", ".css", ".html", ".js"],
    correctAnswerIndex: 3
}

const QUESTION_BANK = [QUESTION_ONE, QUESTION_TWO, QUESTION_THREE, QUESTION_FOUR, QUESTION_FIVE];

const onGameLoad = () => {
    startGame();
}

const startGame = () => {
    console.log("Starting Game!");
    const startText = "Welcome to the JS Fundamentals quiz game! This quiz will text your knowledge of Javascript. Press Start to begin!"
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
    let currentQuestion = 0;
    if (currentQuestion < QUESTION_BANK.length) {
        displayQuestion(currentQuestion);
    }
    else {
        isPlaying = false;
    }
}

const displayQuestion = (questionIndex) => {
    console.log("Displaying Question: " + questionIndex);

    const startBtn = document.getElementById("start-button");
    if (startBtn != null) {
        startBtn.remove();
    }
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
        document.getElementById("a" + answerIndex).classList.add("correct");
        let nextQuestionIndex = questionIndex + 1;
        const buttonDisplayContainer = document.querySelector(".button-display-container");
        setTimeout(displayQuestion(nextQuestionIndex), 1000);
    }
    else {
        console.log("WRONG!");
        document.getElementById("a" + answerIndex).classList.add("wrong");
        let nextQuestionIndex = questionIndex + 1;
        const buttonDisplayContainer = document.querySelector(".button-display-container");
        setTimeout(displayQuestion(nextQuestionIndex), 1000);
    }
}

const removePreviousQuestion = () => {

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