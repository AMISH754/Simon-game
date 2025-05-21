var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var started=false;
var level=0;
$(document).keydown(function(){
if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
}

});

$(".btn").on("click",function handler(){
 var userChosenColour=$(this).attr('id');
 playSound(userChosenColour);
 userClickedPattern.push(userChosenColour);
 animatePress(userChosenColour);
 checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length==userClickedPattern.length){
        setTimeout(function(){
    nextSequence();
},1000);
        }
  

}
else{
console.log("wrong");
playSound("wrong");
$("body").addClass("game-over");
setTimeout(function(){
    $("body").removeClass("game-over");
},200);
$("#level-title").text("Game Over, Press Any Key to Restart");

startOver();
}
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.random();
    randomNumber=Math.floor(randomNumber*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
   
}




function playSound(name){
var audio=new Audio("./sounds/"+name+".mp3");
audio.play();
}

function animatePress(currentColour){
$("#"+currentColour).addClass("pressed");
setTimeout(function(){
$("#"+currentColour).removeClass("pressed");
},100);
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}


