
//---globals--------
buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
gameStarted = false;
level = 0;
//---------------------

//---get the next gamePattern colour---
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  console.log(gamePattern);
}

//---main game logic is followed here after a button press--
function addListeners() {
  $(".btn").on("click", function() {
    var userChosenColour = this.id; //event.target.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//--check user checkAnswer------------------------
//--if this is the last colour of the current sequence, start next
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {//last colour is correct
      setTimeout(nextSequence, 1000);
    }
  } else {

    //-----play wrong.mp3-------
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    //---------------------------
    //---flash red background----------
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    //---------change heading------------
    $("h1").text("Game Over, Press Any Key To Restart");
    //---start over--------
    startOver();
  }
}

function startOver() {
  gameStarted = false;
  level = 0;
  gamePattern = [];
}

addListeners();
$(document).on("keydown", function() {
  if (gameStarted === false) {
    $("h1").text("Level 0");
    nextSequence();
  }
});
