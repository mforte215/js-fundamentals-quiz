const onGameLoad = () => {
    console.log("Starting Game!");
    //Set initial starting text
    const startText = "Welcome to the JS Fundamentals quiz game! This quiz will text your knowledge of Javascript. Press Start to begin!"
    const mainDisplayText = document.querySelector(".main-display-text");
    console.log(mainDisplayText);
    mainDisplayText.innerText = startText;
    const startBtn = document.createElement("button");
    startBtn.innerText = "Start"
    startBtn.classList.add("start-btn");
    const buttonDisplayContainer = document.querySelector(".button-display-container");
    buttonDisplayContainer.appendChild(startBtn);
}


onGameLoad();