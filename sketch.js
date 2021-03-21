var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jewellryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

var PLAY=1;
var END=0;
var gameState=1;
var treasureCollect=0;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  boyEnd = loadImage("Runner-end.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewellryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.scale=0.08;
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("SahilEnd", boyEnd);
  
  
cashG=new Group();
diamondsG=new Group();
jewelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if (gameState===PLAY) {
    
    boy.x = World.mouseX;
    
    if(path.y > 400 ){
    path.y = height/2;
  }
    
    createCash();
    createDiamonds();
    createJewellery();
    createSword();
   
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollect= treasureCollect+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollect= treasureCollect+200;
      
    }else if(jewelleryG.isTouching(boy)) {
      jewelleryG.destroyEach();
      treasureCollect= treasureCollect+150;
      
    }else if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState=END;
    }
  }
    
  if (gameState === END){
    path.velocityY=0;
    
    end = createSprite(200, 200, 100, 100);
    end.addAnimation("gameOver.png", endImg);
    end.scale=0.8;
    
    swordGroup.setVelocityEach(0);
    cashG.setVelocityEach(0);
    jewelleryG.setVelocityEach(0);
    diamondsG.setVelocityEach(0);
    
    cashG.setLifetimeEach(0);
    diamondsG.setLifetimeEach(0);
    jewelleryG.setLifetimeEach(0);
    swordGroup.setLifetimeEach(0);
  
    boy.changeAnimation("SahilEnd", boyEnd);
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollect,150,30);
}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 410;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 410;
  diamondsG.add(diamonds);
}
}

function createJewellery() {
  if (World.frameCount % 80 == 0) {
  var jewellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jewellery.addImage(jewellryImg);
  jewellery.scale=0.13;
  jewellery.velocityY = 3;
  jewellery.lifetime = 410;
  jewelleryG.add(jewellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 405;
  swordGroup.add(sword);
  }

}