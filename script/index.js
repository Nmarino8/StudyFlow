// User data elements
var studyScore = document.getElementById("study-score");
var currentStreak = document.getElementById("current-streak");
var studiedToday = document.getElementById("studied-today");
var weaklyGoalProgress = document.getElementById("weekly-goal-progress");
// Upcoming users exams element
var numberOfExams = document.getElementById("number-of-exams");

// Button elements
function StartStudyBtn() {
    window.location.href = "stopwatch.html";
}

// Greeting message update
var greetingMsg = document.getElementById("greeting-msg");
function updateGreeting() {
    var now = new Date();
    var hours = now.getHours();
    if (hours < 12) {
        greetingMsg.textContent = "Good Morning!";
    } else if (hours < 18) {
        greetingMsg.textContent = "Good Afternoon!";
    } else {
        greetingMsg.textContent = "Good Evening!";
    }
}
updateGreeting();   