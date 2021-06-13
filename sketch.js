// Add some header info
// For TM template code

// Video
let video;
let classifier;
let label = 'waiting...'
let oldResult;
let frame = 0;
let ngantuk = false;

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier('https://storage.googleapis.com/tm-model/Ee4zrkgmb/model.json');
}
preload()

function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo()
}

// STEP 2 classify!
const classifyVideo = () => {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);
  
  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
  textSize(32)
  textAlign(CENTER, CENTER)
  fill(255)

  if(ngantuk){
   label = 'Anda Mengantuk'
  }
  text(label, width/2, height -16)

}


// STEP 3: Get the classification!
const gotResults = (error, results) => {
  if(error){
    console.error(error);
    return
  }

  label = results[0].label
  oldResult = label;

  console.log(frame)
  if(oldResult === 'Tutup Mata' || oldResult === 'Menguap'){
    frame += 1

    if(frame > 100){
      ngantuk = true
      audio = new Audio('wordplay.mp3');
      audio.play();
      return
    }
  }else{
    frame = 0
  }

  classifyVideo()
}
