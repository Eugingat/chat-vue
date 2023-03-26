const express = require('express');
const { createServer } = require("http");
const cookieParser = require('cookie-parser');
const { Server } = require("socket.io");
const cors = require('cors')
const port = 3000;


const app = express();

const listPosts = [];
const rooms = new Map();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }});

io.on('connection', (socket) => {
    socket.on('login', ({login, room}) => {
        socket.join(room);

        const dataRoom = rooms.get(room);

        if (!dataRoom) {
            rooms.set(room, {
                messages: [],
                users: [login]
            });

            io.to(room).emit('active-users', [ login ]);
        } else {
            rooms.set(room, {
                messages: [],
                users: [ ...dataRoom.users, login ]
            });


            io.to(room).emit('active-users', [ ...dataRoom.users, login ]);
        }
    });

    socket.on('message', ({room, message}) => {
        const dataRoom = rooms.get(room);

        rooms.set(room, {
            messages: [ ...dataRoom.messages, message],
            users: dataRoom.users
        });

        io.to(room).emit('new-message', [ ...dataRoom.messages, message]);
    });

    socket.on('left-room', ({ login, room }) => {
        const dataRoom = rooms.get(room);

        const filteredUsers = dataRoom.users.filter(user => user !== login);

        rooms.set(room, {
            messages: dataRoom.messages,
            users: filteredUsers,
        });

        socket.to(room).emit('new-message', [ ...dataRoom.messages, login + ' left room']);
        socket.to(room).emit('active-users', [ ...filteredUsers ]);
    });

    socket.on('disconnect', (client) => {
        console.log(client);
    });
})



httpServer.listen(port, () => {
    console.log('Listening server on ' + port)
})

module.exports = app;
