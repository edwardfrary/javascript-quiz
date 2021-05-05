var questionsCounter = 0;
var displayCounter = questionsCounter + 1;
var answerHolder = 0;
var pointsTotal = 0;
var questions = [];
var spanCounter = document.getElementById("question-number");
var questionHeader = document.getElementById("question-header");
var questionAnswer = document.getElementById("answer-choice");

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

questions.push(questionsObj1);
questions.push(questionsObj2);

function createQuestion() {
    //update the question number on the static header
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
    answerLiEl.innerHTML ="<input type = 'radio' name = 'answer-submission' id = 'answerOne' onclick = 'compareAnswersOne()' /><label for = 'answerOne'>" + answerText + "</label>";

    questionAnswer.appendChild(answerLiEl);

    //Answer #2
    var answerText = questions[questionsCounter].a2;

    var answerLiEl = document.createElement("li");
    answerLiEl.id="list-answer-two";
    answerLiEl.innerHTML ="<input type = 'radio' name = 'answer-submission' id = 'answerTwo' onclick = 'compareAnswersTwo()' /><label for = 'answerTwo'>" + answerText + "</label>";

    questionAnswer.appendChild(answerLiEl);

    //Answer #3
    var answerText = questions[questionsCounter].a3;

    var answerLiEl = document.createElement("li");
    answerLiEl.id = "list-answer-three";
    answerLiEl.innerHTML ="<input type = 'radio' name = 'answer-submission' id = 'answerThree' onclick = 'compareAnswersThree()' /><label for = 'answerThree'>" + answerText + "</label>";

    questionAnswer.appendChild(answerLiEl);
};

function removeElements(){

    var removeElement = document.getElementById("question-header-element");
    removeElement.remove();
    
    removeElement = document.getElementById("list-answer-one");
    removeElement.remove();

    removeElement = document.getElementById("list-answer-two");
    removeElement.remove();

    removeElement = document.getElementById("list-answer-three");
    removeElement.remove();
}

function compareAnswersOne(){
    if (questions[questionsCounter].correctAnswer === "a1"){
        answerHolder = 1;
    }

    else {
        answerHolder = 0;
    }
}

function compareAnswersTwo(){
    if (questions[questionsCounter].correctAnswer === "a2"){
        answerHolder = 1;
    }

    else {
        answerHolder = 0;
    }
}

function compareAnswersThree(){
    if (questions[questionsCounter].correctAnswer === "a3"){
        answerHolder = 1;
    }

    else {
        answerHolder = 0;
    }
}
    

function submitAnswer() {
    if (answerHolder === 1){
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
        //add a decrement to the timer when implimented here
    }

    console.log(pointsTotal);
};

createQuestion();
