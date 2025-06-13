let obstacles = [];
let dinos=document.getElementsByClassName("dino");
let gameArea=document.getElementsByClassName("dinogame");
let easy=document.getElementsByClassName("button1");
let hard=document.getElementsByClassName("button2");
let dinocoin=document.getElementsByClassName("dinocointext")[0];
//game starts points = 0
let points=0;
let dinogame = gameArea[0];
let dinospeed = 10;
let dino = dinos[0];
let spawn = 2700;
let spawntimer;

function easybutton(){
  dinospeed = 10;
}
function hardbutton(){
  dinospeed = 60;
}

function incscore(){
  points++; 
  // console.log(points);
  dinocoin.textContent = 'Your score: ' + points;
}
// this function makes the dino jump
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
      dinoJump(); // Call our jump function
    }
  });
  function endGame(){
    // alert('Game Over!');
  clearInterval(gameTimer);   // Stop moving obstacles
  clearInterval(spawnTimer);  // Stop creating obstacles
  document.getElementById("youlose").textContent = "you lose!";
  window.location.reload();   // Restart the game


  }
  function detectlose(){
    var dinoRect = dino.getBoundingClientRect();   // invisible box around dino

  // Loop through each obstacle we’ve spawned so far
  for (var i = 0; i < obstacles.length; i++) {
    
    var obsRect = obstacles[i].getBoundingClientRect(); // box around obstacle
    if (dinoRect.left <  obsRect.left + obsRect.width &&
        dinoRect.left + dinoRect.width > obsRect.left &&
        dinoRect.top  <  obsRect.top  + obsRect.height &&
        dinoRect.top  + dinoRect.height > obsRect.top) {
      endGame(); 
      break;
        }
  }
  }

  function startgame(){

    startMovingObstacles()
    startSpawningObstacles()
  }


function dinoJump(){
    if (dino.classList.contains('jump')) {
        return; // If it's already jumping, do nothing
      }
      dino.classList.add('jump');       // Start jump animation
      setTimeout(function() {
        dino.classList.remove('jump');  // End jump after 0.5 seconds
      }, 500);
}

function createobstacle(){
    let obstacle = document.createElement("div");
    obstacle.classList.add("obstacle")
    obstacle.style.left = dinogame.offsetWidth + 'px'; // Position at right edge
  dinogame.appendChild(obstacle);                 // Show it in the game area
  obstacles.push(obstacle);
}


function startMovingObstacles() {

  gameTimer = setInterval(function () {
    // incscore();
    moveObstacles();  
    detectlose();
    removeOffscreenObstacles()
    // incscore();
  }, 20);
}

function moveObstacles(){
  
  for (var i = 0; i < obstacles.length; i++) {
      var obs       = obstacles[i];                 // pick one obstacle
      var currentX  = parseInt(obs.style.left, 10); // where is obstacle at the moment
      obs.style.left = (currentX - dinospeed) + 'px'; // shift obstacle to the left
     
  }
}


// Begin the loop that spawns new obstacles at spawnRate (declared above)
function startSpawningObstacles() {
  
  spawntimer = setInterval(function() {
    createobstacle();

  }, spawn);
}
/* Whenever an obstacle scrolls off the left edge, we remove it and reward the player with a point. */
function removeOffscreenObstacles() {
  for (var i = obstacles.length - 1; i >= 0; i--) {
    var obs = obstacles[i];
    var x   = parseInt(obs.style.left, 10);

    if (x + obs.offsetWidth < 0) {       // obstacle is totally off-screen
      dinogame.removeChild(obs);         
      obstacles.splice(i, 1); 
      incscore()
    }
  }
}


startgame();
// startSpawningObstacles()
// createobstacle()
// startMovingObstacles()
// document.addEventListener('keydown', function(e) {
//     if (e.code === 'Space') {
//       dinoJump(); // Call our jump function
//     }
//   });

//he forgot 1 thing 
