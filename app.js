var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

$("#start").one("click", function () {
  $("#level-title").text("Level " + level);
  nextSequence();
});

// Next sequence

function nextSequence() {
  level = level + 1;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];

  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(150)
    .fadeIn(150);

  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    $("#level-title").text("Game Over! Click the button to play again.");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startAgain();
  }
}

function startAgain() {
  level = 0;
  gamePattern = [];
  $("#start").one("click", function () {
    $("#level-title").text("Level " + level);
    nextSequence();
  });
}

// Getting the color that the user clicked and pushing it to an array.

$(".btn").on("click", function (e) {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var boxAudio = new Audio("./sounds/" + name + ".mp3");
  boxAudio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
