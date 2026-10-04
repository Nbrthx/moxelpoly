import { GameObjects } from "phaser";
import { Game } from "../scenes/Game";
import { GameUI } from "../scenes/GameUI";


export class Dice extends GameObjects.Container {

    btnRoll: GameObjects.Image
    dice1: GameObjects.Sprite
    dice2: GameObjects.Sprite

    uiScale: number

    isDiceClicked: boolean
    doubleText: GameObjects.Text;

    constructor(scene: GameUI){
        super(scene)

        this.uiScale = scene.uiScale

        scene.add.existing(this)
        
        this.btnRoll = scene.add.image(scene.scale.width/2, scene.scale.height/2, "btn-roll")
        this.btnRoll.setScale(this.uiScale)
        this.dice1 = scene.add.sprite(scene.scale.width/2-64*this.uiScale, scene.scale.height/2-40, "dice")
        this.dice1.setScale(this.uiScale)
        this.dice2 = scene.add.sprite(scene.scale.width/2+64*this.uiScale, scene.scale.height/2+40, "dice")
        this.dice2.setScale(this.uiScale)

        this.dice1.on("animationcomplete", () => {
            if(this.dice1.anims.currentAnim?.key){
                this.onAnimationComplete(scene.gameScene)
            }
        })

        this.isDiceClicked = false

        const clickArea = scene.add.rectangle(scene.scale.width/2, scene.scale.height/2, 144*scene.uiScale, 64*scene.uiScale)
        clickArea.setInteractive()
        
        clickArea.on("pointerdown", () => {
            if(!this.isDiceClicked){
                this.isDiceClicked = true
                this.dice1.play("roll-dice1")
                this.dice2.play("roll-dice2")
            }
        })

        this.doubleText = scene.add.text(scene.scale.width/2, scene.scale.height/2+40*this.uiScale, "DOUBLE", {
            fontFamily: "monogram", color: "#313638", fontSize: 32*this.uiScale,
            // stroke: "#ffffff", strokeThickness: 2*this.uiScale
        })
        this.doubleText.setOrigin(0.5)
        this.doubleText.setVisible(false)

        this.add([this.btnRoll, this.dice1, this.dice2, clickArea, this.doubleText])
    }

    onAnimationComplete(scene: Game){
        let rng1 = Math.floor(Math.random()*6)+1
        let rng2 = Math.floor(Math.random()*6)+1

        this.dice1.setFrame(rng1-1)
        this.dice2.setFrame(rng2-1)

        if(rng1 == rng2){
            scene.diceDouble = true
            this.doubleText.setVisible(true)
        }

        setTimeout(() => {
            scene.isWalk = true
            this.setVisible(false)
            this.doubleText.setVisible(false)
        }, 1000)
        setTimeout(() => {
            scene.walk(scene.players[scene.currentIndex].step, scene.players[scene.currentIndex].step+rng1+rng2)
            scene.players[scene.currentIndex].step += rng1+rng2

            this.isDiceClicked = false
        }, 1300)
    }
}