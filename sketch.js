var PLAY=1
var END =0
var gameState = END;


var bush
var score=0

var ground,invisibleground,Ground
var play,start
var player,Player,reset,Reset



function preload(){
Ground=loadImage("floor.png")
start=loadImage("button.png")
Player=loadImage("skate1.png")
Reset=loadImage("replay.png")

bush=loadImage("obstacle.png")

}
function setup() {
  createCanvas(800,400);
  
//player
 player=createSprite(250,315,50,350)
 player.addImage(Player)
 player.scale=2
  
//play
 play = createSprite(400,200,100,50)
 play.addImage(start)
 play.scale=0.1
 play.visible=true;

 //reset
reset = createSprite(400,100,50,50)
reset.visible=false;
reset.addImage(Reset)
reset.scale=0.3
  
//ground
 ground = createSprite(800,400,400,20);
 ground.x = ground.width /2;
 ground.velocityX = -(6 + 3);
 ground.addImage(Ground)
 invisibleground = createSprite(800,400,400,10);
invisibleground.visible = false;
invisibleground.x = invisibleground.width /2;
 invisibleground.velocityX = -(6 + 3);

 //groups
 obstaclesgroup=new Group();
 
 
}

function draw(){
 background(0)

 //score text
  text("Score: "+ score,500,50);
  
  //mousepressedover play
if(mousePressedOver(play)){
  play.visible=false;
   ground.x = ground.width /2;
 ground.velocityX = -(6 + 3);
 gameState=PLAY
}

//gamestate=play
  if (gameState===PLAY){
    play.visible=false;
    
    if (ground.x < 0){
      ground.x = ground.width/2;

    }
    if(keyDown("space") && player.y >= 159) {
      player.velocityY = -14;
    }
    player.velocityY =player.velocityY + 0.8
    player.collide(ground)

    score = score + Math.round(getFrameRate()/30);
   
    Obstacles();
    
    if(obstaclesgroup.collide(player)){
      gameState=END
      text("YOU LOSE",400,150)
      reset.visible=true;
    }
  
  }
  //gamestate end
  else if (gameState === END) {
    
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityY=0;
    player.velocityX=0;
    obstaclesgroup.setVelocityXEach(0);
    
    
  if(mousePressedOver(reset)){
restart();
gameState=PLAY
  }
   
  }
  
drawSprites();

}
//obstacles
function Obstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,350,50,100);
    obstacle.velocityX = -(6 + 3);
    obstacle.addImage(bush)
    obstacle.scale=0.3
   
    obstaclesgroup.add(obstacle)
  }
}
//restaet
function restart(){
  gameState = PLAY;
  ground.velocityX = -(6 + 3);
  
  reset.visible = false;
  
  obstaclesgroup.destroyEach();
  
  
  score = 0;
  
}
