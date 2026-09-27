import { GameObjects } from "phaser";
import { GameUI } from "../scenes/GameUI";


export class Card extends GameObjects.Container {

    uiScale: number

    constructor(scene: GameUI){
        super(scene)

        this.uiScale = scene.uiScale

        scene.add.existing(this)

        const bg = scene.add.rectangle(scene.scale.width/2,scene.scale.height/2,scene.scale.width,scene.scale.height, 0x000000, 0.5)
        bg.setInteractive()

        const img = scene.add.image(scene.scale.width/2, scene.scale.height/2, "card")
        img.setScale(this.uiScale)

        const arrowLeft = scene.add.sprite(scene.scale.width/2-128*this.uiScale, scene.scale.height/2, "arrow")
        arrowLeft.setScale(this.uiScale)
        arrowLeft.play("arrow-tick")

        const arrowRight = scene.add.sprite(scene.scale.width/2+128*this.uiScale, scene.scale.height/2, "arrow")
        arrowRight.setFlipX(true)
        arrowRight.setScale(this.uiScale)
        arrowRight.play("arrow-tick")

        const buyBtn = scene.add.image(scene.scale.width/2-42*this.uiScale, scene.scale.height/2+100*this.uiScale, "buy-btn")
        buyBtn.setScale(this.uiScale)
        buyBtn.setTexture("buy-btn-d")

        const nobuyBtn = scene.add.image(scene.scale.width/2+42*this.uiScale, scene.scale.height/2+100*this.uiScale, "nobuy-btn")
        nobuyBtn.setScale(this.uiScale)

        nobuyBtn.setInteractive()
        nobuyBtn.on("pointerdown", () => {
            this.setVisible(false)
        })

        this.add([bg, img, arrowLeft, arrowRight, buyBtn, nobuyBtn])
    }
}