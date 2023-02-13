var mountainImages = ['imgs/scene/mountains01.png', 'imgs/scene/mountains02.png', 'imgs/scene/mountains03.png', 'imgs/scene/mountains04.png'];
var cloudImages = ['imgs/scene/cloud01.png', 'imgs/scene/cloud02.png'];
var brickImages = ['imgs/blocks/blocks001.png', 'imgs/scene/blocks002.png', 'imgs/scene/blocks003.png'];
var coinsImages = ['imgs/scene/coin01.png', 'imgs/scene/coin02.png', 'imgs/scene/coin03.png', 'imgs/scene/coin04.png', 'imgs/scene/coin05.png'];
var pipeImages = ['imgs/scene/tube.png'];
var platformImages = ['imgs/scene/platform.png'];
var enemyMushroomImages = ['imgs/enemy/enemyMushroom01.png', 'imgs/enemy/enemyMushroom02.png'];


var spriteNumber={
    mountain: 6,
    cloud: 10,
    brick: 5,
    pipe: 5,
    coin: 10,
    enemyMushroom: 5,
}


function setSprites(){
    setSpriteGroups();
    loadStaticObjects( mountain, mountainImages, spriteNumber.mountain, 1.5, gameConfig.screenX, gameConfig.screenY-35);
    loadStaticObjects( cloud, cloudImages, spriteNumber.cloud, 0, gameConfig.screenX, 20, gameConfig.screenY*0.5 );
    loadStaticObjects( brick, brickImages, spriteNumber.brick, gameConfig.screenX*0.1, gameConfig.screenX*0.9, gameConfig.screenY*0.1, gameConfig.screenY*0.7);
    loadStaticObjects( pipe, pipeImages, spriteNumber.pipe, 50, gameConfig.screenX, gameConfig.screenY-20, gameConfig.screenY+10 );
    loadAnimatedObjects( coin, coinsImages, 'shine', spriteNumber.coin, "get", false, 0, gameConfig.screenX, gameConfig.screenY*0.35, gameConfig.screenY*0.75);
    loadAnimatedObjects( enemyMushroom, enemyMushroomImages, 'move', spriteNumber.enemyMushroom, 'live', true, gameConfig.screenX*0.5, gameConfig.screenX, gameConfig.screenY*0.35, gameConfig.screenY*0.75 );
    loadPlatforms();
}


function setSpriteGroups(){
    brick = new Group();
    enemyMushroom = new Group();
    cloud = new Group();
    mountain = new Group();
    pipe = new Group();
    platform = new Group();
    coin = new Group();
};


function loadStaticObjects( group, imageArray, spriteNumber, randomPosStartX, randomPosEndX, randomPosStartY, randomPosEndY) {
for(var i = 0; i < spriteNumber; i++) {
    var randomNumber=floor((random()*10)%imageArray.length);
    var img = loadImage(imageArray[randomNumber]);

    group[i] = createSprite(random(randomPosStartX, randomPosEndX), random(randomPosStartY, randomPosEndY));
    group[i].addImage(img);
}
};

function loadAnimatedObjects( group, imageArray, animationName, spriteNumber, spriteStatusName, spriteStatusValue, randomPosStartX, randomPosStartY, randomPosEndX, randomPosEndY) {
    for(var i = 0; i < spriteNumber; i++) {
        group[i] = createSprite(random(randomPosStartX, randomPosEndX), random(randomPosStartY, randomPosEndY));
        group[i].addAnimation(animationName, imageArray[0], imageArray[1]);
        group[i].scale = 1.5;
        group[i][spriteStatusName] = spriteStatusValue;
    };
};


function loadPlatforms() {
    img = loadImage('imgs/scene/platform.png');
    for(i = 0; i < 70; i++){
        randomNumber = random();
        if(randomNumber > 0.2){
            platforms[i]=createSprite(gameConfig.screenX-i*19,gameConfig.screenY-10);
        }else{
            platsforms[i]=createSprite(random(0,gameConfig.screenX),gameConfig.screenY-10);
        }
        platforms[i].addImage(img);
    };
};



function marioAnimation(){
    mario = createSprite(gameConfig.startingPointX, gameConfig.startingPointY, gameConfig.startingPoint, 0.30);
    mario.addAnimation("stand", 'imgs/mario/mario06.png');
    mario.addAnimation("move", 'imgs/mario/mario01.png','imgs/mario/mario03.png');
    mario.addAnimation("crouch", 'imgs/mario/mario18.png');
    mario.addAnimation("jump", 'imgs/mario/mario05.png');
    mario.addAnimation("dead", 'imgs/mario/mario24.png');
};