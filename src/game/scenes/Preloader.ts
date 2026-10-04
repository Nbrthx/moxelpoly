import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(this.scale.width/2, this.scale.height/2, 468, 32).setStrokeStyle(1, 0x000000);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(this.scale.width/2-230, this.scale.height/2, 4, 28, 0x000000);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image("board", "monopoly-board.png")

        this.load.spritesheet("char1", "char1.png", { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet("char2", "char2.png", { frameWidth: 64, frameHeight: 64 })

        this.load.spritesheet("dice", "dice.png", { frameWidth: 32, frameHeight: 32 })

        this.load.image("info-board", "info-board.png")
        this.load.image("card", "card.png")
        this.load.spritesheet("arrow", "arrow.png", { frameWidth: 48, frameHeight: 48 })

        this.load.image("buy-btn", "buy-btn.png")
        this.load.image("buy-btn-d", "buy-btn-d.png")
        this.load.image("nobuy-btn", "nobuy-btn.png")

        this.load.image("btn-roll", "btn-roll.png")

        this.load.spritesheet("house1", "house1.png", { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet("house2", "house2.png", { frameWidth: 48, frameHeight: 48 })

        this.load.font("monogram", "monogram.ttf")
    }

    create ()
    {

        this.anims.create({
            key: "char1-idle",
            frames: this.anims.generateFrameNumbers("char1", { frames: [0, 1] }),
            frameRate: 4,
            repeat: -1
        })
        this.anims.create({
            key: "char2-idle",
            frames: this.anims.generateFrameNumbers("char2", { frames: [0, 1] }),
            frameRate: 4, 
            repeat: -1
        })
        
        this.anims.create({
            key: "roll-dice1",
            frames: this.anims.generateFrameNumbers("dice", { frames: [0, 3, 1, 4, 2, 5, 4, 2, 1, 0, 3] }),
            frameRate: 13
        })
        this.anims.create({
            key: "roll-dice2",
            frames: this.anims.generateFrameNumbers("dice", { frames: [3, 1, 4, 5, 2, 1, 0, 3, 2, 2, 0] }),
            frameRate: 13
        })

        this.anims.create({
            key: "arrow-tick",
            frames: this.anims.generateFrameNumbers("arrow", { frames: [0, 1] }),
            frameRate: 4,
            repeat: -1
        })

        this.scene.start('Game');
    }
}
