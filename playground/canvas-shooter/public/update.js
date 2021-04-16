import Particle from './classes/Particle.js'

export default function update(game, socket) {
    for (const p in game.players) {
        game.players[p].update();
    }

    // remove vanished particles from the game
    game.particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            game.particles.splice(index, 1);
        } else {
        particle.update();
        }
    });

    // remove projectiles outside of screen from the game
    game.projectiles.forEach((projectile, index) => {
        projectile.update();

        if (projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > game.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > game.height
        ) {
        setTimeout(() => {
            game.projectiles.splice(index, 1);
        }, 0);
        }
    });

    game.enemies.forEach((enemy, index) => {
        enemy.update();

        // remove enemies outside of screen from the game
        if (enemy.x + enemy.radius < 0 ||
            enemy.x - enemy.radius > game.width ||
            enemy.y + enemy.radius < 0 ||
            enemy.y - enemy.radius > game.height
        ) {
            setTimeout(() => {
                game.enemies.splice(index, 1);
            }, 0);
        }

        for (const p in game.players) {
            const distance = Math.hypot(game.players[p].x - enemy.x, game.players[p].y - enemy.y);

            // check enemies colision with player
            if (distance - game.players[p].radius - enemy.radius < 1) {
                
                // create particles when hit
                for (let i = 0; i < game.players[p].radius * 4; i++) {
                    game.particles.push(new Particle(
                        game.players[p].x,
                        game.players[p].y,
                        Math.random() * 2,
                        game.players[p].color,
                        {
                            x: (Math.random() - 0.5) * (Math.random() * 6),
                            y: (Math.random() - 0.5) * (Math.random() * 6),
                        }
                    ));
                }

                game.players[p].x = game.width / 2;
                game.players[p].y = game.height - 10;
            }            
        }

        // check projectiles collision with enemies
        game.projectiles.forEach((projectile, projecIndex) => {
        const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

        if (distance - projectile.radius - enemy.radius < 1) {

            // create particles when hit
            for (let i = 0; i < enemy.radius; i++) {
                game.particles.push(new Particle(
                    projectile.x,
                    projectile.y,
                    Math.random() * 2,
                    enemy.color,
                    {
                    x: (Math.random() - 0.5) * (Math.random() * 6),
                    y: (Math.random() - 0.5) * (Math.random() * 6),
                    }
                ));
            }

            // reduce enemy radius
            if (enemy.radius - 10 > 10) {
                enemy.radius -= 10
                setTimeout(() => {
                    game.projectiles.splice(projecIndex, 1);
                }, 0);
            } else {

            setTimeout(() => {
                game.enemies.splice(index, 1);
                game.projectiles.splice(projecIndex, 1);
            }, 0);
            }
        }
        })
    });

    socket.emit('update', game)

    return game
}
