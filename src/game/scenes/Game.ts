import { GameObjects, Scene } from 'phaser';
import { Player } from '../prefabs/Player';
import { Dice } from '../prefabs/Dice';
import { GameUI } from './GameUI';
import { MapDatas } from '../components/MapDatas';

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    bg: GameObjects.Image;

    dice: Dice;

    players: Player[]
    currentIndex: number;

    gameScale: number

    pointerDown: boolean
    isWalk: boolean
    mapDatas: MapDatas;

    UI: GameUI;

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

        this.dice = new Dice(this)

        this.mapDatas = new MapDatas()

        const player1 = new Player(this, this.mapDatas.locations[0].x*this.gameScale, this.mapDatas.locations[0].y*this.gameScale, 0)
        const player2 = new Player(this, this.mapDatas.locations[0].x*this.gameScale, this.mapDatas.locations[0].y*this.gameScale, 1)

        this.players = [player1, player2]

        this.currentIndex = 0

        this.UI = (this.scene.get('GameUI') || this.scene.add('GameUI', new GameUI(), true)) as GameUI

        this.pointerDown = false

        this.input.on("pointermove", (_pointer: PointerEvent, currentlyOver: GameObjects.GameObject[]) => {
            // console.log(currentlyOver)
            this.UI.pointerCurrentlyOver = currentlyOver.length
        })

        // this.add.text(320, 180, "Test", {
        //     fontFamily: "monogram", color: "#000000"
        // })
    }

    update(): void {
        const player = this.players[this.currentIndex]
        if(this.isWalk && !this.pointerDown){
            this.camera.setScroll(
                lerp(this.camera.scrollX, player.x-this.scale.width/2, 0.04),
                lerp(this.camera.scrollY, player.y-this.scale.height/2, 0.04)
            )
            player.setDepth(player.y)
        }
        else if((Math.abs(this.camera.scrollX) >= 1 || Math.abs(this.camera.scrollY) >= 1) && !this.pointerDown){
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
                x: (this.mapDatas.locations[((curr+1) % 32)].x+player.offset.x)*this.gameScale,
                y: (this.mapDatas.locations[((curr+1) % 32)].y+player.offset.y)*this.gameScale,
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
