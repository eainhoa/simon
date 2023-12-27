let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false; // hasi dan jakiteko
let level = 0;

//if // start the game with nextSequence()on the first keypress
$(document).keydown(function () {
  if (!started) {
    // zer da ! ??
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id"); // HAU EZ DET ULERTZEN (2)
  userClickedPattern.push(userChosenColour); // HAU EZ DET ULERTZEN (4)
  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1); // hau ulertu
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("succes");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//ondo
function nextSequence() {
  userClickedPattern = [];

  level++; //call next level
  $("#level-title").text("level " + level); //+1 nivel tituluan

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}
//ondo bukera

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animation grixa
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
