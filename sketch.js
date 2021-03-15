var backGround,background_run;
var monkey , monkey_running,monkeyCollide,monkeyCollideImg; 
var banana ,bananaImage, obstacle, obstacleImage
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score;
var ground,groundImage;
var gameState = "play";
var bananas;
var ground;
var restart,restartImg;
var life = "one";
var button,j;
var w


function preload(){
  backGround_run = loadImage("jungle.jpg");
   monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png")
  
  t = loadAnimation("download-removebg-preview.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage   = loadImage("stone.png");
 jImg = loadImage("d.jpg")
 monkeyCollideImg=loadAnimation("Monkey_01.png");
  restartImg = loadAnimation("reset.png")
}

function setup() {
  createCanvas(600,500);
  
  backGround=createSprite(300,3,300,200);
  backGround.scale = 2;
  backGround.addImage (backGround_run);
  
   monkey=createSprite(50,340,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("t",monkeyCollideImg)
  monkey.addAnimation("s",t);
  monkey.scale=0.12;
  monkey.debug = true;

  
  
  
  ground = createSprite(70,480,600,10);
  ground.x = ground.width /2;
  ground.visible =false;
  
  


  
   
  obstacleGroup  = new Group();
  foodGroup = new Group();
  
 score = 0;
  bananas = 0;
  
  
}

function draw() {
  background(220);
  if (gameState==="play"){
    backGround.velocityX = -(8);
  if (backGround.x < 0){
    backGround.x = backGround.width/2;
    } 
    score = score + Math.round(getFrameRate()/60);
    obstacles();
    food() ;
    ground.velocityX = -(8 + 3* score/100);
  if (ground.x < 0){
    ground.x = ground.width/2;
 } 
  if(keyDown("space")&&monkey.y >= 300)  {
    monkey.velocityY = -18;
 }
    
    switch(score){ 
    case 50: monkey.scale = 0.12;
      break;
    case 100: monkey.scale = 0.14;
      break;
   case 150:monkey.scale = 0.18;
      break;
      default:break;
  }
    
   if(foodGroup.isTouching(monkey))  {
     bananas = bananas+1;
     foodGroup.destroyEach();
     
  }  if(obstacleGroup.isTouching(monkey)){
     monkey.scale = 0.12;
    gameState ="end"
    
  } 
   
 } else if (gameState==="end"){
    ground.velocityX = 0;
      monkey.velocityY = 0;
   backGround.velocityX = 0;
   
     
   monkey.changeAnimation("t",monkey)
      
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0); 
   
   j = createSprite( 200,200,20,20);
   j.addImage(jImg)
   j.scale = 0.1
   
 
   
   
     
  }
  
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  drawSprites();
  textSize(20);
  fill("red")
 text("Score: "+ score, 500,50);
 text("bananas:"+ bananas,300,50);
  
}

function obstacles(){
  if (frameCount%100===0) {
    obstacle=createSprite(620,454,20,20);
   obstacle.velocityX = -(9   + score/100);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.lifetime=300;
    obstacleGroup.add(obstacle);
  }
}


function food() {
  if (frameCount % 150 === 0) {
    banana = createSprite(620,490,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,190));
    banana.scale = 0.05;
    banana.velocityX=-3;

    banana.lifetime = 200;
    
    foodGroup.add(banana);
  }
}



