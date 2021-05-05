var questionsCounter = 0;
var displayCounter = questionsCounter + 1;
var answerHolder = 0;
var pointsTotal = 0;
var playerName = "";
var scoreStorage = [];
var playthroughCounter = 1;
var quizTimeCounter = 30;
var t = 0;
var questions = [];
var counterDivEl = document.getElementById("countdown-timer-container");
var spanCounter = document.getElementById("question-number");
var questionHeader = document.getElementById("question-header");
var questionAnswer = document.getElementById("answer-choice");
var submitButton = document.getElementById("submit-answer");
var buttonInput = document.getElementById("btn-container");

//enter questions here following this format. Unfortunately all questions must have 3 answers and 
//only 1 of which can be correct but there is no limit to the number of questions you can add.

var questionsObj1 = {
    header: "How do you declare a variable?",
    a1: "var 'variableName' = 'data'",
    a2: "'data' = var 'variableName'",
    a3: "variable = 'variableName', 'data'",
    correctAnswer: "a1"
};

var questionsObj2 = {
    header: "How do you assign an Element to a variable by it's Id?",
    a1: "'ElementId' = 'variableName' = document.GetElementbyName",
    a2: "var 'variableName' = document.getElementById('ElementId')",
    a3: "var 'variableName' = document.getElementById('variableName')",
    correctAnswer: "a2"
};

//make sure to push the question into the array after it has been added.

questions.push(questionsObj1);
questions.push(questionsObj2);

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
    quizTimeCounter = quizTimeCounter - 1;
    console.log(quizTimeCounter);
    if (quizTimeCounter <= 0) {
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


    playthroughCounter = localStorage.getItem(playthroughCounter);
    
    if (playthroughCounter === undefined || playthroughCounter === "" || playthroughCounter === null) {
        playthroughCounter = 1;
    }

    localStorage.setItem(playthroughCounter, JSON.stringify(scoreSubmit));

    var playerScoreListEl = document.createElement("ol");
    questionHeader.appendChild(playerScoreListEl);

    for (i = 1; i <= playthroughCounter; i++) {
        var playerScoreRet = JSON.parse(localStorage.getItem(i));
        console.log(playerScoreRet);

        var playerScoreEl = document.createElement("li");
        playerScoreEl.textContent = playerScoreRet.name + " scored " + playerScoreRet.score + " points with " + playerScoreRet.time + " seconds to spare!";

        playerScoreListEl.appendChild(playerScoreEl);
    }

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
