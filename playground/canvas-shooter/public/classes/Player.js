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

  update(c) {
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

    this.draw(c);
  }

  ArrowLeft() {
    this.velocity.x -= 0.8;
  }

  a() {
    this.velocity.x -= 0.8;
  }

  ArrowRight() {
    this.velocity.x += 0.8;
  }

  d() {
    this.velocity.x += 0.8;
  }

  ArrowUp() {
    this.velocity.y -= 0.8;
  }

  w() {
    this.velocity.y -= 0.8;
  }

  ArrowDown() {
    this.velocity.y += 0.8;
  }

  s() {
    this.velocity.y += 0.8;
  }
}