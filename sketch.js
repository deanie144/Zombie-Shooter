var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bluemonster, purplemonster, greenmonster;
var theif;
var score = 0;
var life = 3;
var bullets = 30;
var gameState = "start"
var heart1_img, heart2_img, heart_img;
var lose, win, explosion;

function preload(){
  shooterImg = loadImage("assets/shooter_1.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bluemonster = loadImage("assets/bluemonster.PNG")
  purplemonster = loadImage("assets/purple monster.png")
  zombie = loadImage("assets/zombie.png")
  heart1_img = loadImage("assets/heart_1.png")
  heart2_img = loadImage("assets/heart_2.png")
  heart3_img = loadImage("assets/heart_3.png")
  bgImg = loadImage("assets/Second road.jpg")
  lose = loadSound("assets/lose.mp3")
  win = loadSound("assets/win.mp3")
  explosion = loadSound("assets/explosion.mp3")


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
bg = createSprite(0,0,width,height)
bg.addImage(bgImg)
bg.scale = 6.5;
bg.velocityX = -2;

//creating the player sprite
player = createSprite(90, displayHeight-300, 50, 50);
player.addImage(shooterImg)
player.scale = 0.5
player.debug = true
player.setCollider("rectangle",0,0,300,300)

heart1 = createSprite(displayWidth - 150, 40, 20, 20);
heart1.visible = false;
heart1.addImage(heart1_img)
heart1.scale = 0.4

heart2 = createSprite(displayWidth - 100, 40, 20, 20);
heart2.visible = false
heart2.addImage(heart2_img)
heart2.scale = 0.4

heart3 = createSprite(displayWidth - 150, 40, 20, 20);
heart3.visible = false
heart3.addImage(heart3_img)
heart3.scale = 0.4

button = createImg('assets/reset.png')
button.position(500,80)
button.size(70,70)
button.mouseClicked(()=>{
window.location.reload()
});
  
   obstaclesGroup = new Group();
   bulletGroup = new Group();
}

function draw() {
  background(0);
  if(bg.x < 0) {
    bg.x = bg.width / 4;
  }

if(gameState === "start") {

if (life === 3) {
  heart3.visible = true;
  heart1.visible = false;
  heart2.visible = false;
}
if(life === 2) {
  heart2.visible = true;
  heart3.visible = false;
  heart1.visible = false;
}
if (life === 1) {
  heart1.visible = true;
  heart2.visible = false;
  heart3.visible = false;
}
if(life === 0) {
  heart1.visible = false;
  heart2.visible = false;
  heart3.visible = false;
}
if(bullets === 0 || life === 0) {
  gameState = "End";  
}
if(score === 6) {
  gameState = "won";
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet = createSprite(displayWidth - 1150, player.y - 30, 20, 10);
 bullet.velocityX = 20;
 bulletGroup.add(bullet);
 player.depth = bullet.depth;
 player.depth = player.depth+2;
 player.addImage(shooter_shooting)
 explosion.play()
 bullets = bullets - 1;
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(bulletGroup.isTouching(obstaclesGroup)) {
  for(var i = 0; i < obstaclesGroup.length; i++) {
    if(obstaclesGroup[i].isTouching(bulletGroup)) {
      obstaclesGroup[i].destroy();
      bulletGroup.destroyEach();
      score = score+2;
    }
  }
}
if(obstaclesGroup.isTouching(player)) {
  lose.play();
  for(var i = 0; i < obstaclesGroup.length; i++) {
    if(obstaclesGroup[i].isTouching(player)) {
      obstaclesGroup[i].destroy();
      life = life - 1;
    }
  }
}

spawnObstacles();
}
drawSprites();

textSize(30);
fill("black")
text("Bullets =  "+bullets, displayWidth - 210, displayHeight / 2 - 250)
text("Score = "+score, displayWidth - 200, displayHeight / 2 - 220)

if(gameState === "End") {
  player.destroy();
  bg.velocityX = 0;
  textSize(50);
  fill("black")
  text("Game Over!!", 700, 700);
  lose.play();
  obstaclesGroup.destroyEach();
} 
else if(gameState === "won") {
  textSize(50)
  fill("black")
  text("You Won!!", 700, 700);
  player.destroy();
  bg.velocityX = 0;
  win.play();
  bstaclesGroup.destroyEach();
}
}



function spawnObstacles() { 
  if(frameCount % 60 === 0) { 
    var obstacle = createSprite(random(100,windowWidth), 700, 10,40); 
    //obstacle.debug = true; 
    obstacle.velocityX = -6
    //generate random obstacles 
    var rand = Math.round(random(1,3)); 
    switch(rand) { 
      case 1: obstacle.addImage(zombie); 
      break; 
      case 2: obstacle.addImage(purplemonster); 
      break; 
      case 3: obstacle.addImage(bluemonster); 
      break; 
       default: 
       break; 
    }
      //assign scale and lifetime to the obstacle 
      obstacle.scale = 0.2;
     obstacle.lifetime = 300; 
      //add each obstacle to the group 
      obstaclesGroup.add(obstacle); } 
    }