
var monkey , monkey_running, monkey_Collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score;
var ground;
var PLAY = 1;
var END = 0;
var gameState =1;
var survivalTime=0;
var score=0;
var spawnObstacles, spawnFood;

function preload(){
  firstImg = loadAnimation("sprite_0.png");
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
   createCanvas(600,600);
  
  // creating ground
   ground = createSprite(0,550,1200,10);
   ground.velocityX=-4;
   ground.x=ground.width/2;
   
  //creating Monkey
   monkey = createSprite(50,500,30,30);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.2;
  monkey.addAnimation("stop",firstImg)
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  
  survivalTime=0;
  score=0
  
}

function draw() {
  
  background("lightblue");
  textSize(30)
  text("Survival time: " + survivalTime,300,100);
  text("score " + score,300,150);   
  
  if (gameState===PLAY){
    ground.velocityX = -(6 + 3*score/100);
    
    survivalTime = Math.round(frameCount/getFrameRate())
  
    if(keyDown("space") && monkey.y >= 400) {
      monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    spawnFood();
    spawnObstacles();
    if(foodGroup.isTouching(monkey)){
         foodGroup.destroyEach();
         score=score+1;
         monkey.scale=monkey.scale+(score/100);   
    }
   
    if(obstacleGroup.isTouching(monkey)){
       gameState = END;
    }
  }
  else if (gameState === END) {
        text("Game Over", 300,300);
        ground.velocityX = 0;
        monkey.velocityY = 0;
        monkey.changeAnimation("stop",firstImg);
        obstacleGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
  }
  
  monkey.collide(ground);
  drawSprites();   
  
}
function spawnFood() {
   if(frameCount % 80 === 0) {
      banana = createSprite(600,550,40,10);
      banana.addImage(bananaImage);
      banana.y = Math.round(random(200,500));
      
      //monkey.depth = banana.depth + 1;
      
      banana.scale=0.05;
      banana.velocityX=-6;
      banana.lifetime = 300;
      foodGroup.add(banana);
   }
}

function spawnObstacles() {
  if(frameCount % 250 === 0) {
    obstacle = createSprite(600,530,10,40);
    obstacle.velocityX = -6; 
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}
