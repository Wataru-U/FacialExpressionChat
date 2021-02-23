var myId;
var myname = '';
function setName() {
  let elm = document.getElementById('nameInput');
  myname = elm.value;
  elm = document.getElementById('mynameArea')
  elm.textContent = myname;
}
var sarturation = 90;
var Lightness = 80;

var chatcount = 0;

var ang;
var smi;
var neu;

var myFaceValue = [0, 0, 0];
var smileHue = 190;
var angryHue = 0;
var neutralHue = 280;

var rWeight = 0;
var gWeight = 0;
var bWeight = 0;

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

const socket = io();
socket.on("token", (data) => {
  myId = data.token;
});
socket.on('message', gotMessage);//ここ帰る
socket.on('reaction', gotReaction);
/*
<li class chat id=logNo(count)>
    <div class anoter>
        <button class=coment id=chatNo(count) onclick=reaction(count)><span>name</span>:value</button>
    </div>
</li>
*/
function gotMessage(message) {
  const comment = message.text;
  $('.messages').append('<li class="chat" id="logNo' + chatcount + '"><div class="another"><button class="coment" id="chatNo' + chatcount + '" onclick="reaction(' + chatcount + ')" ><span class="name">' + message.name + '</span>' + comment + '</button></div></li > ');
  let id = "#chatNo" + chatcount;
  let c = rgb2css(message.angry, message.neutral, message.smile);
  $(id).css("background-color", c);
  chatcount++;
}

/*
<li class chat id=logNo(count)>
    <div class another>
        <div class=coment reaction id=chatNo(count) onclick=reaction(count)><span class=re>Re:</span>text</div>
    </div>
</li>
*/
function gotReaction(reaction) {
  const comment = reaction.text;
  $('.messages').append('<li class="chat" id="logNo' + chatcount + '"><div class="another"><div class="coment reaction" id="chatNo' + chatcount + '"><span class=re>Re:' + reaction.name + '</span>' + comment + '</div></div></li>');
  let id = "#chatNo" + chatcount;
  let c = rgb2css(reaction.angry, reaction.neutral, reaction.smile);
  $(id).css("background-color", c);
  chatcount++;
}

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

  var sar_elm = document.getElementById('sar');
  var lig_elm = document.getElementById('lig');

  sarturation = sar_elm.value;
  Lightness = lig_elm.value;
  let c = rgb2css(0, 0, 0);
  $(".colExample_r").css("background", c);
  c = rgb2css(0, 1, 0);
  $(".colExample_g").css("background", c);
  c = rgb2css(0, 0, 1);
  $(".colExample_b").css("background", c);
}

//表情用
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

//チャット
function sendMessage() {
  var text_message = document.getElementById("message").value;
  var message = {
    id: myId,
    name: myname,
    text: text_message,
    smile: smi,
    angry: ang,
    neutral: neu
  }
  if (myname != '') {
    message.name += ': ';
  }
  socket.emit('message', message);
  log(text_message);
  setLogColor();
}

/*
<li class chat id=logNo(count)>
    <div class my>
        <button class=coment id=chatNo(count) onclick=reaction(count)></button>
    </div>
</li>
*/
const log = (comment, options) => {
  $('.messages').append('<li class="chat" id="logNo' + chatcount + '"><div class="my"><button class="coment" id="chatNo' + chatcount + '" onclick="reaction(' + chatcount + ')" > ' + comment + '</button></div></li > ');
}

function setLogColor() {
  let id = "#chatNo" + chatcount;
  let c = rgb2css(ang, neu, smi);
  $(id).css("background-color", c);
  chatcount++;
}


/*
<li class chat id=logNo(count)>
    <div class my>
        <div class=coment reaction id=chatNo(count) onclick=reaction(count)><span class=re>Re:</span>text</div>
    </div>
</li>
*/

function reaction(num) {
  let id = 'chatNo' + num;
  let text_message = document.getElementById(id).innerHTML;
  var reaction = {
    name: myname,
    text: text_message,
    smile: smi,
    angry: ang,
    neutral: neu
  }
  if (myname != '') {
    message.name += ': ';
  }
  socket.emit('reaction', reaction);
  $('.messages').append('<li class="chat" id="logNo' + chatcount + '"><div class="my"><div class="coment reaction" id="chatNo' + chatcount + '"><span class=re>Re:</span>' + text_message + '</div></div></li>');
  setLogColor();
}


function changeBoxColor(r, g, b) {
  let c = rgb2css(r, g, b);
  $(".st0").css("fill", c);
}

function rgb2css(r, g, b) {
  var col = r * rWeight + g * gWeight + b * bWeight;
  reculcWeight(col, r, g, b);
  var col = r * rWeight + g * gWeight + b * bWeight;
  return "hsl(" + col + "," + sarturation + "%," + Lightness + "%)";
}

function setSmile() { smileValue = myFaceValue; }
function setAngry() { angryValue = myFaceValue; }
function setNeutral() { neutralValue = myFaceValue; }

function reculcWeight(col,r,g,b)
{
  let ave = (r + g + b) / 3.0;
  let sSq = ((ave-r) * (ave-r) + (ave - g) * (ave - g) + (ave-b) * (ave-b)) / 2.0;
  let range = 10 / sSq;
  let maxVal = max(r,max(g,b));
  console.log(sSq);
  if(r == maxVal)
  {
    console.log();
      if((abs((col+360) % 360 - angryHue) > range) || abs((col+360) % 360 - 359) > range)
      {
        console.log();
        rWeight += 1;
      }
  }
  else if(g == maxVal)
  {
    if(abs((col+360) % 360 - neutralHue) > range)
    {
      gWeight += 1;
    }
  }
  else
  {
    if(abs((col+360) % 360 - smileHue) > range)
    {
      bWeight += 1;
    }
  }
  console.log("range:" + range + "r:" + rWeight + " g:" + gWeight + " b:" + bWeight);
}