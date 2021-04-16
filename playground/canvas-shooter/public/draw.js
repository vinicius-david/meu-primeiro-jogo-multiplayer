export default function drawAll(document, game, requestAnimationFrame) {
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');

    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0, 0, game.width, game.height);
    
    for (const p in game.players) {
      game.players[p].draw(c);
    }

    game.enemies.forEach(e => {
      e.draw(c);
    });

    game.projectiles.forEach(p => {
      p.draw(c);
    });

    game.particles.forEach(p => {
      p.draw(c);
    });

    requestAnimationFrame(() => {
      drawAll(document, game, requestAnimationFrame)
    })
}
