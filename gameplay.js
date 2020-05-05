import { Phaser } from "./phaser.min"

//starting phasor game
window.onload = function(){
    var game = new Phaser.game(1280, 720, Phaser.CANVAS, 'game');
    game.state.add('Main', App.Main);
    game.state.start('Main');
}

//programming the game
var App= {};

App.Main = function(game){
    this.STATE_INIT = 1;
    this.STATE_START = 2;
    this.STATE_PLAY = 3;
    this.STATE_GAMEOVER = 4;

    this.BARRIER_DISTANCE = 300;
}


App.Main.prototype = {
    preload : function(){
        this.game.load.spritesheet('imgBird', 'assets/img_bird.png', 36, 36, 20);
        this.game.load.spritesheet('imgTree', 'assets/img_tree.png', 90, 400, 2);
        this.game.load.spritesheet('imgButtons', 'assets/img_buttons.png', 110, 40, 3);

        this.game.load.image('imgTarget', 'assets/img_target.png');
        this.game.load.image('imgGround', 'assets/img_ground.png');
        this.game.load.image('imgPause', 'assets/img_pause.png');
        this.game.load.image('imgLogo', 'assets/img_logo.png');

        this.game.bitmapfont('fnt_chars_black', 'assets/fnt_chars_black.png', 'assets/fnt_chars_black.fnt');
        this.game.bitmapfont('fnt_digits_blue', 'assets/fnt_digits_blue.png', 'assets/fnt_digits_blue.fnt');
        this.game.bitmapfont('fnt_digits_green', 'assets/fnt_digits_green.png', 'assets/fnt_digits_green.fnt');
        this.game.bitmapfont('fnt_digits_red', 'assets/fnt_digits_red.png', 'assets/fnt_digits_red.fnt');
    },
    create: function(){
        this.scale.scaleMode = Phase.scaleManager.SHOW_ALL;
        this.scale.AlignVertically = true;
        this.scale.AlignHorizontally = true;

        this.game.stage.physics.startSystem(phaser.Physics>ARCADE);

        this.game.physics.arcade.gravity.y = 2000;

        this.GA = new GeneticAlgorithm(10, 5)
    }
}