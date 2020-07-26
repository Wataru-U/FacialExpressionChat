import snapsvg from 'snapsvg'

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
    var smi = 1 / distance(smileValue, myFaceValue);
    var ang = 1 / distance(angryValue, myFaceValue);
    var neu = 1 / distance(neutralValue, myFaceValue);
    // sumで割って百分率
    var sum = (smi + ang + neu) / 155;
    smi /= sum;
    ang /= sum;
    neu /= sum;
    myFacialEmotion = [smi, ang, neu];
    fill(100 + ang, 100 + neu, 100 + smi);
    rect(0, 0, 100, 100);
    changeBoxColor(ang + 100, neu + 100, smi + 100);
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
}


const log = (message, options) => {
  $('ul').append('<li>' + message + '</li>');
}

function changeBoxColor(r, g, b) {
  let c = rgb2css(r, g, b);
  $("#svg").css("fill", c);
}

function rgb2css(r, g, b) {
  return "rgb(" + r + ',' + g + ',' + b + ')';
}

var $svg = Snap('#svg'),
  path = ["M-.42,426.66c77-6,146.91-25.47,219.42-54.5,42.07-16.84,137.6-26.34,182-27.24,46.8-.95,92.59,21.95,139,28.25,49.29,6.69,80.44-14.27,130-19.17,1.49,1.54-2.23,1.15,0,0,106.64-55.24,196.6-94.57,312.51-90.82,28.38.91,56.47,4.49,84.7,7.77,26.19,3,53.61,4.74,79-5.18,50-19.51,69.07-80.49,98.17-127.34,33-53.17,79.25-94,130.9-116.43q-1.4,170,.48,339.93c.35,30.82-2.28,30.25-1.78,61.07", "M1,404.4c77-6,126.8-37.8,199.3-66.8c42.1-16.8,158,24.5,202.4,23.6c46.8-1,88.6-14.8,134.4-28.1c50.1 - 15.1, 82.3 - 31.1, 131.5 - 26.6c1.5, 1.5 - 2.2, 1.2, 0, 0c104.9 - 25.1, 159.5 - 1.5, 281.1 - 23.2c28.4, 0.9, 70.1 - 14.5, 101.3 - 35.6c24.5 - 14.5, 61.4 - 33.5, 86.8 - 43.4c50 - 19.5, 102.3 - 1, 131.4 - 47.9c33 - 53.2, 55.9 - 134.3, 107.6 - 156.7c - 0.9, 113.3 - 0.8, 226.6, 0.5, 339.9",
    "M1,404.4c77-6,126.8-37.8,199.3-66.8c42.1-16.8,158,24.5,202.4,23.6c46.8-1,88.6-14.8,134.4-28.1c50.1 - 15.1, 82.3 - 31.1, 131.5 - 26.6c1.5, 1.5 - 2.2, 1.2, 0, 0c104.9 - 25.1, 159.5 - 1.5, 281.1 - 23.2c28.4, 0.9, 70.1 - 14.5, 101.3 - 35.6c24.5 - 14.5, 61.4 - 33.5, 86.8 - 43.4c50 - 19.5, 102.3 - 1, 131.4 - 47.9c33 - 53.2, 55.9 - 134.3, 107.6 - 156.7c - 0.9, 113.3 - 0.8, 226.6, 0.5, 339.9"
  ],
  SPEED = 500,
  EASING = mina.easein,
  i = 0;

function AnimationSvg() {

  //パスを定義して１秒間動かした後にアニメーションが繰り返される
  $svg.animate({ d: path[i] }, SPEED, EASING, AnimationSvg);

  //pathの順番をつけかえ
  i++;

  //もしpathの付け替えで多くなってしまった時初めのかたちに戻る
  if (i === path.length) {
    i = 0; //初めのpathに戻る
  }
}
//アニメーションスタート
AnimationSvg();

