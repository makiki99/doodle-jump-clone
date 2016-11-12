var game = new Phaser.Game(480, 640, Phaser.AUTO, '');

game.state.add('play', {
	self: this,

	preload: function(){
		//assets
		game.load.image("player", "assets/player.png");
		game.load.image("bg", "assets/bg.png");
		game.load.image("platform", "assets/platform.png");
	},

	create: function(){
		//starts physics
		game.physics.startSystem(Phaser.Physics.ARCADE)
		//background
		this.background = game.add.sprite(0,0,"bg");
		//player
		this.player = game.add.sprite(220,540,"player");
		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 2000;
		//platforms
		this.platforms = game.add.group();
		this.platforms.enableBody = true;
		for (let i = 0; i < 16; i++) {
			// create buffer of platforms, because constantly deleting and creating
			// objects is slow
			this.platforms.create(Math.random()*387,i*50-300,"platform");
		}
		this.platforms.children.forEach(
			// assigns proper properties to all platforms
			i => {
				i.exists = true;
				i.body.immovable = true;
				// properties below are needed to make jumping from below possible
				i.body.checkCollision.down = false;
				i.body.checkCollision.left = false;
				i.body.checkCollision.right = false;
			}
		)
		//floor
		this.floor = game.add.group();
		this.floor.enableBody = true;
		for (var i = 0; i < 6; i++) {
			this.floor.create(i*93-41,630,"platform");
		}
		this.floor.children.forEach(
			i => {
				i.body.immovable = true;
			}
		)
	},

	update: function(){
		// checks collision against platforms
		let hitPlatform = game.physics.arcade.collide(this.player, this.platforms);
		let hitFloor = game.physics.arcade.collide(this.player, this.floor);
		if (hitPlatform || hitFloor) {
			// when collision occurs, perform a jump
			this.player.body.velocity.y = -1050;
		}
		game.camera.y = this.player.y-320
		game.world.wrap(this.player,0,true,true,false);
		this.player.body.velocity.x = 0;
		if (true) {
			this.player.body.velocity.x += 250;
		}
		//move world bounduaries to create illusion of infinite world
		let position = -320+this.player.y;
		game.world.setBounds(0, position, 480, 640);
		//move background
		this.background.y = game.world.y;
	}
});

//begins a game
game.state.start('play');
