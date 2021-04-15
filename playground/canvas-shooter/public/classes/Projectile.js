export default class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw(c) {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 360, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update(c) {
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.draw(c);
  }
}