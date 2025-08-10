const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = new Array();
let userClickedPattern = new Array();
let randomNumber;
let randomChosenColour;
let userChosenColour;
let started = false;
let level = 0;
let scoreEl = $("#score");
let highScoreEl = $("#high-score");
let score = 0;
let _highScore = 0;

function startOver() {
  level = 0;
  gamePattern = new Array();
  userClickedPattern = new Array();
  started = false;
}

function checkAnswer(currentLevel) {
  if (gamePattern.at(currentLevel) === userClickedPattern.at(currentLevel)) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
        userClickedPattern = new Array();
      }, 1000);
      score += 10;
      scoreEl.text(`Score : ${score}`);
    }
  } else {
    if (score >= _highScore) {
      highScoreEl.text(`HighScore : ${score}`);
      _highScore = score;
      score = 0;
      scoreEl.text(`Score : ${score}`);
    } else {
      score = 0;
      scoreEl.text(`Score : ${score}`);
      highScoreEl.text(`HighScore : ${_highScore}`);
    }
    new Audio("./sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

const playSound = function (name) {
  new Audio(`./sounds/${name}.mp3`).play();
};

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  randomNumber = Math.trunc(Math.random() * 4);
  randomChosenColour = buttonColours.at(randomNumber);
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text(`Level ${level}`);
}

$(".btn").click(function () {
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.at(-1));
});
