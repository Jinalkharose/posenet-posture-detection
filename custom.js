let capture;
let posenet;
let singlePose;

function setup(){
    createCanvas(1500,1500)

    capture = createCapture(VIDEO);
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses)
}

function receivedPoses(poses){
    if (poses.length > 0){
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded(){
    //console.log("model loaded");
}

function draw(){
    let X=50, Y=50;
    image(capture,X,Y)

    if (singlePose){
        let keypoints = singlePose.keypoints;

        for(let i=0; i<keypoints.length; i++){
            if (keypoints[i].score.toFixed(2) > 0.1){
                fill(255,0,0);
                ellipse(keypoints[i].position.x+X, keypoints[i].position.y+Y, 15);
            }
        }
        
        stroke(255,255,255);
        strokeWeight(2)
        for(let j=0; j<skeleton.length; j++){
            line(skeleton[j][0].position.x+X, skeleton[j][0].position.y+Y,
                skeleton[j][1].position.x+X, skeleton[j][1].position.y+Y)
        }
    }   
}