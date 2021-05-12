var bgImg, dinoImg, dinoJumpImg, dinoIdleImg;
var obstacleImg;
var platformImg;
var groundImg;
var dino, ground, groundInv;
var obstacle;
var platform, platformInv;
var obstacleGroup; 
var platformGroup, platformInvGroup;
var reward, rewardGroup;
var rewardImg;
var enemy, enemyImg, enemyGroup;

var score = 0;

//var gameState = "play";


function preload(){

    bgImg = loadImage("images/bg/png/BG.png");
    dinoImg = loadAnimation("images/dino/run/run1.png", "images/dino/run/run2.png", "images/dino/run/run3.png", "images/dino/run/run4.png", "images/dino/run/run5.png", "images/dino/run/run6.png", "images/dino/run/run7.png", "images/dino/run/run8.png");
    dinoJumpImg = loadAnimation("images/dino/jump/jump2.png", "images/dino/jump/jump3.png","images/dino/jump/jump4.png","images/dino/jump/jump5.png","images/dino/jump/jump6.png","images/dino/jump/jump7.png","images/dino/jump/jump8.png","images/dino/jump/jump9.png","images/dino/jump/jump10.png","images/dino/jump/jump11.png","images/dino/jump/jump12.png")
    groundImg = loadImage("images/bg/png/ground.png");
    enemyImg = loadImage("images/bg/png/Objects/Crate.png");
    rewardImg = loadImage("images/bg/png/Objects/Skeleton.png");
    dinoIdleImg = loadAnimation("images/dino/idle/idle1.png");
    obstacleImg = loadAnimation("images/bg/png/Objects/DeadBush.png");
    platformImg = loadImage("images/bg/png/Tiles/tile/platform.png");
    //marioCollidedImg = loadImage("collided.png");

}

function setup(){
    createCanvas(1200,600);

    dino = createSprite(100,520,20,20);
    dino.addAnimation("dino", dinoImg);
    dino.addAnimation("dinoJump", dinoJumpImg);
    dino.addAnimation("dinoIdle", dinoIdleImg);
    dino.scale = 0.2;

    score = 0;

    ground = createSprite(600,590,1200,20);
    ground.addImage(groundImg);
    ground.scale = 1;

    groundInv = createSprite(600,550,1200,20);
    groundInv.visible = false;

    obstacleGroup = new Group();
    platformGroup = new Group();
    platformInvGroup = new Group();
    rewardGroup = new Group();
    enemyGroup = new Group();

}

function draw(){

    background(bgImg);
    spawnEnemy();

    edges = createEdgeSprites();

    if(rewardGroup.collide(dino)){
        reward.destroy();
        score += 1;
    }

    dino.collide(groundInv);
    dino.collide(edges[0]);
    dino.collide(edges[1]);
    dino.collide(edges[2]);
    dino.collide(edges[3]);
    dino.changeAnimation("dino", dinoImg);
    dino.collide(platformInvGroup);

    ground.velocityX = -5;
    if(ground.x < 0){
    ground.x = ground.width/2;
    }

    if(keyDown("up")){
        dino.velocityY = -10;
        dino.changeAnimation("dinoJump", dinoJumpImg);
    }

    if(keyDown("right")){
        dino.x = dino.x + 10;
    }

    if(keyDown("left")){
        dino.x = dino.x - 10;
    }

    if(dino.y >= 600){
        dino.velocityY = 10;
    }

    if(platformGroup.isTouching(dino)){
        dino.changeAnimation("dinoIdle", dinoIdleImg);
    }

    dino.velocityY = dino.velocityY + 1;

    spawnObstacles();
    spawnPlatforms();

    drawSprites();

    textSize(20);
    fill("white");
    text("Score: " + score, 1050, 50);
    text("This is a rough version, will be updated continuously", 300, 30);
}

function spawnObstacles(){

    if(frameCount % 150 === 0){
        obstacle = createSprite(1200,495,20,20);
        obstacle.addAnimation("obstacles", obstacleImg);
        obstacle.scale = 1;

        obstacle.velocityX = -5;

        obstacleGroup.add(obstacle);
    }

}

function spawnPlatforms(){

    if(frameCount % 250 === 0){
        platform = createSprite(1100, random(300,400), 20,20);
        platformInv = createSprite(platform.x, platform.y, 180,20);
        platformInv.velocityX = -2;
        platformInv.visible = false;
        platform.addImage(platformImg);
        platform.scale = 0.5;

        if(frameCount % 750 === 0){
            reward = createSprite(platform.x, platform.y - 35,20,20);
            reward.addImage(rewardImg);
            reward.scale = 0.5;
            reward.velocityX = -2;

            rewardGroup.add(reward);
        }

        platform.velocityX = -2;

        platformGroup.add(platform);
        platformInvGroup.add(platformInv);
    }

}

function spawnEnemy(){

    if(frameCount % 100 === 0){
        enemy = createSprite(random(0,1200),0,20,20);
        enemy.addImage(enemyImg);
        enemy.velocityY = 5;
        enemy.scale = 0.5;

        enemyGroup.add(enemy);
    }

}
