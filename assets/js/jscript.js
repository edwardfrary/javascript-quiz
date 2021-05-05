var questionsCounter = 0;
var questions = [];
var questionHeader = document.getElementById("question-header");
var questionAnswer = document.getElementById("answer-choice");

var questionsObj1 = {
    header: "How do you declare a variable?",
    a1: "var 'variableName' = 'data'",
    a2: "'data' = var 'variableName'",
    a3: "variable = 'variableName', 'data'",
    correctAnswer: "var 'variableName' = 'data'"
};

var questionsObj2 = {
    header: "How do you assign an Element to a variable by it's Id?",
    a1: "var 'variableName' = document.getElementById('ElementId')",
    a2: "'ElementId' = 'variableName' = document.GetElementbyName",
    a3: "var 'variableName' = document.getElementById('variableName')",
    correctAnswer: "var 'variableName' = document.getElementById('ElementId')"
};

questions.push(questionsObj1);
questions.push(questionsObj2);

var x = questions[2].length;
console.log(x);

function createQuestion() {

    // Here we create the header for the specific question
    var headerObj = questions[questionsCounter].header;
    var questionHeaderEl = document.createElement("h2");
    questionHeaderEl.textContent = headerObj;
    questionHeader.appendChild(questionHeaderEl);

    //Here we create the answer list with checkbox inputs
    var answerText = questions[questionsCounter].a1;

    var answerLiEl = document.createElement("li");
    var labelEl = document.createElement("label");
    labelEl.textContent = answerText;

    var inputBoxEl = document.createElement("input");
    inputBoxEl.type = "radio";
    inputBoxEl.name = "answer-submission";
    inputBoxEl.value = answerText;
    inputBoxEl.id = "answerOne";

    questionAnswer.appendChild(answerLiEl);
    answerLiEl.appendChild(inputBoxEl);
    answerLiEl.appendChild(labelEl);

    //Answer #2
    var answerText = questions[questionsCounter].a2;

    var answerLiEl = document.createElement("li");
    var labelEl = document.createElement("label");
    labelEl.textContent = answerText;

    var inputBoxEl = document.createElement("input");
    inputBoxEl.type = "radio";
    inputBoxEl.name = "answer-submission";
    inputBoxEl.value = answerText;
    inputBoxEl.id = "answerTwo";

    questionAnswer.appendChild(answerLiEl);
    answerLiEl.appendChild(inputBoxEl);
    answerLiEl.appendChild(labelEl);

    //Answer #3
    var answerText = questions[questionsCounter].a3;

    var answerLiEl = document.createElement("li");
    var labelEl = document.createElement("label");
    labelEl.textContent = answerText;

    var inputBoxEl = document.createElement("input");
    inputBoxEl.type = "radio";
    inputBoxEl.name = "answer-submission";
    inputBoxEl.value = answerText;
    inputBoxEl.id = "answerThree";

    questionAnswer.appendChild(answerLiEl);
    answerLiEl.appendChild(inputBoxEl);
    answerLiEl.appendChild(labelEl);
};

function submitAnswer(){
    var a1 = document.getElementsByName("answer-submission");
    console.log(a1);
};

console.log(questions);
createQuestion();
