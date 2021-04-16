import express from 'express'
import http from 'http'
import socketio from 'socket.io'

import Game from './public/classes/Game.js'
import Projectile from './public/classes/Projectile.js'
import Player from './public/classes/Player.js'

import update from './public/update.js'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

let game = new Game(1500, 950);
game.start();

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player connected: ${playerId}`)

    game.addPlayer(playerId)

    socket.emit('setup', game)

    socket.on('disconnect', () => {
        game.removePlayer(playerId)
        console.log(`> Player disconnected: ${playerId}`)
    })

    socket.on('projectile', projectiles => {
        game.projectiles = projectiles.map(p => {
            return new Projectile(p.x, p.y, p.radius, p.color, p.velocity)
        })
    })

    socket.on('player', ([v, id]) => {
        if (game.players[id]) game.players[id].velocity = v
    })

    setInterval(() => {
        game = update(game, socket)
    }, 10)
})

server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`)
})