let width = 300;
let height = 250;
let posX = 115;//120
let posY = height - 50;
var aPosX = 20;
var aPosY = 0;
var score =0;
var gameBox = document.querySelector('.game_box');
var ballDiv = document.querySelector('.ball_div');
var glovesDiv = document.querySelector('.gloves_div');
var selectorDiv = document.querySelector('.selector_div');
var glovesArea = document.querySelector('.gloves_area');
var timer = document.querySelector('#timer');
var leftMove = document.querySelector('.left_move');
var rightMove = document.querySelector('.right_move');
let counter = 15;//20

var totalScore = setInterval(function () {
    document.getElementById('write').innerText = score<10? "0"+score:score;
},1)

var slide2 = document.querySelector('.slide_2');
var interval;
selectorDiv.addEventListener('click', checkIT);

function checkIT() {
    leftMove.classList.add('hidden');
    rightMove.classList.add('hidden');
    glovesDiv.addEventListener("touchmove", touchDetect);
    glovesArea.addEventListener("mousemove", mouseDetect);
    selectorDiv.classList.add('hidden');
	ballDrop();
    interval = setInterval(function () {
        counter--;
        if (score>= 10 && counter < 0){
            clearInterval(totalScore);
            clearInterval(ballRmv);
            clearInterval(interval);
            gameBox.classList.add('hidden');
            slide2.classList.remove('hidden');
            slide2.classList.add('show');
            document.getElementById('result').innerHTML = "Tremendous Performance!";
        }
        else if(score < 10 && counter < 0){
            clearInterval(totalScore);
            clearInterval(ballRmv);
            clearInterval(interval);
            gameBox.classList.add('hidden');
            slide2.classList.remove('hidden');
            slide2.classList.add('show');
            document.getElementById('result').innerHTML = "Very Poor Attempt!";
        }
        else{
            timer.innerText=counter;
        }
        document.getElementById('time2').innerHTML = "You Take "+ score + " Catches!";
        document.getElementById('total_count').innerHTML = "In " + 15 + " Seconds!";
    },1000)
}

var ballRmv,boundaryWall;
function ballDrop(){
    ballRmv = setInterval(function () {
        ballDiv.style.top = aPosY+"px";
        ballDiv.style.left = aPosX+"px";
        aPosY+= 8;
        if(aPosY >= height-37){//50
            var aPoX = Math.random() * width;
            aPosX = Math.round(aPoX)
            while(aPosX % 25 != 0){
                aPosX--;
            }
            if (aPoX >= width){
                aPosX - 25;
            }
            aPosY = 0;
        }
    },15);
}

var touchAlert,mouseAlert;

//mouse
function mouseDetect(e){
    e.preventDefault();
    mouseAlert = e.clientX;
    if (mouseAlert<0) {
        glovesDiv.style.left = 0+"px";
    }
    else if(mouseAlert>=260){
        glovesDiv.style.left = 260+"px";
    }
    else{
        glovesDiv.style.left = mouseAlert+"px";
    }

    boundaryWall = Math.abs(aPosX - mouseAlert)<=0? 10 : Math.abs(aPosX - mouseAlert);
    if ( boundaryWall<= 45 && Math.abs(aPosY - posY) <= 10){
         var aPoX = Math.random() * width;
         while(aPosX <= 25){
            aPosX++;
        }
        aPosX = Math.round(aPoX)
        while(aPosX % 25 != 0){
                aPosX--;
        }
        if (aPoX >= width){
         aPosX - 25;
        }
        aPosY = 0;
        score += 1;
    }
}

//touch
function touchDetect(e){
    touchAlert = Math.round(e.touches[0].clientX);
    if (touchAlert<0) {
        glovesDiv.style.left = 0+"px";
    }
    else if(touchAlert>=260){
        glovesDiv.style.left = 260+"px";
    }
    else{
        glovesDiv.style.left = touchAlert+"px";
    }

    boundaryWall = Math.abs(aPosX - touchAlert)<=0? 10 : Math.abs(aPosX - touchAlert);
    if ( boundaryWall<= 45 && Math.abs(aPosY - posY) <= 10){
         var aPoX = Math.random() * width;
        while(aPosX <= 25){
            aPosX++;
        }
        aPosX = Math.round(aPoX)
        while(aPosX % 25 != 0){
            aPosX--;
        }
        if (aPoX >= width){
            aPosX - 25;
        }
        aPosY = 0;
        score += 1;
    }
}

//reset
var restart = document.querySelector('.restart img');
restart.addEventListener("click",playAgain);
function playAgain(){
    counter=15;
    totalScore = 0;
    score= 0;
    interval = 0;
    ballRmv = 0;
    totalScore = setInterval(function () {
    document.getElementById('write').innerText = score<10? "0"+score:score;
    },1)
    gameBox.classList.remove('hidden');
    // glovesDiv.classList.add('show');
    slide2.classList.remove('show');
    slide2.classList.add('hidden');
    selectorDiv.classList.remove('hidden');
    checkIT();
}
