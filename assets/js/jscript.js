var
    questionsCounter = 0,
    displayCounter = questionsCounter + 1,
    answerHolder = 0,
    pointsTotal = 0,
    playerName = "",
    playerScore = [],
    scoreStorage = [],
    playthroughCounter = 0,
    quizTimeCounter = 60,
    t = 0,
    questions = [],
    counterDivEl = document.getElementById("countdown-timer-container"),
    spanCounter = document.getElementById("question-number"),
    questionHeader = document.getElementById("question-header"),
    questionAnswer = document.getElementById("answer-choice"),
    submitButton = document.getElementById("submit-answer"),
    buttonInput = document.getElementById("btn-container");

//enter questions here following this format. Unfortunately all questions must have 3 answers and 
//only 1 of which can be correct but there is no limit to the number of questions you can add.

var questionsObj1 = {
    header: "How do you declare a variable?",
    a1: "var 'variableName' = 'data';",
    a2: "'data' = var 'variableName';",
    a3: "variable = 'variableName', 'data';",
    correctAnswer: "a1"
};

var questionsObj2 = {
    header: "How do you assign an Element to a variable by it's Id?",
    a1: "'ElementId' = 'variableName' = document.GetElementbyName;",
    a2: "var 'variableName' = document.getElementById('ElementId');",
    a3: "var 'variableName' = document.getElementById('variableName');",
    correctAnswer: "a2"
};

var questionsObj3 = {
    header: "How do you create an Element?",
    a1: "'ElementId' = 'variableName' = document.createElement;",
    a2: "var 'variableName' = document.createElement('ElementId');",
    a3: "var 'variableNameEl = document.createElement('Element');",
    correctAnswer: "a3"
};

//make sure to push the question into the array after it has been added.

questions.push(questionsObj1);
questions.push(questionsObj2);
questions.push(questionsObj3);

//player enters their name here, empty or null names will trigger the prompt again.

function createPlayer() {
    playerName = prompt("Enter your name and hit ok to start the quiz. Good luck!");
    if (playerName === "" || playerName === null) {

        createPlayer()
    }

    else {

        t = setInterval(quizTimer, 1000);
        createQuestion();
    }
}

//decrements the timer by 1 every second   
function quizTimer() {
    quizTimeCounter--;
    if (quizTimeCounter <= 0) {
        removeElements();
        endQuiz();
    }

    var counterEl = document.getElementById("countdown-timer")
    counterEl.innerHTML = "You have " + quizTimeCounter + " seconds left!";

    counterDivEl.appendChild(counterEl);


};


//creates the questions
function createQuestion() {
    //update the question number on the static header
    if (questions[questionsCounter] === undefined) {
        endQuiz();
    }
    else {

        spanCounter.innerHTML = displayCounter;

        // Here we create the header for the specific question
        var headerObj = questions[questionsCounter].header;
        var questionHeaderEl = document.createElement("h2");
        questionHeaderEl.id = "question-header-element";
        questionHeaderEl.textContent = headerObj;
        questionHeader.appendChild(questionHeaderEl);


        //Here we create the answer list with checkbox inputs
        var answerText = questions[questionsCounter].a1;

        var answerLiEl = document.createElement("li");
        answerLiEl.id = "list-answer-one";
        answerLiEl.innerHTML = "<input type = 'radio' name = 'answer-submission' id = 'answerOne' onclick = 'compareAnswersOne()' /><label for = 'answerOne'>" + answerText + "</label>";

        questionAnswer.appendChild(answerLiEl);

        //Answer #2
        var answerText = questions[questionsCounter].a2;

        var answerLiEl = document.createElement("li");
        answerLiEl.id = "list-answer-two";
        answerLiEl.innerHTML = "<input type = 'radio' name = 'answer-submission' id = 'answerTwo' onclick = 'compareAnswersTwo()' /><label for = 'answerTwo'>" + answerText + "</label>";

        questionAnswer.appendChild(answerLiEl);

        //Answer #3
        var answerText = questions[questionsCounter].a3;

        var answerLiEl = document.createElement("li");
        answerLiEl.id = "list-answer-three";
        answerLiEl.innerHTML = "<input type = 'radio' name = 'answer-submission' id = 'answerThree' onclick = 'compareAnswersThree()' /><label for = 'answerThree'>" + answerText + "</label>";

        questionAnswer.appendChild(answerLiEl);
    }
};

//function to save the playerName and score to the leaderboard

function endQuiz() {

    //stop the timer
    clearInterval(t);
    
    //create an object to be saved in local storage
    var scoreSubmit = {
        name: playerName,
        score: pointsTotal,
        time: quizTimeCounter
    }

    //index the current playthrough using the integer value of playthroughCounter as a key then increment and save a new value of playthroughCounter
    playthroughCounter = localStorage.getItem("playthroughCounter");
    parseInt(playthroughCounter);

    if (playthroughCounter === undefined || playthroughCounter === null) {
        playthroughCounter = 0;
    }

    //save the object in local storage under the integer key of the current playthroughCounter
    localStorage.setItem(playthroughCounter, JSON.stringify(scoreSubmit));

    //create the entry on the scoreboard
    var playerScoreListEl = document.createElement("ol");
    questionHeader.appendChild(playerScoreListEl);

    for (i = 0; i <= playthroughCounter; i++) {
        scoreStorage[i] = JSON.parse(localStorage.getItem(i));
    }
    
    //sort the scores by high score
    scoreStorage.sort((a, b) => b.score - a.score);

    //display the scores on a created li element
    for (i = 0; i < scoreStorage.length; i++) {
        console.log(scoreStorage[i]);
        var playerScoreEl = document.createElement("li");
        playerScoreEl.textContent = scoreStorage[i].name + " scored " + scoreStorage[i].score + " points with " + scoreStorage[i].time + " seconds to spare!";
        playerScoreListEl.appendChild(playerScoreEl);
    }

    //increment and save playthroughCounter to be recalled for next run
    playthroughCounter++;
    localStorage.setItem("playthroughCounter", playthroughCounter);

    //remove the answer button and replace it with a button to retake the quiz
    submitButton.remove();
    buttonInput.innerHTML = "<input type = 'button' id = 'retake-button' onclick='location.reload()' value = 'Retake Quiz' />";

}

//remove the questions for either the next set to be displayed or the highscore to be displayed
function removeElements() {

    var removeElement = document.getElementById("question-header-element");
    removeElement.remove();

    removeElement = document.getElementById("list-answer-one");
    removeElement.remove();

    removeElement = document.getElementById("list-answer-two");
    removeElement.remove();

    removeElement = document.getElementById("list-answer-three");
    removeElement.remove();
}

function compareAnswersOne() {
    if (questions[questionsCounter].correctAnswer === "a1") {
        answerHolder = 1;
    }

    else {
        answerHolder = 0;
    }
}

function compareAnswersTwo() {
    if (questions[questionsCounter].correctAnswer === "a2") {
        answerHolder = 1;
    }

    else {
        answerHolder = 0;
    }
}

function compareAnswersThree() {
    if (questions[questionsCounter].correctAnswer === "a3") {
        answerHolder = 1;
    }

    else {
        answerHolder = 0;
    }
}


function submitAnswer() {
    if (answerHolder === 1) {
        alert("Correct!");
        pointsTotal = pointsTotal + 3;
        questionsCounter++;
        displayCounter++;
        removeElements();
        createQuestion();
    }

    else {
        alert("Incorrect!");
        pointsTotal = pointsTotal - 1;
        //add a decrement to the timer when a wrong question is selected
        quizTimeCounter = quizTimeCounter - 5;
    }
};

createPlayer();
