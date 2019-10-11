class Enemy {
  constructor(direction, x, speed, damage) {
    this.direction = direction;
    this.x = x;
    this.health = 20;
    this.damage = damage;
    this.isAlive = true;
    this.target = false;
    this.beenClickedByPlayer = false;
    this.speed = speed;
  }
  living() {
    if (this.health > 0) {} else {
      this.isAlive === false;
    };
  }
}
const orcBaseStats = {
  health: 100,
  isAlive: true,
  death() {
    if (this.health <= 0 && this.isAlive === true) {
      alert("Game Over");
      this.isAlive = false;
    }
  }
}

// Images
let backgroundImage = new Image();
backgroundImage.src = "images/orcGameBackground.jpg";
let enemyOne = new Image();
enemyOne.src = "images/noBKG_KnightRun_strip.png"; 
let enemyTwo = new Image();
enemyTwo.src = "images/noBKG_KnightRun_strip_left.png";
let orcGuardOne = new Image();
orcGuardOne.src = "images/idleOrcLeft.png"; 
let orcGuardTwo = new Image();
orcGuardTwo.src = "images/idleOrcright.png";
let orcBase = new Image ();
orcBase.src = "images/orcWarHouse.png";
let attackingEnemyOne = new Image ();
attackingEnemyOne.src = "images/noBKG_KnightAttack_strip.png";
let attackingEnemyTwo = new Image ();
attackingEnemyTwo.src = "images/noBKG_KnightAttack_stripreversed.png";


//time for timer

let timeLeft = 120

// Game Start, a very messy and long function. 
// window.onload 
document.getElementById("startButton").onclick = function() {
  
    setInterval(function(){

  // timer stuff
  let timer = document.getElementById("timer");
  timer.innerHTML = "Time Untill Cheiftain returns: "+ timeLeft+ "(s)";
  
  if(orcBaseStats.isAlive === true){
      timeLeft--;
  }
}, 1000)

  const canvas = document.getElementById("myCanvas");
  let enemies = [];

  canvas.width = backgroundImage.width;
  canvas.height = backgroundImage.height;

  const context = canvas.getContext("2d");

  let enemyOne_dx = 0;
  let enemyOne_dy = 150;
  let enemyOne_width = 96;
  let enemyOne_height = 64;

  let enemyTwo_dx = canvas.width - 10;
  let enemyTwo_dy = 150;
  let enemyTwo_width = 96;
  let enemyTwo_height = 64;
  let orcBase_dx = 345;
  let orcBase_dy = 110;
  let orcBase_width = 271;
  let orcBase_height = 92;
  let orcGuardOne_dx = 295;
  let orcGuardOne_dy = 150;
  let orcGuardOne_width = 45.8;
  let orcGuardOne_height = 40;
  let orcGuardTwo_dx = 618;
  let orcGuardTwo_dy = 150;
  let orcGuardTwo_width = 45.8;
  let orcGuardTwo_height = 40;
  let attackingEnemyOne_width = 144;
  let attackingEnemyOne_height = 64;
  let attackingEnemyTwo_width = 144;
  let attackingEnemyTwo_height = 64;
  //making some test enemies
  
  setInterval(function(){
    let random = Math.floor(Math.random() * 10) + 1;
    let speed = Math.floor(Math.random() * 20) + 1;
    let damage = Math.floor(Math.random() * 3) + 1;
    
    if(random === 3){
      enemies.push(new Enemy("right", enemyOne_dx, speed, damage)); console.log("Adding a Right")
    }
    else if(random === 8){
      enemies.push(new Enemy("left", enemyTwo_dx, speed, damage));  console.log("Adding a Left")
    }
  }, 300)
  enemies.push(new Enemy("right", enemyOne_dx, 1, 1));
  enemies.push(new Enemy("left", enemyTwo_dx, 1, 1));

  // Animations and drawing onto Canvas, 
  let hasEvents = false;
  let frame = 0
  let totalFrames = 8;
  let orcFrame = 0;
  let orcTotalFrames = 5;
  let attackFrame = 0
  let attackTotalFrames = 22;

  const enemyMovement = setInterval(function() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(backgroundImage, 0, 0);
    context.drawImage(orcBase, orcBase_dx, orcBase_dy);
    context.drawImage(orcGuardOne, orcFrame * orcGuardOne_width, 0, orcGuardOne_width, orcGuardOne_height, orcGuardOne_dx, orcGuardOne_dy, orcGuardOne_width, orcGuardOne_height);
    context.drawImage(orcGuardTwo, orcFrame * orcGuardTwo_width, 0, orcGuardTwo_width, orcGuardTwo_height, orcGuardTwo_dx, orcGuardTwo_dy, orcGuardTwo_width, orcGuardTwo_height);

    enemies.forEach(function(enemy, index) {
      if (enemy.beenClickedByPlayer === false && orcBaseStats.isAlive === true && enemy.direction === "right" && enemy.target === false && enemy.x < canvas.width && enemy.x > 0 || enemy.x === 0) {
        context.drawImage(enemyOne, frame * enemyOne_width, 0, enemyOne_width, enemyOne_height, enemy.x, enemyOne_dy, enemyOne_width, enemyOne_height);
        enemy.x+=enemy.speed;
      }

      if (enemy.beenClickedByPlayer === false &&orcBaseStats.isAlive === true && enemy.direction === "left" && enemy.target === false && enemy.x < canvas.width && enemy.x > 0 || enemy.x === canvas.width - enemyTwo.width) {
        context.drawImage(enemyTwo, frame * enemyTwo_width, 0, enemyTwo_width, enemyTwo_height, enemy.x, enemyTwo_dy, enemyTwo_width, enemyTwo_height);
        enemy.x-=enemy.speed;
      }
      if (enemy.beenClickedByPlayer === false && orcBaseStats.isAlive === true && enemy.direction === "right" && enemy.target === true) {
        context.drawImage(attackingEnemyOne, attackFrame * attackingEnemyOne_width, 0, attackingEnemyOne_width, attackingEnemyOne_height, enemy.x, enemyOne_dy, attackingEnemyOne_width, attackingEnemyOne_height);
      }
      if (enemy.beenClickedByPlayer === false && orcBaseStats.isAlive === true && enemy.direction === "left" && enemy.target === true) {
        context.drawImage(attackingEnemyTwo, attackFrame * attackingEnemyTwo_width, 0, attackingEnemyTwo_width, attackingEnemyTwo_height, enemy.x, enemyTwo_dy, attackingEnemyTwo_width, attackingEnemyTwo_height);
      }
      
      if(enemy.beenClickedByPlayer){
        let indexOfEnemy = enemies.indexOf(enemy);
        enemies.splice(indexOfEnemy, 1);
      }
      
      isCollision(enemy, enemy.x);
    })
    
    // win function

    if(timeLeft === 0 && orcBaseStats.isAlive === true){
      alert("You Win!")
      orcBaseStats.isAlive = false;
    }

    //frames for sprites 

    frame++;
    orcFrame++;
    attackFrame++;
    if (frame === totalFrames - 1) {
      frame = 0;
    }
    if (orcFrame === orcTotalFrames - 1) {
      orcFrame = 0;
    }
    if (attackFrame === attackTotalFrames - 1) {
      attackFrame = 0;
    }
    
    // Collision Logic and Calling 
    let x = 0;
    let y = 0;
    const mouse = {
      x: 0,
      y: 0,
      width: 1,
      height: 1
    }
    const getOffset = function(){
        let bodyRect = document.body.getBoundingClientRect();
        let elemRect = canvas.getBoundingClientRect();
        let offsetx = elemRect.left - bodyRect.left;
        let offsety = elemRect.top - bodyRect.top;
        return { x: offsetx, y: offsety}
      }
    const onMouseClick = function(){
      enemies.forEach(function(enemy, index){
        let isCollide = mouseCollide(mouse, enemyOne_width - 15, enemyOne_height, enemy.x, enemyOne_dy)
        if(isCollide === true){
          enemy.beenClickedByPlayer = true;
        }
      })
    }
    const mouseCollide = function(a, width, height, x, y){
        return !(
          ((a.y + a.height) < (y)) ||
          (a.y > (y + height)) ||
          ((a.x + a.width) < x) ||
          (a.x > (x + width))
          )
      }
      if(hasEvents === false){
    canvas.addEventListener('mousemove', function (e) {
               mouse.x = e.pageX - getOffset().x,
               mouse.y = e.pageY - getOffset().y
               //console.log(x + " " + y);
           });
     canvas.addEventListener("mousedown", onMouseClick);
     hasEvents = true;
   }
  }, 100);


  //Collision Logic
  let isCollision = function(enemy, x) {
    if(orcBaseStats.health <= 0)
    return;

    let enemy_Start = x;
    let enemy_End = x + enemyOne_width;

    let orcBase_Start = orcBase_dx;
    let orcBase_End = orcBase_dx + orcBase_width;

    //Orc Base Collision Logic 
    if (enemy.direction === "right" && enemy_End > orcBase_Start && enemy_Start < orcBase_End) {
      //console.log(orcBaseStats.health);
      enemy.target = true;
      orcBaseStats.health = orcBaseStats.health - enemy.damage;
      orcBaseStats.death()
    }
    if (enemy.direction === "left" && enemy_Start < orcBase_End && enemy_End > orcBase_Start) {
      //console.log(orcBaseStats.health);
      enemy.target = true;
      orcBaseStats.health = orcBaseStats.health - enemy.damage;
      orcBaseStats.death()
    }
    if ((enemy.direction === "right" && enemy.target === true) || (enemy.direction === "left" && enemy.target === true)) {
      document.getElementById("HQ").innerHTML = "Headquarters' Current Health: " + orcBaseStats.health;
    }
  }
}
