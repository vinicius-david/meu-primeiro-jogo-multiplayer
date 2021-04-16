import Player from './Player.js'
import Enemy from './Enemy.js' 
import Projectile from './Projectile.js';
import Particle from './Particle.js';

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.width = gameWidth;
    this.height = gameHeight;

    this.projectiles = [];
    this.enemies = [];
    this.particles = [];
    this.players = {};

    this.animationId;
  }
  
  start() {
    this.createEnemies();
  }

  addPlayer(playerId) {
    this.players[playerId] = new Player(this.width / 2, this.height / 2, 20, 'white', this.width, this.height);
  }

  removePlayer(playerId) {
    delete this.players[playerId];
  }

  setState(game) {
    this.projectiles = game.projectiles.map(p => {
      return new Projectile(p.x, p.y, p.radius, p.color, p.velocity)
    })

    this.enemies = game.enemies.map(e => {
      return new Enemy(e.x, e.y, e.radius, e.color, e.velocity)
    })

    this.particles = game.particles.map(p => {
      return new Particle(p.x, p.y, p.radius, p.color, p.velocity)
    })
    
    for (const p in game.players) {
      this.players[p] = new Player(game.players[p].x, game.players[p].y, game.players[p].radius, game.players[p].color, this.width, this.height);
    }

    this.animationId = game.animationId;
  }

  createEnemies() {
    setInterval(() => {
      const radius = 35 * Math.random() + 5;
  
      let x, y;
  
      if (Math.random() > 0.5) {
        x = Math.random() > 0.5 ? 0 - radius : this.width + radius;
        y = Math.random() * this.height;
      } else {
        x = Math.random() * this.width;
        y = Math.random() > 0.5 ? 0 - radius : this.height + radius;
      }
  
      const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
  
      const angle = Math.atan2(this.height / 2 - y, this.width / 2 - x);
      const speed = 1;
  
      const velocity = { 
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      }
  
      this.enemies.push(new Enemy(x,y,radius,color,velocity));
    }, 500);
  }
}