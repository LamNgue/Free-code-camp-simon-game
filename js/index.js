
var userSequence = [];
var randomSequence = [];
var userPlay = false;
var round = 1;
var strictMode = false;
////////
$(document).ready(function(){
  $(".announce").html("Round: " + round);
  var red = document.getElementById("redSo");
  var green = document.getElementById("greenSo");
  var blue = document.getElementById("blueSo");
  var yellow = document.getElementById("yellowSo");
  //////
  function startGame() {
    userSequence = [];
    randomSequence = [];
    round = 0;
    generateSequence();
  }
  $("#start").click(function() {
    startGame();
  });
  $("#strict").click(function(){
    strictMode = true;
  });
  function addSoundAndLight(square) {
    var $square = $(".square[data-square=" + square + "]").addClass("lightUp");
    window.setTimeout(function() {
      $square.removeClass("lightUp");
    }, 300);
    if (square == 1) {
      blue.play();
    }
    if (square == 2) {
      red.play();
    }
    if (square == 3) {
      yellow.play();
    }
    if (square == 4) {
      green.play();
    }
  }
  
  function generateSequence(){
    if (round == 20){
      $(".announce").html("You win!");
      resetGame();
    }
    var random = Math.floor(Math.random() * 4) + 1;
    randomSequence.push(random);
    makeAIMove(randomSequence);
  }
  
  function makeAIMove(asequence) {
    var i = 0;
    var interval = setInterval(function() {
        addSoundAndLight(asequence[i]);
        i++;
        if (i >= asequence.length) {
            clearInterval(interval);
        }
   }, 800);
}
    userPlay = true;
    if (userPlay === true) {
      makeUserMove();
    }  
  
  function makeUserMove() {
    $(".square").on("click",function() {
      var id = $(this).data("square");
      addSoundAndLight(id);
      userSequence.push(id);
      if(userSequence.length === randomSequence.length){
       compareResponse();
     }
    });
    userPlay = false;
   }

  function compareResponse() {
    if (randomSequence.toString() === userSequence.toString()) {
      $(".announce1").html("You were correct");
      userSequence = [];
      generateSequence();
      makeAIMove(randomSequence);
      round+=1;
      $(".announce").html("Round: " + round);
    } 
    else if (strictMode === true){
      $(".announce1").html("You were Wrong. Play again please");
      window.setTimeout(resetGame,2000);
    }
    else {
      $(".announce1").html("You were Wrong. I am playing the sequence again");
      userSequence = [];
      makeAIMove(randomSequence);
      $(".announce").html("Round: " + round);
    }
  } 
 function resetGame(){
   start = false;
   userSequence = [];
   randomSequence = [];
   userPlay = false;
   round = 0;
   strictMode = false;
   $(".announce").html("Round: " + round);
   $(".announce1").html("Click start button");
 }
 $("#reset").click(function(){
   resetGame();
 });
});