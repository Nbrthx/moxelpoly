import { Scene } from 'phaser';
import { Player } from '../prefabs/Player';
import { Dice } from '../prefabs/Dice';

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    bg: Phaser.GameObjects.Image;

    dice: Dice;

    char1: Player;
    char2: Player;

    players: Player[]
    currentIndex: number;

    gameScale: number

    isWalk: boolean
    locations: { x: number; y: number; }[];

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xc7dcd0)
        this.gameScale = 3

        this.bg = this.add.image(this.scale.width/2, this.scale.height/2, "board")
        this.bg.setScale(this.gameScale)

        this.locations = [
            { x: 526, y: 280 },

            { x: 466, y: 280 },
            { x: 418, y: 280 },
            { x: 370, y: 280 },
            { x: 322, y: 280 },
            { x: 274, y: 280 },
            { x: 226, y: 280 },
            { x: 178, y: 280 },
            { x: 118, y: 280 },

            { x: 118, y: 240 },
            { x: 118, y: 208 },
            { x: 118, y: 176 },
            { x: 118, y: 144 },
            { x: 118, y: 112 },
            { x: 118, y: 80 },
            { x: 118, y: 48 },
            { x: 118, y: 10 },

            { x: 178, y: 10 },
            { x: 226, y: 10 },
            { x: 274, y: 10 },
            { x: 322, y: 10 },
            { x: 370, y: 10 },
            { x: 418, y: 10 },
            { x: 466, y: 10 },
            { x: 526, y: 10 },

            { x: 526, y: 48 },
            { x: 526, y: 80 },
            { x: 526, y: 112 },
            { x: 526, y: 144 },
            { x: 526, y: 176 },
            { x: 526, y: 208 },
            { x: 526, y: 240 },
        ]

        this.dice = new Dice(this)

        this.char1 = new Player(this, this.locations[0].x*this.gameScale, this.locations[0].y*this.gameScale, 0)
        this.char2 = new Player(this, this.locations[0].x*this.gameScale, this.locations[0].y*this.gameScale, 1)

        this.players = [this.char1, this.char2]

        

        this.currentIndex = 0

        // this.add.text(320, 180, "Test", {
        //     fontFamily: "monogram", color: "#000000"
        // })
    }

    update(): void {
        const player = this.players[this.currentIndex]
        if(this.isWalk){
            this.camera.setScroll(
                lerp(this.camera.scrollX, player.x-this.scale.width/2, 0.04),
                lerp(this.camera.scrollY, player.y-this.scale.height/2, 0.04)
            )
            player.setDepth(player.y)
        }
        else if(Math.abs(this.camera.scrollX) >= 1 || Math.abs(this.camera.scrollY) >= 1){
            this.camera.setScroll(
                lerp(this.camera.scrollX, 0, 0.06),
                lerp(this.camera.scrollY, 0, 0.06)
            )
        }
    }

    walk(curr: number, dest: number){
        if(curr < dest){ 
            this.isWalk = true
            const player = this.players[this.currentIndex]
            this.tweens.add({
                targets: player,
                x: this.locations[((curr+1) % 32)].x*this.gameScale+player.offset.x*this.gameScale,
                y: this.locations[((curr+1) % 32)].y*this.gameScale+player.offset.y*this.gameScale,
                ease: "Power1",
                duration: 200,
                onComplete: () => {
                    this.walk(curr+1, dest)
                }
            })
        }
        else{
            setTimeout(() => {
                this.isWalk = false
                this.currentIndex = (this.currentIndex + 1) % this.players.length
            }, 1200)
        }
    }
}
