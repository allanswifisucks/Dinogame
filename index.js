let obstacles = [];
let dinos=document.getElementsByClassName("dino");
let gameArea=document.getElementsByClassName("dinogame");
let easy=document.getElementsByClassName("button1");
let hard=document.getElementsByClassName("button2");
let dinocoin=document.getElementsByClassName("dinocoin");
let dinogame = gameArea[0];
let dinospeed = 10;
let dino = dinos[0];
let spawn = 2700;
let spawntimer;
// this function makes the dino jump
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
      dinoJump(); // Call our jump function
    }
  });
  function endGame(){
    alert('Game Over!');
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
    moveObstacles();  
    detectlose();
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