var road, mainCyclist;
var roadImage, mainCyclistImage1, mainCyclistImage2;
var bellSound;
var obstacle, obstacle1, obstacle2, obstacle3
var opponent;
var opponent1, opponent2, opponent3;
var opponent4, opponent5, opponent6;
var END = 0;
var PLAY = 1;
var WIN = 2;
var gameState = PLAY;
var gameover, gameoverImage;
var gameoverSound;
var distance = 0;
var win, winImage;
var mp, mpImage

function preload() {
  roadImage = loadImage("Road.png");
  opponent4 = loadImage("opponent3.png");
  opponent5 = loadImage("opponent6.png");
  opponent6 = loadImage("opponent9.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  mainCyclistImage1 = loadAnimation("mainPlayer1.png", "mainPlayer2.png");
  mainCyclistImage2 = loadImage("mainPlayer3.png");
  opponent1 = loadAnimation("opponent1.png", "opponent2.png");
  opponent2 = loadAnimation("opponent4.png", "opponent5.png");
  opponent3 = loadAnimation("opponent7.png", "opponent8.png");
  gameoverImage = loadImage("gameOver.png");
  bellSound = loadSound("bell.mp3")
  gameoverSound = loadSound("GameoverSound.mp3")
  winImage = loadImage("Win.jpg")
  mpImage = loadAnimation("mainPlayer1.png")
}

function setup() {

  createCanvas(900, 300);

  // Moving background
  road = createSprite(100, 150);
  road.addImage(roadImage);

  gameover = createSprite(450, 150);
  gameover.addImage(gameoverImage)
  win = createSprite(450, 150)
  win.addImage(winImage)
  win.scale = 0.5
  //creating boy running
  mainCyclist = createSprite(70, 150, 20, 20);
  mainCyclist.addAnimation("SahilRunning", mainCyclistImage1);
  mainCyclist.addAnimation("fell", mainCyclistImage2);
  mainCyclist.addAnimation("win", mpImage)
  mainCyclist.scale = 0.06;
  mainCyclist.debug = false;
  mainCyclist.setCollider("circle", 0, 0, 700);
  obstacleGroup = new Group();
  opponentGroup = new Group();
}

function draw() {
  background(0);

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance + " m", 400, 30);

  if (gameState === PLAY) {
    gameover.visible = false;
    win.visible = false;
    mainCyclist.y = World.mouseY;
    obs();
    opp();
    decider();
    mainCyclist.changeAnimation("SahilRunning", mainCyclistImage1)
    road.velocityX = -(10 + distance / 10);
    edges = createEdgeSprites();
    mainCyclist.collide(edges);
    if (keyDown("space")) {
      bellSound.play();
    }
    //code to reset the background
    if (road.x < 0) {
      road.x = width / 2;
    }
    distance = distance + Math.round(frameRate() / 60);
  }

  if (gameState === WIN) {
    win.visible = true
    mainCyclist.changeAnimation("win", mpImage)
    obstacleGroup.setVelocityXEach(0);
    //opponentGroup.setVelocityXEach(0);
    opponentGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    road.velocityX = 0;
    text("Press up arrow key to restart", 320, 270);
    if (keyDown("up")) {
      reset();

    }
  }

  if (gameState === END) {

    obstacleGroup.setVelocityXEach(0);
    //opponentGroup.setVelocityXEach(0);
    opponentGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    road.velocityX = 0;
    text("Press up arrow key to restart", 320, 210);
    gameover.visible = true;
    mainCyclist.changeAnimation("fell", mainCyclistImage2)
    if (keyDown("up")) {
      reset();

    }

  }
}

function obs() {
  if (frameCount % 100 === 0) {
    var rand2 = Math.round(random(20, 280))
    obstacle = createSprite(950, rand2, 20, 20);
    obstacle.velocityX = road.velocityX;
    obstacle.scale = 0.1;
    obstacle.lifetime = 95
    obstacle.debug = false;
    obstacle.setCollider("circle", 0, 0, 300);
    var rand3 = Math.round(random(1, 3))
    switch (rand3) {
      case 1: obstacle.addImage("cone", obstacle1);
        break;
      case 2: obstacle.addImage("hole", obstacle2);
        break;
      case 3: obstacle.addImage("nails", obstacle3);
        break;
      default: break;

    }
    obstacleGroup.add(obstacle);
  }
}

function opp() {
  if (frameCount % 120 === 0) {
    var rand5 = Math.round(random(20, 280))
    opponent = createSprite(950, rand5, 20, 20);
    opponent.addAnimation(opponent4);
    opponent.addAnimation(opponent5);
    opponent.addAnimation(opponent6);
    opponent.velocityX = road.velocityX;
    opponent.scale = 0.06;
    opponent.lifetime = 95;
    opponent.debug = false;
    opponent.setCollider("circle", 0, 0, 700);
    var rand6 = Math.round(random(1, 3))
    switch (rand6) {
      case 1: opponent.addAnimation("red", opponent1);
        break;
      case 2: opponent.addAnimation("yellow", opponent2);
        break;
      case 3: opponent.addAnimation("blue", opponent3);
        break;
      default: break;

    }
    opponentGroup.add(opponent);
  }
}
function decider() {
  var rand6 = Math.round(random(1, 3))
  if (mainCyclist.isTouching(obstacleGroup)) {
    gameState = END;
    gameoverSound.play();
    opponent.velocityX = -(road.velocityX);
  }
  if (mainCyclist.isTouching(opponentGroup)) {
    gameState = END;
    gameoverSound.play();
    opponent.velocityX = -(road.velocityX);
  }
  if (distance === 200) {
    gameState = WIN
    console.log("Hi")
  }
}
function reset() {
  gameState = PLAY;

  obstacleGroup.destroyEach();
  opponentGroup.destroyEach();
  distance = 0;

}