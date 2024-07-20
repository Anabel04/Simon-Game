
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function(event){
    
    if(!started){
        
        $("#level-title").text("Level " + level);
        nextSequence(); 
        started = true; 
    };

});


$(".btn").click (function(){

    var userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);


});


function checkAnswer(currentLevel){

    console.log(gamePattern[currentLevel]);
    console.log(userClickedPattern[currentLevel]);

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log(gamePattern[currentLevel]);
        console.log("success");

        if(gamePattern.length === userClickedPattern.length){
            
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }else{ 
        
        console.log("Wrong")

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    };

};


function nextSequence(){
    
    
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level); 

    var randomNumber= Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    console.log(gamePattern[0]);

    var colorAnimation = "#" + randomChosenColour
    $(colorAnimation).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    
    playSound(randomChosenColour);


};


function playSound(name){

    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();

};


function animatePress(currentColour){
    var selector =  "#" + currentColour;
    $(selector).addClass("pressed");
    
    setTimeout(function() {
        $(selector).removeClass("pressed");
    }, 100);
    

};


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
};
