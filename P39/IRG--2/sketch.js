var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost, ghostImg;
var invisible, invisibleGroup;
var score = 0;  
var endImg, end;
var gameState = "play";

function preload() {

  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  endImg = loadImage("end.png")
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = +1;

  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4;

  end = createSprite(1000,1000,600,600);
  end.addImage("end", endImg);


  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleGroup = new Group();
}

function draw() {
  background(0);
  

  if (gameState === "play") {
    if (tower.y > 400) {
      tower.y = 300;
    }
    ghostControls();
    spawnDoors();
  }
  if (score===15){
    gameState = "win"
  }

  drawSprites();

  textSize(24);
  fill('white');
  text('Score: '+score,10,20);

  textSize(24);
  fill("white");
  text('Pass 15 doors to win the game!',150,20)

  if (gameState === "end") {
    tower.velocityY = 0
    textSize(30);
    fill("red");
    text("Game Over", 230, 250);
  }

  if (gameState === "win"){
    tower.velocityY = 0
    door.velocityY = 0;
    climber.velocityY = 0;
    invisible.velocityY = 0;
    textSize(30);
    fill("yellow")
    text("The Ghost has reached his location!",50,100);
  }

}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50)
    door.addImage("door", doorImg);

    climber = createSprite(200, 10);
    climber.addImage("climber", climberImg);

    invisible = createSprite(200, 15);
    invisible.width = climber.width;
    invisible.height = 2;

    invisible.visible = false;

    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    invisible.x = door.x;

    door.velocityY = +1;
    climber.velocityY = +1;
    invisible.velocityY = +1;

    door.lifetime = 700;
    climber.lifetime = 700;
    invisible.lifetime = 700;

    ghost.depth = door.depth;
    ghost.depth += 1;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleGroup.add(invisible);

    score++
  }
}

function ghostControls() {
  if (keyDown("left_arrow")) {
    ghost.x -= 3;
  }
  if (keyDown("right_arrow")) {
    ghost.x += 3;
  }
  if (keyDown("space")) {
    ghost.velocityY = -5;
  }
  ghost.velocityY += 0.8;
  if (climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
  if (invisibleGroup.isTouching(ghost) || ghost.y > 600) {
    ghost.destroy();
    gameState = "end";
  }
}