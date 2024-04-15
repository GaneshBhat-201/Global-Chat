const socket = io();
// const {io} = require('socket.io-client');
// const socket = io.connect('http://website.com');

socket.on('connect', () => {
  console.log('Successfully connected!');
});

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".containerr");
const members= document.querySelector(".members");
var audio= new Audio("ting.mp3");


const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if(position=="left"){
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);


socket.on("user-joined", (name) => {
    append(`${name} joined the chat`, "right");

    const memberDiv = document.createElement("div");
    const para= document.createElement("p");
    const image=document.createElement("img");
    image.classList.add("avatar");
    image.setAttribute("src","https://mir-s3-cdn-cf.behance.net/user/276/1ea31f12265413.56bc7d4311adf.png");
    para.innerText=`${name}`;
    memberDiv.classList.add("member");
    memberDiv.append(image);
    memberDiv.append(para);
    memberDiv.setAttribute("id",`${name}`);
    members.append(memberDiv);

});

socket.on("recieve", (data) => {
  append(`${data.name}: ${data.message} `, "left");
});

socket.on("left", (name) => {
  append(`${name} left the chat `, "left");
  let toBeDeleted=document.getElementById(`${name}`);
  toBeDeleted.remove();
});
