var game = new Phaser.Game(480, 640, Phaser.AUTO, '');

game.state.add('play', {
	preload: function(){
		game.load.image("player", "assets/player.png");
		game.load.image("bg", "assets/bg.png");
		game.load.image("platform", "assets/platform.png");
	},

	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE)
		game.add.sprite(0,0,"bg");
		this.player = game.add.sprite(220,360,"player");
		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 2000;
		this.platforms = game.add.group();
		this.platforms.enableBody = true;
		for (let i = 0; i < 128; i++) {
			this.platforms.create(Math.random()*480,Math.random()*640,"platform");
		}
		this.platforms.children.forEach(
			i => {
				i.exists = false;
				i.body.immovable = true;
				i.body.checkCollision.down = false;
				i.body.checkCollision.left = false;
				i.body.checkCollision.right = false;
			}
		)
		for (var i = 0; i < 6; i++) {
			this.platforms.children[i].x = i*93-41;
			this.platforms.children[i].y = 630;
			this.platforms.children[i].exists = true;
		}
	},

	update: function(){
		var hitPlatform = game.physics.arcade.collide(this.player, this.platforms);
		if (hitPlatform) {
			this.player.body.velocity.y = -1050;
		}
	}
});

game.state.start('play');
