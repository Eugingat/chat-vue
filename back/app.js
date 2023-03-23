const express = require('express');
const { createServer } = require("http");
const cookieParser = require('cookie-parser');
const { Server } = require("socket.io");
const cors = require('cors')
const port = 3000;


const app = express();

const listPosts = [];
const listActiveUsers = new Set();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8080",
    }});

io.on('connection', (socket) => {
    socket.on('login', ({login, room}) => {
        listActiveUsers.add(login);
        socket.join(room);
        io.to(room).emit('active-users', [ ...listActiveUsers ]);
    });

    socket.on('message', (text) => {
        listPosts.push(text);

        io.emit('new-message', listPosts);
    });

    socket.on('disconnect', (client) => {
        console.log(33333333333)
        console.log(client)
        listActiveUsers.clear();
        io.emit('check-user', '');
    })
})



httpServer.listen(port, () => {
    console.log('Listening server on ' + port)
})

module.exports = app;
