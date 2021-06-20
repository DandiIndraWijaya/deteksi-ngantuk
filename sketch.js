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
  classifier = ml5.imageClassifier('./model.json');
}
preload()

function setup() {
  const cnv = createCanvas(640, 520);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
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
  
  // Draw Back Button
  // let backButton = createA('http://127.0.0.1:5500/index.html', 'Kembali Ke Halaman Utama');
  // let x = (windowWidth - width) / 2;
  // let y = (windowHeight - height) / 2;
  // backButton.position(x, y);

  // STEP 4: Draw the label
  textSize(32)
  textAlign(CENTER, CENTER)
  fill(255)

  if(ngantuk){
   label = 'Anda Mengantuk'
   text(label, width/2, height -16)
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

  if(oldResult === 'Mata Tertutup'){
    frame += 2

    if(frame > 100){
      ngantuk = true
      audio = new Audio('wordplay.mp3');
      audio.play();
      return
    }
  }

  else if(oldResult === 'Menguap'){
    frame += 5

    if(frame > 100){
      ngantuk = true
      audio = new Audio('wordplay.mp3');
      audio.play();
      return
    }
  }
  
  else{
    frame = 0
  }

  classifyVideo()
}
