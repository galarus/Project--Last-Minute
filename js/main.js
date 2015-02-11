var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update:update, render: render });

function preload() {
    game.load.image('ship', 'assets/ship.png');
    game.load.image('stars', 'assets/stars.jpg');
    game.load.image('earth', 'assets/earth.gif');
}

function create() {
	game.add.tileSprite(0,0, 2981, 2981, 'stars');
	game.world.setBounds(0, 0, 2981, 2981);
    game.physics.startSystem(Phaser.Physics.P2JS);

    cursors = game.input.keyboard.createCursorKeys();
    player = game.add.sprite(32, game.world.height - 150, 'ship');
    earth = game.add.sprite(500, 500, 'earth');
    game.physics.p2.enable([player,earth], true);
    earth.body.setCircle(80);
    earth.body.static = true;
    game.camera.follow(player);
};

function update() {


    if (cursors.left.isDown) {player.body.rotateLeft(100);}   //ship movement
    else if (cursors.right.isDown){player.body.rotateRight(100);}
    else {player.body.setZeroRotation();}
    if (cursors.up.isDown){player.body.thrust(400);}
    else if (cursors.down.isDown){player.body.reverse(400);}
    gravitateToObject(player, earth);
};
function gravitateToObject(obj1, obj2, gravPow) {
    if (typeof speed === 'undefined') { gravPow = 10000000; }
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    rdistance = Phaser.Point.distance(obj1, obj2);
    gravF = (gravPow / (rdistance * rdistance));
    obj1.body.force.x += Math.cos(angle) * gravF;    // accelerateToObject 
    obj1.body.force.y += Math.sin(angle) * gravF;
}

function render() {
	this.game.debug.text("distance from earth: " + rdistance, 75, 150);
	this.game.debug.text("force of gravity: " + gravF, 75, 175);
    this.game.debug.cameraInfo(game.camera, 32, 32);
    this.game.debug.spriteCoords(player, 32, 500);

}
