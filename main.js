function preload(){
    mario_gameover = loadSound("gameover.mp3");
    mario_jump = loadSound("jump.mp3");
    mario_coin = loadSound("mario-coin.mp3");
    mario_kick = loadSound("kick.wav");
    mario_die = loadSound("death.mp3");
    mario_worldstart = loadSound("world_start.wav");
setSprites();
marioAnimation();
}

function setup(){
  canvas = createCanvas(1240 , 336);
  canvas.parent('canvas');
  instializedInSetup(mario);
  video = createCapture(VIDEO);
  video.size(800, 400);
  video.parent('game_console');
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Model Loaded!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY =  results[0].pose.nose.y;
    }
}

function draw(){
    game();
}