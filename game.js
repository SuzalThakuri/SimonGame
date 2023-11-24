//declarations and initiations
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

//function to play the sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//function to animate the buttons when pressed
function animatePress(currcolor) {
  $("#" + currcolor).addClass("pressed");
  setTimeout(function () {
    $("#" + currcolor).removeClass("pressed");
  }, 100);
}

//function to check the answers of the input
function checkAns(currlevel){
    if (userClickedPattern[currlevel] === gamePattern[currlevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }else{
        playSound("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("GAME OVER, press any key to restart.");
        startOver();
    }
}

//function to restart the game
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

//function to continue the game
function nextSequence() {
  $("#level-title").text("Level " + level);
  level++;

  userClickedPattern = [];

  var ranNum = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[ranNum];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);

  playSound(userChosenColor);
}

//function to start the game when any key is pressed
$(document).on("keypress", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//function to play to game 
$(".btn").on("click", function () {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAns(userClickedPattern.length-1);
});