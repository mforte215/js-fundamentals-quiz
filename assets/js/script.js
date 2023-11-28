const SCORE_VALUE = 100;
const STARTING_SCORE = 0;
const STARTING_QUESTION_INDEX = 0;
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
    question: "What is the HTML tag to add a javacript file to a page?",
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

const TOTAL_SCORE = SCORE_VALUE * QUESTION_BANK.length;

const timerTextParagraph = document.querySelector(".timer-text");
let currentScore = 0;
let hasAnswered = false;
let secondsLeft = 10;
let timerInterval;
let currentQuestion = 0;
let restartTimer = false;
let isPlaying = false;

const startGame = () => {
    resetStartScreen();
}

const startQuiz = () => {
    isPlaying = true;
    setScore();
    displayQuestion(STARTING_QUESTION_INDEX);
    startTimer();
}

const displayQuestion = (questionIndex) => {
    hasAnswered = false;
    currentQuestion = questionIndex;

    const startBtn = document.getElementById("start-button");
    if (startBtn != null) {
        startBtn.remove();
    }
    if (restartTimer) {
        startTimer();
        console.log("RESTARTING TIMER");
        restartTimer = false;
    }
    secondsLeft = 10;
    timerTextParagraph.textContent = "Time: 10s";
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
    if (QUESTION_BANK[questionIndex].correctAnswerIndex == answerIndex) {
        console.log("CORRECT!");
        hasAnswered = true;
        currentScore = currentScore + SCORE_VALUE;
        setScore(currentScore);
        document.getElementById("a" + answerIndex).classList.add("correct");
        let nextQuestionIndex = questionIndex + 1;
        if (nextQuestionIndex < QUESTION_BANK.length) {
            removePreviousQuestion();
            setTimeout(() => displayQuestion(nextQuestionIndex), 200);
        }
        else {
            console.log("CALLING ENDGAME FROM CHECK ANSWER CORRECT");
            processEndGame();
        }
    }
    else {
        hasAnswered = true;
        document.getElementById("a" + answerIndex).classList.add("wrong");
        let nextQuestionIndex = questionIndex + 1;
        if (nextQuestionIndex < QUESTION_BANK.length) {
            removePreviousQuestion();
            setTimeout(() => displayQuestion(nextQuestionIndex), 200);
        }
        else {
            console.log("CALLING ENDGAME FROM CHECK ANSWER WRONG");
            processEndGame();
        }

    }
}

const autoAnswer = (questionIndex) => {
    hasAnswered = true;
    let currentQuestion = QUESTION_BANK[questionIndex];
    let answerIndex = currentQuestion.correctAnswerIndex;
    console.log("AUTO ANSWERING QUESTION:");
    console.log(currentQuestion);
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        if (answerIndex == i) {
            document.getElementById("a" + i).classList.add("correct");
        }
        else {
            document.getElementById("a" + i).classList.add("wrong");
        }
    }
    let nextQuestionIndex = questionIndex + 1;
    if (nextQuestionIndex < QUESTION_BANK.length) {
        removePreviousQuestion();
        setTimeout(() => displayQuestion(nextQuestionIndex), 200);
    }
    else {
        console.log("CALLING ENDGAME FROM AUTO ANSWER CORRECT");
        processEndGame();
    }
}

const processEndGame = () => {
    clearInterval(timerInterval);
    secondsLeft = 0;
    timerTextParagraph.textContent = "Time: " + secondsLeft + "s";
    isPlaying = false;
    removePreviousQuestion();
    const mainDisplayText = document.querySelector(".main-display-text");
    if (mainDisplayText) {
        mainDisplayText.remove();
    }

    const scoreBoard = document.querySelector(".score-board");
    scoreBoard.innerText = "FINAL SCORE: " + currentScore;
    const highScoreBox = document.createElement("form");
    highScoreBox.classList.add("high-score-box", "hover-cursor");
    const initialsLabel = document.createElement("label");
    initialsLabel.innerText = "Enter initials to record score: ";
    initialsLabel.id = "initials-label";
    initialsLabel.htmlFor = "initials-input";
    initialsLabel.classList.add("initial-label");
    const initialsInput = document.createElement("input");
    initialsInput.id = "initials-input";
    initialsInput.classList.add("initials-input");
    highScoreBox.appendChild(initialsLabel);
    highScoreBox.appendChild(initialsInput);
    scoreBoard.after(highScoreBox);

    const submitButton = document.createElement("button");
    submitButton.innerText = "SUBMIT";
    submitButton.id = "submit"
    submitButton.classList.add("start-btn");
    highScoreBox.addEventListener("submit", saveHighScore)
    highScoreBox.appendChild(submitButton);

};

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
    timerInterval = setInterval(() => {
        secondsLeft--;
        timerTextParagraph.textContent = "Time: " + secondsLeft + "s";
        if (secondsLeft <= 0 && isPlaying) {
            clearInterval(timerInterval);
            autoAnswer(currentQuestion);
            restartTimer = true;
        }
    }, 1000)

}

const saveHighScore = (event) => {
    event.preventDefault();
    const initialInput = document.querySelector(".initials-input").value;
    if (initialInput != '' && initialInput != null) {
        //find id 
        let newId = localStorage.length + 1;
        let highScore = {
            id: newId,
            name: initialInput,
            score: currentScore
        }
        localStorage.setItem(newId, JSON.stringify(highScore));
        displayHighScores();
    }
}

const displayHighScores = () => {
    const highScoreArray = [];
    //remove all displays from main display container
    const mainDisplayContainer = document.querySelector(".main-display-container");
    for (let i = 0; i < mainDisplayContainer.children.length; i++) {
        mainDisplayContainer.children[0].remove();
    }
    const buttonDisplayContainer = document.querySelector(".button-display-container");
    if (buttonDisplayContainer) {
        buttonDisplayContainer.remove();
    }

    console.log(localStorage);
    for (let i = 1; i <= localStorage.length; i++) {
        let parsedScore = JSON.parse(localStorage.getItem(i));
        highScoreArray.push({
            id: parsedScore.id,
            name: parsedScore.name,
            score: parsedScore.score,
        })
    }

    highScoreArray.sort((x, y) => y.score - x.score);

    const highScoreContainer = document.createElement("div");
    highScoreContainer.classList.add("high-score-header-container");
    const header = document.createElement("h2");
    header.textContent = "HIGH SCORES";

    header.classList.add("high-score-header")
    mainDisplayContainer.append(highScoreContainer);
    highScoreContainer.append(header);
    for (let i = 0; i < highScoreArray.length; i++) {
        let highScoreEntry = document.createElement("p");
        highScoreEntry.textContent = (i + 1) + ". " + highScoreArray[i].name + " " + highScoreArray[i].score;
        highScoreEntry.classList.add("high-score-entry")
        highScoreContainer.append(highScoreEntry);
    }

    const highScoreLink = document.querySelector(".high-scores-link");
    highScoreLink.textContent = "Play Again";
    highScoreLink.removeEventListener("click", displayHighScores);
    highScoreLink.addEventListener("click", reloadGame);


}

/* VERSION 2 */

const reloadGame = () => {
    location.reload()
}

const resetStartScreen = () => {
    isPlaying = false;
    currentScore = 0;
    const startText = "Welcome to the JS Fundamentals quiz game! This quiz will text your knowledge of Javascript. Press Start to begin!";
    const mainDisplayContainer = document.querySelector(".main-display-container");
    let scoreBoard = document.querySelector(".score-board");
    if (!scoreBoard) {
        scoreBoard = document.createElement("p");
        scoreBoard.classList.add("score-board");
        scoreBoard.textContent = "SCORE: --";
        mainDisplayContainer.append(scoreBoard);
    }
    let mainDisplayText = document.querySelector(".main-display-text");
    if (mainDisplayText) {
        mainDisplayText.innerText = startText;
    }
    else {
        console.log("CREATING MAIN DISPLAY TEXT");
        mainDisplayText = document.createElement("p");
        mainDisplayText.classList.add("main-display-text");
        mainDisplayText.innerText = startText;
        mainDisplayContainer.append(mainDisplayText);
    }

    let highScoreContainer = document.querySelector(".high-score-header-container");
    if (highScoreContainer) {
        highScoreContainer.remove();
    }

    const startBtn = document.createElement("button");
    startBtn.id = "start-button";
    startBtn.innerText = "Start"
    startBtn.classList.add("start-btn");
    let buttonDisplayContainer = document.querySelector(".button-display-container");
    if (buttonDisplayContainer) {
        buttonDisplayContainer.appendChild(startBtn);
    }
    else {
        buttonDisplayContainer = document.createElement("div");
        buttonDisplayContainer.classList.add("button-display-container");
        buttonDisplayContainer.appendChild(startBtn);
        mainDisplayContainer.append(buttonDisplayContainer);
    }

    startBtn.addEventListener("click", startQuiz);
    const highScoreLink = document.querySelector(".high-scores-link");
    highScoreLink.textContent = "High Scores";
    highScoreLink.removeEventListener("click", reloadGame);
    highScoreLink.addEventListener("click", displayHighScores)
}

startGame();