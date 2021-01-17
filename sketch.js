const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

//Adding the bodies ,the engine and the world to the computer's memory
var engine,world;
var sceneImg;
var sceneImg1;
var trackImg2,track;
var sceneImg3;
var scene;

var apple;
var button,buttonImg;
var button1,buttonImg1;
var ground;
var sling;

var playerJunko1Img;
var junko,junkoImg;

var yakJunko,yakJunkoImg;
var cloudImg,cloud;
var gameState = 0;

var winningSound;
var losingSound;
var applauseSound;

var stopWatch=50;

var count=0;

var count1 = 3;

var sadImg;

var sling;
var cyclist,cyclistImage;

var nail,nailImg,nailGroup;

var yak,yakImg,yakGroup;

var yakScene,yakSceneImg;

var survivalTime=0;

var survivalTime1=500;

var store,storeImg;

var dollar,dollarImg,dollarGroup;

var restart,restartImg;

var partyPopper,partyPopperImage;

var congrats,congratsImg;
  
var mountScene,mountSceneImage;

//var reset,resetImg;

//Creating arrays for the donut, hotdog and pizza

var donut=[];
var hotDog=[];
var pizza=[];

function preload(){

  //Loading all the images

    sceneImg = loadImage("images/scene.png");
    buttonImg=loadImage("images/playButton.png");
    buttonImg1=loadImage("images/nextButton.png");
    sceneImg2 = loadImage("images/bg.jpg");
    trackImg2 = loadImage("images/track2.png");
    
    junkoImg = loadImage("images/junko1.png");
    cloudImg = loadImage("images/cloud.png");

    playerJunko1Img = loadImage("images/girlSling.png");

    winningSound = loadSound("sounds/winning.mp3");
    losingSound = loadSound("sounds/losing.mp3");
    applauseSound= loadSound("sounds/applause.wav");

    sceneImg3=loadImage("images/track.jpg");

    sadImg = loadImage("images/sadGirl.png");

    losingImg = loadImage("images/losingMessage.jpg");

    cyclistImage = loadAnimation("images/tile000.png","images/tile001.png","images/tile002.png","images/tile003.png","images/tile004.png","images/tile005.png");

    nailImg = loadImage("images/nail.png");

    yakImg = loadImage("images/yak.png");

    storeImg = loadImage("images/store.png");

    dollarImg = loadImage("images/dollar.png");

    restartImg = loadImage("images/restart.png");

    partyPopperImage = loadImage("images/partyPopper.png");

    mountSceneImage = loadImage("images/levelUp.jpg");
    
    yakSceneImg = loadImage("images/yakScene.png");

    yakJunkoImg = loadImage("images/yakJunko.png");

}
function setup(){
   createCanvas(windowWidth,windowHeight);
   engine = Engine.create();
   world = engine.world;

  //Creating all the the sprites and adding their images
   
   apple = new Apple(width-480,height/2+82,60,60);

   sling = new SlingShot(apple.body,{x:width-480,y:height/2+82});

   scene = createSprite(width/2,height/2);
   scene.addImage(sceneImg);

   yakScene = createSprite(width/2,height/2);
   yakScene.addImage(yakSceneImg);
   yakScene.visible = false;

   mountScene = createSprite(width/2,height/2);
   mountScene.addImage(mountSceneImage);
   mountScene.visible = false;

   button = createSprite(width-200,height-100);
   button.addImage(buttonImg);
   button1 = createSprite(width-400,height-100);
   button1.addImage(buttonImg1);
   button1.visible = false;
   button1.scale=0.3;

   restart= createSprite(width/2-100,height-100);
   restart.addImage(restartImg);
   restart.visible = false;
   restart.scale=0.3;


   junko = createSprite(200,height-200);
   junko.addImage(junkoImg);

   cloud = createSprite(450,height/2-100);
   cloud.addImage(cloudImg);

   ground = new Ground(width/2-200,height-30,width*3,10);

   store = createSprite(width/2-300,height/2-200);
   store.addImage(storeImg);
   store.visible=false;

   cyclist = createSprite(300,height/2);
   cyclist.addAnimation("cycle",cyclistImage);
   cyclist.scale=3;
   cyclist.visible = false;
  
   yakJunko = createSprite(width/2+400,height/2);
   yakJunko.addImage(yakJunkoImg);
   yakJunko.scale=0.1;
   yakJunko.visible = false;

   track2 = createSprite(width/2,height/2,width/2*10,height);
   track2.addImage(trackImg2);
   track2.x= track2.width/2;
   track2.velocityX=3;
   track2.visible=false;
  
   partyPopper = createSprite(width/2+200,height/2-200,50,50);
   partyPopper.addImage(partyPopperImage);
   partyPopper.visible = false;
   
   dollarGroup = new Group();
   nailGroup = new Group();
   yakGroup = new Group();
}

function draw(){
 
  
  if(gameState===0){

   

    drawSprites();

    store.visibility=false;
 //Displaying all the texts.
  
    textSize(16);
    textFont("Georgia");
    fill("black");
    text("Hello my name is Junko.",350,height/2-150);
    text("I am on a mission to climb Mt Everest.",320,height/2-120);
    text("Help me complete my mission.Press ",320,height/2-90);
    text("the Play button to start ",360,height/2-60);
    text(" the game ",390,height/2-30);
    textSize(40);
    textFont("Georgia");
    textStyle("Bold");
    fill("#e60029");
    text("Junko's journey to the Summit",620,height/2-260);

//Creating an if statement to chamge the gameState to 1 when we press the button play


if(mousePressedOver(button)){
     gameState=1;
    
   }
  
  if(mousePressedOver(restart)){
    gameState=5;
   
  }
}
else if(gameState===1){

//updating the engine

     Engine.update(engine);

//adding the second background when gameState is 1

     background(sceneImg2);
    
//Adding image for Junko in level 1 challenge 1

      image(playerJunko1Img,width-500,height/2,200,200);

//displaying the sling

      sling.display();

//displaying the sling      

     apple.display();

    ground.display();
  
    

// adding an if statement thatif frameCount is 60% switch between donut , pizza and hotdog.
   if(frameCount%60===0){
        var rand = Math.round(random(1,4));
        switch(rand){
          case 1: donut.push(new Donut(random(100,width-800),0,100));
          break;
          case 2: pizza.push(new Pizza(random(100,width-800),0,100));
          break;
          case 3: hotDog.push(new HotDog(random(100,width-800),0,100));
          break;
          default: break;
        }
      }

   stopWatch=stopWatch-1;
   fill("black");
   textSize(20);
   text("TimeLeft:"+stopWatch,width/2,height/2);

   if(stopWatch===0){
     gameState=2;
   } 

//creating for loop to display the donut
        
    
for(var k=0;k<donut.length;k++){
  donut[k].display();
  if (detectHit(donut[k],apple)) {
    World.remove(world,donut[k]);
    donut.splice(k,1);
  }
}
for(var k=0;k<donut.length;k++){
  if(donut[k].body.position.y>=height-160){
    gameState=5;
    //losingSound.play();
    
   }

  
}

//creating for loop to display the pizza

for(var k=0;k<pizza.length;k++){
 pizza[k].display();
 if (detectHit(pizza[k],apple)) {
  World.remove(world,pizza[k]);
  pizza.splice(k,1);
}
}
for(var k=0;k<pizza.length;k++){
  if(pizza[k].body.position.y>=height-160){
    gameState=5;
    //losingSound.play();
    
  }

  
}


//creating for loop to display the hotDog

for(var k=0;k<hotDog.length;k++){
  hotDog[k].display();
  if (detectHit(hotDog[k],apple)) {
    World.remove(world,hotDog[k]);
    hotDog.splice(k,1);
  }
}

  for(var k=0;k<hotDog.length;k++){

    if(hotDog[k].body.position.y>=height-160){
      gameState=5;
      //losingSound.play();
      
    }

   
  }
  
  }
  

   else if(gameState===2){
     scene.destroy();
      button.destroy();
      yakGroup.destroyEach();
      cloud.destroy();
      junko.destroy();
      background(trackImg2);
      fill("white");
      textSize(20);
      text("Count: "+count,width/2,100);
      
      survivalTime1 = survivalTime1--;

      cyclist.visible = true;

     

      if(keyDown(UP_ARROW)){
        cyclist.y = cyclist.y-10;
      }
      
      if(keyDown(DOWN_ARROW)){
        cyclist.y=cyclist.y+10;
      }

      if(keyDown(RIGHT_ARROW)){
        cyclist.x=cyclist.x+10;
      }
  
      if(keyDown(LEFT_ARROW)){
        cyclist.x=cyclist.x-10;
      }

      if(dollarGroup.isTouching(cyclist)){
        count = count+1;
        dollarGroup[0].destroy();
      }

      if(nailGroup.isTouching(cyclist)){
        gameState=5;
        losingSound.play();
        nailGroup[0].destroy();
      }


      
      if(count===2){
        gameState=4;
         applauseSound.play();
      }

      if(survivalTime1===0){
        gameState=8
      }

     // if(time===20){
        //gameState=3;
       // trophy.visible = true;
      //}
      spawnDollar();
      drawSprites();
      //spawnNail();



      
  }

  if(mousePressedOver(button1)){
    gameState=3;
  }

  else if(gameState===3){
    background(yakSceneImg);
    spawnYak();
    button1.destroy();
    
      scene.destroy();
      button.destroy();
  
      cloud.destroy();
      junko.destroy();

      partyPopper.destroy();

      yakJunko.visible = true;

      fill("white");
      textSize(20);
      text("Count: "+count,width/2,100);
      
      

      if(keyDown(UP_ARROW)){
        yakJunko.y = yakJunko.y-10;
      }
      

      if(keyDown(DOWN_ARROW)){
        yakJunko.y=yakJunko.y+10;
      }

      if(keyDown(RIGHT_ARROW)){
        yakJunko.x=yakJunko.x+10;
      }
  
      if(keyDown(LEFT_ARROW)){
        yakJunko.x=yakJunko.x-10;
      }

      if(yakGroup.isTouching(yakJunko)){
        //gameState=5;
        count1 = count1--;
        yakGroup.destroyEach();
      }

      if(count1===2){
        gameState=4;
         applauseSound.play();
      }
    spawnYak();
    drawSprites();
  }

  else if(gameState===4){
    
      background(mountSceneImage);
       button1.visible=true;
      
      partyPopper.visible = true;
      dollarGroup.destroyEach();
      cyclist.destroy();
     
     
      
      drawSprites();
  }

  

  else if(gameState===6){
    background(sceneImg3);
    
  }

  else if(gameState===5){
    background(sceneImg2);
    imageMode(CENTER);
    image(sadImg,width/2,height/2,200,200);
    image(losingImg,width/2+200,height/2-150,200,200);
    restart.visible=true;
  }
  
  else if(gameState===8){
    background(sceneImg);
  }

}

//Giving a function that if spaceBar if pressed then the apple will be attached to the slingshot
function keyPressed(){
  if(gameState===1){
    if(keyCode===32){
      Matter.Body.setPosition(apple.body,{x:width-480,y:height/2+82});
      sling.attach(apple.body);
    }
  } 
  
    
}
//Giving a function that if mouse is draggeed then apple should move with the mouse
function mouseDragged(){
  if(gameState===1){
     Matter.Body.setPosition(apple.body, {x: mouseX , y: mouseY});
  }
}
//Giving a unction that if mouse is released then the sling should fly
function mouseReleased(){
  if(gameState===1){
     sling.fly();
  }
}

function detectHit(lapple,lfood){
	appleBodyPosition=lapple.body.position
	foodBodyPosition=lfood.body.position
	var distance=dist(foodBodyPosition.x,foodBodyPosition.y,appleBodyPosition.x,appleBodyPosition.y)
	if(distance<=lapple.body.circleRadius+lfood.body.circleRadius){
    return true;
  } else{
    return false;
  }
    
}

function detectHit(lyak,lyakJunko){
	yakBodyPosition=lyak.body.position
	yakJunkoBodyPosition=lyakJunko.body.position
	var distance=dist(yakJunkoBodyPosition.x,yakJunkoBodyPosition.y,yakBodyPosition.x,yakBodyPosition.y)
	if(distance<=lyak.body.circleRadius+lyakJunko.body.circleRadius){
    return true;
  } else{
    return false;
  }
    
}

function spawnNail(){
  if (frameCount % 100 === 0){
    nail=createSprite(width/2,height/2);
    nail.addImage(nailImg);
    nail.scale=0.1;

    nail.velocityX = -18;
    nail.y = Math.round(random(height+300,height/2-500));
    nail.x = Math.round(random(width+300,width/2));
    
    nail.lifetime = 1000;
    nailGroup.add(nail);
  }
}
 
function spawnYak(){
  if (frameCount % 80 === 0){
    yak=createSprite(0,300);
    yak.addImage(yakImg);
    yak.scale=0.1;

    yak.velocityX =8;
    yak.y = Math.round(random(height+300,height/2-500));
    
    
    yak.lifetime = 1000;
    yakGroup.add(yak);
  }
}
function spawnDollar(){
  if (frameCount % 80 === 0){
    var dollar = createSprite(400,56,78,56);
    dollar.addImage(dollarImg);
    
    dollar.velocityX = -14;
    dollar.y = Math.round(random(height+300,height/2-500));
    dollar.x = Math.round(random(width+300,width/2*10));
    dollar.scale=0.1
    dollar.lifetime = 1000;
    dollarGroup.add(dollar);
  }
}