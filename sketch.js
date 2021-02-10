var Asteroid,Torpedo,SpaceShip,Earth,YouFailed;
var SpaceBackground;
var score=0;
var PLAY=1
var END=0;
var NEUTRAL=2
var gameState=PLAY;
var gameOver;
var Asteroid_collided;
var SurvivalTime=0;
var youfailed;
var asteroid;
var reset, reset1;
function preload(){
SpaceBackground=loadImage("Space Background.png");
Asteroid=loadImage("Asteroid.png");
Asteroid_collided=loadImage("Asteroid Impact.png");
SpaceShip_collided=loadImage("Asteroid Impact.png");
Torpedo=loadImage("Torpedo.png");
SpaceShip=loadImage("SpaceShip.png");
Earth=loadImage("Pixelated Earth The objective is to protect it.png");
gameOver=loadImage("Game Over.png")
YouFailed=loadImage("Wasted Png.png")
reset=loadImage("Reset Img.png")
}

function setup(){
createCanvas(windowWidth, windowHeight)  
Spacebackground=createSprite(width/2,height/2,windowWidth,windowHeight);
Spacebackground.addImage(SpaceBackground);
Spacebackground.scale= 1.8
SpaceShiip();
reset1=createSprite(width/2,height/2-345,40,40)
reset1.addImage(reset);
reset1.scale=0.35
earth=createSprite(width/2,height+980,30,30)
earth.addImage(Earth);
earth.scale=2.5
earth.setCollider("circle",0,0,435)
earth.debug=false ;
youfailed=createSprite(width/2,height/2-430,40,40);
youfailed.addImage(YouFailed);
youfailed.scale=0.8
gameover=createSprite(width/2,height/2-420,40,40);
gameover.addImage(gameOver);
gameover.scale=0.5
torpedosGroup=createGroup();
AsteroidGroup=createGroup();
score=0
SurvivalTime=0
}

function draw(){
background("lightblue");

  
  if(gameState==PLAY){
 score = score + Math.round(getFrameRate()/60);
Spaceship.x=mouseX 

SpawnAsteroids();
Spaceship.changeImage('Normal')
reset1.visible=false;
youfailed.visible=false;
gameover.visible=false;
    
    if(torpedosGroup.isTouching(AsteroidGroup)){
      AsteroidGroup[0].destroy();
      torpedosGroup.destroyEach();
      SurvivalTime=SurvivalTime+1;
      
    }
    

      
    
    
if(AsteroidGroup.isTouching(earth)){
  gameState=END
  AsteroidGroup.setVelocityYEach(0);
  SurvivalTime=SurvivalTime+0;
  score=score+0;
    }
    else if(AsteroidGroup.isTouching(Spaceship)){
      AsteroidGroup[0].destroy();
      Spaceship.changeImage('Collided')
      AsteroidGroup.setVelocityYEach(0);
      gameState=NEUTRAL
  SurvivalTime=SurvivalTime+0;
      score=score+0;
      
      
    }
    
    
    
if (keyDown("space")||(touches.length > 0)) { 

torpedos()
touches=[]
}
   
    
else if(gameState==END)  {
    asteroid.lifetime=15;
  reset1.visible=true;
  gameover.visible=true;
  Spaceship.x= width/2;
  if(mousePressedOver(reset1)||touches.length>0){
   restart();

 }
  asteroid.changeImage('asteroidcollided')  

}
    else if(gameState==NEUTRAL){
  reset1.visible=true;
  youfailed.visible=true;
  AsteroidGroup.destroyEach();
     if(mousePressedOver(reset1)||touches.length>0){
   restart();
   touches = []
 } 
    }
    
}
 if(mousePressedOver(reset1)||touches.length>0){
   restart();
   touches = []
 }
drawSprites();
  textSize(20);
    fill("white");
  stroke("green");
  textFont("Algerian");
text("Asteroids Destroyed: "+ SurvivalTime, width/2-230,height/2-500);
text("Survival Time (Light Years): "+ score,width/2-0,height/2-500)
 
}


function SpawnAsteroids(){
  if (frameCount % 320 === 0){
    asteroid = createSprite(Math.round(random(width/2+300,width/2-300)),0,10,40);
    asteroid.addImage('asteroidnormal',Asteroid)
    asteroid.addImage('asteroidcollided',Asteroid_collided)
    asteroid.visible=true;
    asteroid.scale=0.19
    asteroid.velocityY = (10 + 0.5*score/150);
    asteroid.lifetime=300;
    AsteroidGroup.add(asteroid);
    
    
  }
  
  
  
}

function torpedos(){
  var torpedo;
  torpedo = createSprite(530,height/2 -350,10,10);
  torpedo.addImage(Torpedo)
  torpedo.x = Spaceship.x
  torpedo.velocityY  = -7
  torpedo.scale = 0.15  
  torpedo.lifetime = 200;
  torpedosGroup.add(torpedo);
  
  
    
  
}

function SpaceShiip(){
  Spaceship=createSprite(220,height/2-240);
Spaceship.addImage('Normal',SpaceShip);
Spaceship.addImage('Collided',SpaceShip_collided)
Spaceship.scale=0.2

  
}

function restart(){
  reset1.visible=false;
  gameState=PLAY;
  SurvivalTime=0;
   score=0
}

