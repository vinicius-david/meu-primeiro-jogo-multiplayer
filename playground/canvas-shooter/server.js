import express from 'express'
import http from 'http'
import socketio from 'socket.io'

import Game from './public/classes/Game.js'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = new Game(1500, 950);
game.start();

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player connected: ${playerId}`)

    game.addPlayer(playerId)

    socket.on('disconnect', () => {
        game.removePlayer(playerId)
        console.log(`> Player disconnected: ${playerId}`)
    })
})

server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`)
})