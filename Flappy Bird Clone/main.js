var mainState = {
    preload: function(){
        //preload images and sounds

        //load bird
        game.load.image('bird','assets/bird.png');

        //load pipe
        game.load.image('pipe', 'assets/pipe.png');

        //load jump sound
        game.load.audio('jump', 'assets/jump.wav');

    },
    create: function(){
        //setup

        //blue background color
        game.stage.backgroundColor = '#71c5cf';

        //physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //display bird
        this.bird = game.add.sprite(100,245,'bird');

        //enable bird to move
        game.physics.arcade.enable(this.bird);

        //gravity for bird
        this.bird.body.gravity.y = 1000;

        //bird to jump
        var spaceKey = game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump,this);

        //jump sound
        this.jumpSound = game.add.audio('jump');
        
        //move the anchor for rotation
        this.bird.anchor.setTo(-0.2,0.5);


        //group pipes
        this.pipes = game.add.group();

        //add pipes every 1.5 seconds
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);


        //display score
        this.score = 0;
        this.labelScore = game.add.text(20,20,"0",
        { font: "30px Arial", fill: "#ffffff"});

    },
    update: function(){
        //game logic
        
        //restart game if the bird is out of the screen
        if (this.bird.y < 0 || this.bird.y > 490)
        this.restartGame();

        //restart game if the bird collides witha a pipe
        game.physics.arcade.overlap(
            this.bird, this.pipes, this.hitPipe, null, this);
        
        //rotate bird slowly downwards
        if(this.bird.angle<20)
            this.bird.angle+=1;
    },

    jump: function(){
        //do not jump if bird hit pipes
        if(this.bird.alive == false)
            return;

        //add velocity to bird
        this.bird.body.velocity.y = -350;

        //animation for bird when jumping
        var animation = game.add.tween(this.bird);

        //change angle to -20 in 100 milliseconds
        animation.to({angle: -20}, 100);

        //start animation
        animation.start();

        //play jump sound
        this.jumpSound.play();
    },

    restartGame: function(){
        //start the main again to restart
        game.state.start('main');
    },

    addOnePipe: function(x,y){
        //create pipe
        var pipe = game.add.sprite(x,y,'pipe');

        //add to group
        this.pipes.add(pipe);

        //enable physics on pipe
        game.physics.arcade.enable(pipe);

        //add velocity to pipe
        pipe.body.velocity.x = -200;

        //remove pipe when it's no longer visible
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;

    },
    
    addRowOfPipes: function(){
        //randomly pick number bet/ 1 and 5 to add the opening
        var hole = Math.floor(Math.random() * 5) + 1;

        //add pipe when i is not equal to hole and hole + 1 
        for (var i = 0;i < 8;i++)
            if (i != hole && i != hole+1)
                this.addOnePipe(400,i * 60 + 10);
        
        //increase score by 1 each time new pipes are created
        this.score+=1;
        this.labelScore.text = this.score;
    },

    hitPipe: function(){
        //if bird hit a pipe do nothing
        //as it means that the bird is already falling off screen
        if(this.bird.alive == false)
            return;
        
        //set alive to false
        this.bird.alive = false;

        //stop new pipes from appearing
        game.time.events.remove(this.timer);

        //stop pipes from moving
        this.pipes.forEach(function(p){
            p.body.velocity.x = 0;
        }, this);
    }
};

//initialization
var game = new Phaser.Game(400,490);

//add main state
game.state.add('main', mainState);

//start
game.state.start('main');