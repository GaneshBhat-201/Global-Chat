if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}

// const io = require("socket.io")(8000, {cors:{origin:"*"}});
const express=require("express");
const app=express();
const mongoose = require('mongoose');
const path=require("path");
const User=require("./models/user.js");
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));

const users = {};
const dburl=process.env.ATLASDB_URL;

const server = createServer(app);
const io = new Server(server);

main()
  .then(()=>{console.log("Connected to db")})
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(dburl);
}


server.listen(2000,()=>{
  console.log("listening to port 2000");
});

app.get("/",async(req,res)=>{
  let allUsers= await User.find({});
  res.render("index.ejs",{allUsers});
});


io.on("connection", (socket) => {
  socket.on("new-user-joined", async(name) => {
    const newUser=new User({name});
    await newUser.save();
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("recieve", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", async(message) => {
    await User.findOneAndDelete({name:users[socket.id]});
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
