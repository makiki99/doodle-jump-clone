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
		//creates proper bounduaries
		//starts physics
		game.physics.startSystem(Phaser.Physics.ARCADE)
		//background
		this.background = game.add.sprite(0,0,"bg");
		//player
		this.player = game.add.sprite(220,360,"player");
		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 2000;
		//platforms
		this.platforms = game.add.group();
		this.platforms.enableBody = true;
		for (let i = 0; i < 128; i++) {
			// create buffer of platforms, because constantly deleting and creating
			// objects is slow
			this.platforms.create(Math.random()*387,i*(64),"platform");
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
		for (var i = 122; i < 128; i++) {
			// sets up floor
			this.platforms.children[i].x = (i-122)*93-41;
			this.platforms.children[i].y = 630;
			this.platforms.children[i].exists = true;
		}
	},

	update: function(){
		// checks collision against platforms
		var hitPlatform = game.physics.arcade.collide(this.player, this.platforms);
		if (hitPlatform) {
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
		game.world.setBounds(0, -320+this.player.y, 480, 640);
		//move background
		this.background.y = game.world.y;
	}
});

//begins a game
game.state.start('play');
