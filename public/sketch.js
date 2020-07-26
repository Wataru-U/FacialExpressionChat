var chatcount = 0;

var ang;
var smi;
var neu;

var capture;
var tracker;
var w = 640;
var h = 480;

var mouthOpness;
var mouthWidth;
var miken;
var eyeOpness;

var neutralValue = [0.06733934421433133, 1.2166301645118103, 0.6751594422903696, 0.19990857159519185];

var smileValue = [0.10154191491665203, 1.2921248228803919, 0.6262147018565902, 0.1936224927054785];

var angryValue = [0.01803983204873657, 1.349418335193352, 0.6715891954170593, 0.18543454351091018];



function setup() {
  createCanvas(w, h);
  select("#send").mouseClicked(sendMessage);

  capture = createCapture({
    audio: false,
    video: {
      //    deviceId: 'f9627ee514a6db304d8307e3d881458cd8f09ce82cb8cedc2abae198e4461c34',
      width: w,
      height: h
    }
  }, function () {
    console.log('capture ready.')
  });

  capture.elt.setAttribute('playsinline', '');
  capture.size(w, h);
  capture.hide();

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);
}

function draw() {
  fill(255);
  noStroke();
  rect(0, 0, width, height);


  var positions = tracker.getCurrentPosition();

  if (positions.length == 71) {
    //表情の要素を取得
    myFaceValue = emotionCulc(positions);

    //表情の距離を取得
    smi = 1 / distance(smileValue, myFaceValue);
    ang = 1 / distance(angryValue, myFaceValue);
    neu = 1 / distance(neutralValue, myFaceValue);
    // sumで割って百分率
    var sum = (smi + ang + neu);
    smi /= sum;
    ang /= sum;
    neu /= sum;
    myFacialEmotion = [smi, ang, neu];
    changeBoxColor(ang, neu, smi);
    // 戻す
    myFacialEmotion = [smi, ang, neu];
  }
}

function distance(emotion, face) {
  var result = 0;
  for (var i = 0; i < emotion.length; i++)
    result += (emotion[i] - face[i]) * (emotion[i] - face[i]);
  return Math.sqrt(result);
}
function emotionCulc(positions) {
  if (positions.length == 71) {
    var noseWidth = dist(positions[35][0], positions[35][1],
      positions[39][0], positions[39][1]);


    mouthOpness = dist(positions[60][0], positions[60][1],
      positions[57][0], positions[57][1]) / noseWidth;
    mouthWidth = dist(positions[44][0], positions[44][1],
      positions[50][0], positions[50][1]) / noseWidth;
    miken = dist(positions[22][0], positions[22][1],
      positions[18][0], positions[18][1]) / noseWidth;
    eyeOpness = dist(positions[24][0], positions[24][1],
      positions[26][0], positions[26][1]) / noseWidth;
    var kao = [mouthOpness, mouthWidth, miken, eyeOpness];
    return kao;
  }
}

function sendMessage() {
  var text_message = document.getElementById("message").value;
  log(text_message);
  let id = "#chatNo" + chatcount;
  let c = rgb2css(ang, neu, smi, 90);
  $(id).css("background-color", c);
  chatcount++;
}

const log = (message, options) => {
  $('ul').append('<li class="chat"><div class="my" id = "chatNo' + chatcount + '" > ' + message + '</div></li > ');
}

function changeBoxColor(r, g, b) {
  let c = rgb2css(r, g, b, 80);
  console.log(c);
  $(".st0").css("fill", c);
}

function rgb2css(r, g, b, l) {
  var col = r * 600 + g * 0 + b * 200;
  return "hsl(" + col + ", 70%," + l + "%)";
}

