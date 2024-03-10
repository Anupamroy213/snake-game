const playBoard= document.querySelector(".play-board");

let foodX,foodY;
let snakeX=5,snakeY=10;
let velocityX=0;
let velocityY=0;
let snakeBody=[];
let gameOver=false;
let score=0;
let setIntervalId;

let highScore=localStorage.getItem("high-score") || 0;
const changeFoodPosition=() =>{
    foodX=Math.floor(Math.random() * 30)+1;
    foodY=Math.floor(Math.random() * 30)+1;
}

const handleGameOver=() =>{
    clearInterval(setIntervalId);
    alert("game over ");
    // initGame();
    location.reload();
}

const changeDirection=(e)=>{
    // console.log(e);
    if(e.key === "ArrowUp" && velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }
    else if(e.key === "ArrowDown"&& velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }
    else if(e.key === "ArrowLeft"&& velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }
    else if(e.key === "ArrowRight"&& velocityX!=-1){
        velocityX=1;
        velocityY=0;
    }
    initGame();
    
}
const initGame=()=>{

    if(gameOver)return handleGameOver();
    let htmlMarkup=`<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;
    
    if(snakeX === foodX && snakeY===foodY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);
        score++;
        
        msg.innerHTML="Score : "+score;
        highScore=score>=highScore? score:highScore;
        localStorage.setItem("high-score",highScore);
        msg1.innerHTML="High Score : "+highScore;
    }
    msg1.innerHTML="High Score : "+highScore;
    

    for(let i=snakeBody.length-1;i>0;i--){
                snakeBody[i]=snakeBody[i-1];
    }
snakeBody[0]=[snakeX,snakeY];

    snakeX+=velocityX;
    snakeY+=velocityY;

    if(snakeX <=0||snakeX>30 ||snakeY <=0||snakeY>30){
        gameOver=true;
    }
    let c=-1;
    
    for(let i=0;i<snakeBody.length;i++){
        htmlMarkup +=`<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
         if(i !==0 && snakeBody[0][1]===snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver=true;
         }

       
    }
    playBoard.innerHTML=htmlMarkup;
}

changeFoodPosition();
setIntervalId = setInterval(initGame,100);

document.addEventListener("keydown",changeDirection);