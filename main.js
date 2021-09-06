harry_potter_song = "";
peter_pan_song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song_status = "";

function preload()
{
    harry_potter_song = loadSound("music.mp3");
    peter_pan_song = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet Is Initialized!");
}

function draw()
{
    image(video, 0, 0, 600, 500);
    
    song_status = harry_potter_song.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        peter_pan_song.stop();

        if(song_status == false)
        {
            harry_potter_song.play();
            document.getElementById("song_name").innerHTML = "Harry Potter Theme Song";
        }
    }
    if(scoreRightWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        harry_potter_song.stop();

        if(song_status == true)
        {
            peter_pan_song.play();
            document.getElementById("song_name").innerHTML = "Peter Pan song";
        }
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + " scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}