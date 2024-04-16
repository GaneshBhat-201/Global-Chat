# Global Chat: A Real-time ChatApp

In every online games like Clash of Clans, PUBG etc.. there will be separate section
called global chat where every person in the region will have a common
communication line where each and every person who are active can send messages
and read others messages. <br/>
This project implements the same mechanism where each active users will
get notification when a member messages or joins or leaves the chat which are
implemented using Socket.io. In the left section there will be list of users who are
currently in the group and active. Messages will never be stored in database instead
only usernames are stored which will also be deleted when they leave the chat.

### Run the App:
```
npm install
node app.js
```

Link: https://global-chat-4123.onrender.com/
