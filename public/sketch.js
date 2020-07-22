var socket;
var chatlog = {
  name: "Name",
  message: "Sample message"
}
function setup() {
  createCanvas(400, 400);
  select("#send").mouseClicked(sendMessage);
  socket = io.connect('https://facialexpressionchat-3238.herokuapp.com/');
  socket.on('chatdata', gotMessage);
}

var nameLine = [" ", " ", " ", " ", " "];
var messageLine = [" ", " ", " ", " ", " "];

function gotMessage(chatdata) {
  console.log(chatdata);
  chatlog.name = chatdata.name;
  chatlog.message = chatdata.message;

}

function draw() {
  fill(255);
  ClientRect(0, 0, width, height);

  if (chatlog.message != messageLine[0]) {
    for (var i = 4; i > 0; i--) {
      nameLine[i] = nameLine[i - 1];
      messageLine[i] = messageLine[i - 1];
    }
    nameLine[0] = chatlog.name;
    messageLine[0] = chatlog.message;
  }

  background(220);
  for (var i = 0; i < 5; i++) {
    if (nameLine[i] != "" && messageLine[i] != "") {
      text("名前: " + nameLine[i], 48, i * 60 + 10);
      text("メッセージ: " + messageLine[i], 10, i * 60 + 30);
    }
  }
}

function sendMessage() {
  var text_name = document.getElementById("name").value;
  var text_message = document.getElementById("message").value;
  var chatdata = {
    name: text_name,
    message: text_message
  }
  socket.emit('chatdata', chatdata);
  console.log(chatdata);
  chatlog.name = chatdata.name;
  chatlog.message = chatdata.message;

}