var mario, bricks,clouds,mountains,enemyMushrooms,pipes,platforms,coins;

var control={
    up: "UP_ARROW",
    left: "LEFT_ARROW",
    right: "RIGHT_ARROW",
    revive: 32
}

var gameConfig={
    status: "start",
    initialLifes: 4,
    moveSpeed: 5,
    enemyMoveSpeed: 3,
    gravity: 1,
    gravityEnemy: 10,
    jump:-15,
    startingPointX:500,
    startingPointY:0,
    screenX:1240,
    screenY:336,
    timeScores: 0,
    scores:0
}


noseX = "";
noseY = "";
gameStatus = "";

function game(){
    
    console.log("noseX = " + noseX + " ,noseY = "+ noseY);

    instializeInDraw();
    moveEnvironment(mario);
    drawSprites();

    if(gameConfig.status=='start'){

    fill(0,0,0,150);
    rect(0,0,gameConfig.screenX,gameConfig.screenY);

    fill(255, 255, 255);
    textSize(40);
    textAlign(CENTER);
    text("Press Play button to Start the Game", gameConfig.screenX/2, gameConfig.screenY/2);
    textSize(40);

    stroke(255);
    strokeWeight(7);
    noFill();

    changeGameStatus();
    }

    if(gameConfig.status=='play'){
        positionOfCharacter(mario);
        enemies(enemyMushrooms);
        checkStatus(mario);
        scores(mario);
        manualControl(mario);
    }

    if(gameConfig.status=='gameover'){
        
        fill(0,0,0,150);
        rect(0,0,gameConfig.screenX,gameConfig.screenY);

        fill(255,255,255);
        textSize(40);
        textAlign(CENTER);
        text("GAME OVER", gameConfig.screenX/2, gameConfig.screenY/2+105);
        textSize(15);
        text("Press Space to restart", gameConfig.screenX/2, gameConfig.screenY/2+135);
        textSize(40);
        text(round(gameConfig.scores), gameConfig.screenX/2, gameConfig.screenY/2-35);
        text("points", gameConfig.screenX/2, gameConfig.screenY/2);

        stroke(255);
        strokeWeight(7);
        noFill();
        ellipse(gameConfig.screenX/2,gameConfig.screenY/2-30,160,160);
        changeGameStatus(mario);
    }
}

function startGame(){
    gameStatus = "start";
    document.getElementById("status").innerHTML = "Game is Loading...";
}

function changeGameStatus(character){
    if(noseX !=="" && gameConfig.status=="start" && gameStatus=="start"){
        document.getElementById("status").innerHTML= "Game is Loaded!";
        world_start.play();
        initializeCharacterStatus(mario);
        gameConfig.status== "play";
    }
    if(gameConfig.status=="gameover" && keyDown(control.revive)){
        gameConfig.status == "start";
    }
}


/*----------------------------------------------------------------------------------------------------------------*/

function instializedInSetup(character){
    frameRate(120);

    character.scale=0.35;
    initializeCharacterStatus(character);

    bricks.displace(bricks);
    platforms.displace(platforms);
    coins.displace(coins);
    coins.displace(platforms);
    coins.collide(pipes);
    coins.displace(bricks);

    clouds.forEach(function(element){
        element.scale=random(1,2);
    })
}

function initializeCharacterStatus(character){
    character.scale=0.35;
    character["killing"]=0;
    character["kills"]=0;
    character["live"]=true;
    character["liveNumber"]=gameConfig.initialLifes;
    character["status"]='live';
    character["coins"]=0;
    character["dying"]=0;
    character.position.x=gameConfig.startingPointX;
    character.position.y=gameConfig.startingPointY;
}

function instializeInDraw(){
    background(109,143,252);

    if(mario.killing>0){
        mario.killing-=1;
    }else{
        mario.killing=0;
    }


    pipes.displace(pipes);
    enemyMushrooms.displace(enemyMushrooms);
    enemyMushrooms.collide(pipes);
    clouds.displace(clouds);

    if(mario.live){
        bricks.displace(mario);
        pipes.displace(mario);
        enemyMushrooms.displace(mario);
        platforms.displace(mario);
    }


    mario["standOnObj"]=false;
    mario.velocity.x=0;
    mario.maxSpeed=20;
}

/*---------------------------------------------------------------------------------------------------------------------*/

function getCoins(coin,character){
    if(character.overlap(coin) && character.live && coin.get==false){
        character.coins+=1;
        coin.get=true;
        mario_coin.play();
    };
}

function coinVanish(coin){
    if(coin.get){
        coin.position.x=random(50,gameConfig.screenX)+gameConfig.screenX;
        coin.get=false;
    };
}

/*--------------------------------------------------------------------------------------------------------------------*/

function positionOfCharacter(character){
    if(character.live){
        platforms.forEach(function(element){ standOnObjs(character,element); });
        bricks.forEach(function(element){ standOnObjs(character,element); });
        pipes.forEach(function(element){ standOnObjs(character,element); });

        falling(character);

        if(character.standOnObj) jumping(character);

    }


    coins.forEach(function(element){
        getCoins(element,mario);
        coinVanish(element);
    });

    enemyMushrooms.foreach(function(element){
        StepOnEnemy(character,element);
        if((element.touching.left||element.touching.right) && character.live && character.killing === 0)
        die(mario);

    })

    dontGetOutOfScreen(mario);

}

function autoControl(character){
    character.velocity.x=gameConfig.moveSpeed;
    character.changeAnimation('move');
    character.mirrorX(1);
}


function manualControl(character){

    if(character.live){
        if(noseX < 300){
            character.velocity.x=gameConfig.moveSpeed;
            character.changeAnimation('move');
            character.mirrorX(-1);
        }

        if(noseX > 300){
            character.velocity.x+=gameConfig.moveSpeed;
            character.changeAnimation('move');
            character.mirrorX(1);
        }

        if(!keyDown(control.left)&&!keyDown(control.right)&&!keyDown(control.up)){
            character.changeAnimation('stand');
        }
    }
}


function jumping(character){
    if ( (noseY < 168 && character.live) || (touchIsDown&&character.live) ){
        character.velocity.y+=gameConfig.jump;
        mario_jump.play();
    }
}


function falling(character){
    character.velocity.y += gameConfig.gravity;
    character.changeAnimation('jump');
}



function standOnObjs(obj1,obj2){
    var obj1_Left=leftSide(obj1);
    var obj1_Right=rightSide(obj1);
    var obj1_Up=upSide(obj1);
    var obj1_Down=downSide(obj1);

    var obj2_Left=leftSide(obj2);
    var obj2_Right=rightSide(obj2);
    var obj2_Up=upSide(obj2);
    var obj2_Down=downSide(obj2);

    if(obj1_Right>=obj2_Left&&obj1_Left<=obj2_Right && obj1_Down<=obj2_Up+7 && obj1_Down>=obj2_Up-7){
        obj1.velocity.y = 0;
        obj1.position.y=obj2_Up-(obj1.height/2)-1;
        obj1.standOnObj = true;
    }
}

function StepOnEnemy(obj1,obj2){

    var obj1_Left=leftSide(obj1);
    var obj1_Right=rightSide(obj1);
    var obj1_Up=upSide(obj1);
    var obj1_Down=downSide(obj1);

    var obj2_Left=leftSide(obj2);
    var obj2_Right=rightSide(obj2);
    var obj2_Up=upSide(obj2);
    var obj2_Down=downSide(obj2);


    if(obj1_Right>=obj2_Left&&obj1_Left<=obj2_Right && obj1_Down<=obj2_Up+7 && obj1_Down>=obj2_Up-7 && obj2.live==true && obj2.touching.top){
        obj2.live=false;
        obj1.killing=30;
        obj1.kills++;
        if(obj1.velocity.y>=gameConfig.jump*0.8){
            obj1.velocity.y=gameConfig.jmyp*0.8;
        }else{
            obj1.velocity.y+=gameConfig.jump*0.8;
        }
        mario_kick.play();
    }
}


function die(character){
    character.live=false;
    character.dying+=100;
    character.liveNumber--;
    character.status="dead";
    character.changeAnimation('dead');
    character.velocity.y-=2;
    console.log("die - " + character.liveNumber);
    if(character.liveNumber > 0)
    {
        mario_die.play();
    }
}

function checkStatus(character){
if(character.live==false){
    character.changeAnimation('dead');
    character.dying-=1;
    reviveAfterMusic(character);
}
if(character.live==false && character.liveNumber==0){
    gameConfig.status="gameover";
    mario_gameover.play();
}

}

function reviveAfterMusic(character){
    if (character.live === false && mario.liveNumber !==0 && character.dying===0){
        character.live=true;
        character.status="live";
        character.position.x=500;
        character.position.y=40;
        character.velocity.y=0;
    }
}


function dontGetOutOfScreen(character){

    if(character.position.y>gameConfig.screenY && character.live && character == mario){
        die(mario);
    }

    if(character.position.x>gameConfig.screenX-(character.width*0.5)){
        character.position.x=gameConfig.screenX-(character.width*0.5);
    }
}