// alert("hi");
//this array stores all 4 colour name as we named button's class
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//to know when game is started
//start level with 0
var started = false;
var level = 0;

//when user will press any key the game will start
//change the h1 tag to level number and call for nextSequence function
//this call will only called when game is over and user pressed any key to restart the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//when user will click any color button this function will be called
//this will store the id of cliked button and pushes the userChosenColour into userCLickedPattern array
//this function will also call playSound, animatePress and checkAnswer function
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


//This function will check if gamePattern array and userClickedPattern array is same or not
//for checking both array we need to check only that level's element of both arrays 
//if both are same, add another if condition if both arrays' lengths are same call for next sequence after some seconds delay
//else both arrays are not same than play wrong sound audio and add class game-over from css file
//change the h1 tag's text to "Game Over, Press Any Key to Restart" 
//remove game-over class after some seconds delay and call for startOver function to restart the game
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

//this next sequence function will make new sequence randomly 
//first we need to empty userClickedPattern because every time user need to remeber sequence and presse button according to it again
//update(increment) the level by 1 and change h1 tag's text to current level value
//create random number and with the help of random number chose colour from buttonColours array and push that into gamePattern array(use random number as index of array)
//give flash animation to randomChosenColour button and play audio according to it 
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//This function will generate animation for userClickedButton
//thsi function will add class pressed from css file
//remove this class after some seconds delay 
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//it will play sound when user will click any button
//it will make sound according to user clicked button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//when userClickedPattern and gamePAttern array not make this function will set current level to 0 and make gamePattern array empty;
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
