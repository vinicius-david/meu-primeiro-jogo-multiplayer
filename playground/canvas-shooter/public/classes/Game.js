import Player from './Player.js'
import Enemy from './Enemy.js' 

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.width = gameWidth;
    this.height = gameHeight;
  }
  
  start() {
    this.projectiles = [];
    this.enemies = [];
    this.particles = [];
    this.players = {};
    
    this.animationId;

    this.createEnemies();
  }

  addPlayer(playerId) {
    this.players[playerId] = new Player(this.width / 2, this.height / 2, 20, 'white', this.width, this.height);
  }

  removePlayer(playerId) {
    delete this.players[playerId];
  }

  // updateState(game) {
  //   this = game;
  // }

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
      const speed = 2.5;
  
      const velocity = { 
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      }
  
      this.enemies.push(new Enemy(x,y,radius,color,velocity));
    }, 500);
  }
}