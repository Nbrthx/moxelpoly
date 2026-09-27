import { GameObjects } from "phaser";
import { Game } from "../scenes/Game";


export class Dice extends GameObjects.Container {

    dice1: GameObjects.Sprite
    dice2: GameObjects.Sprite
    gameScale: number

    isDiceClicked: boolean

    constructor(scene: Game){
        super(scene)

        this.gameScale = scene.gameScale

        scene.add.existing(this)

        this.dice1 = scene.add.sprite(scene.scale.width/2-16*this.gameScale, scene.scale.height/2, "dice")
        this.dice1.setScale(this.gameScale)
        this.dice2 = scene.add.sprite(scene.scale.width/2+16*this.gameScale, scene.scale.height/2, "dice")
        this.dice2.setScale(this.gameScale)

        this.dice1.on("animationcomplete", () => {
            if(this.dice1.anims.currentAnim?.key){
                this.onAnimationComplete(scene)
            }
        })

        this.isDiceClicked = false

        const clickArea = scene.add.rectangle(scene.scale.width/2, scene.scale.height/2, 64*scene.gameScale, 32*scene.gameScale)
        clickArea.setInteractive()
        
        clickArea.on("pointerdown", () => {
            if(!this.isDiceClicked){
                this.isDiceClicked = true
                this.dice1.play("roll-dice1")
                this.dice2.play("roll-dice2")
            }
        })

        this.add([this.dice1, this.dice2, clickArea])
    }

    onAnimationComplete(scene: Game){
        let rng1 = Math.floor(Math.random()*6)+1
        let rng2 = Math.floor(Math.random()*6)+1

        this.dice1.setFrame(rng1-1)
        this.dice2.setFrame(rng2-1)

        setTimeout(() => {
            scene.isWalk = true
        }, 800)
        setTimeout(() => {
            scene.walk(scene.players[scene.currentIndex].step, scene.players[scene.currentIndex].step+rng1+rng2)
            scene.players[scene.currentIndex].step += rng1+rng2

            this.isDiceClicked = false
        }, 1100)
    }
}