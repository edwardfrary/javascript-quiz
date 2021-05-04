var questionsCounter = 0;
var questions = [];
var questionHeader = document.getElementById("question-header");
var questionAnswer = document.getElementById("answer-choice");

var questionsObj1 = {
    header: "How do you declare a variable?",
    answer1: "var 'variableName' = 'data'",
    answer2: "'data' = var 'variableName'",
    answer3: "variable = 'variableName', 'data'"
};

var questionsObj2 = {
    header: "How do you assign an Element to a variable by it's Id?",
    answer1: "var 'variableName' = document.getElementById('ElementId')",
    answer2: "'ElementId' = 'variableName' = document.GetElementbyName"
};

questions.push(questionsObj1);
questions.push(questionsObj2);

function createQuestion(){
var headerObj = questions[questionsCounter].header;
var questionHeaderEl = document.createElement("h2");
questionHeaderEl.textContent = headerObj;
questionHeader.appendChild(questionHeaderEl);
}

console.log(questions);
createQuestion();