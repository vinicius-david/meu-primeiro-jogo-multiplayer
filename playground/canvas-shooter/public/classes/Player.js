export default class Player {
  constructor(x, y, radius, color, gameWidht, gameHeight) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.velocity = { x: 0, y: 0, }

    this.gameWidht = gameWidht;
    this.gameHeight = gameHeight;

    this.friction = 0.97;
  }

  draw(c) {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 360, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    if (this.x <= 0 + this.radius) {
      this.x = this.x + 5;
      this.velocity.x = 0;
    } else if (this.x >= this.gameWidht - this.radius) {
      this.x = this.x - 5;
      this.velocity.x = 0;
    } else {
      this.x += this.velocity.x;
    }

    if (this.y <= 0 + this.radius) {
      this.y = this.y + 5;
      this.velocity.y = 0;
    } else if (this.y >= this.gameHeight - this.radius) {
      this.y = this.y - 5;
      this.velocity.y = 0;
    } else {
      this.y += this.velocity.y;
    }

    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
  }

  ArrowLeft() {
    this.velocity.x -= 1.5;
  }

  a() {
    this.velocity.x -= 1.5;
  }

  ArrowRight() {
    this.velocity.x += 1.5;
  }

  d() {
    this.velocity.x += 1.5;
  }

  ArrowUp() {
    this.velocity.y -= 1.5;
  }

  w() {
    this.velocity.y -= 1.5;
  }

  ArrowDown() {
    this.velocity.y += 1.5;
  }

  s() {
    this.velocity.y += 1.5;
  }
}