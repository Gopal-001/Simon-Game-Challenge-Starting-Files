var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var count= 0;
var level = 0;
var h1 = $("#level-title");

$("body").keydown(function(e) {
  if(count === 0)
  {
    nextSequence();
    h1.text("Level 1");
  }
  count++;
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  userClickedPattern = [];
  level++;
  h1.text("Level " + level);
  playSound(randomChosenColour);
}

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(this.id);
  playSound(this.id);
  checkAnswer(userClickedPattern.length -1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function(){$("." + currentColour).removeClass("pressed");},100);
}

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
{
  if(userClickedPattern.length == gamePattern.length)
  {
    console.log("yea");
    setTimeout(function(){nextSequence();},800);
  }
}
  else
  {
    $("body").addClass("game-over");
    h1.text("Game Over, Press Any Key to Restart");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    playSound("wrong");
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  count= 0;
  level = 0;
}
