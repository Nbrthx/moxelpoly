import { GameObjects, Scene } from "phaser";
import { Card } from "../prefabs/Card";
import { Game } from "./Game";



export class GameUI extends Scene {

    uiScale: number
    gameScene: Game

    pointerCurrentlyOver: number // from Game Scene

    constructor(){
        super("GameUI")
    }

    create(){
        this.gameScene = this.scene.get("Game") as Game

        this.uiScale = 3

        this.pointerCurrentlyOver = 0

        const infoBoard1 = this.add.image(8, 48, "info-board")
        infoBoard1.setScale(this.uiScale)
        infoBoard1.setOrigin(0)
        infoBoard1.setInteractive()

        const infoBoard2 = this.add.image(this.scale.width-8, 48, "info-board")
        infoBoard2.setScale(this.uiScale)
        infoBoard2.setOrigin(1, 0)
        infoBoard2.setInteractive()

        const infoBoard3 = this.add.image(8, this.scale.height-8, "info-board")
        infoBoard3.setScale(this.uiScale)
        infoBoard3.setOrigin(0, 1)
        infoBoard3.setInteractive()

        const infoBoard4 = this.add.image(this.scale.width-8, this.scale.height-8, "info-board")
        infoBoard4.setScale(this.uiScale)
        infoBoard4.setOrigin(1)
        infoBoard4.setInteractive()

        this.add.text(32, 64, "Hello World", {
            fontFamily: "monogram", color: "#000000", fontSize: 16*this.uiScale
        })

        let downPos = { x: 0, y: 0 }

        this.input.on("pointerdown", (pointer: PointerEvent, currentlyOver: GameObjects.GameObject[]) => {
            if(currentlyOver.length == 0 && this.pointerCurrentlyOver == 0 && !this.gameScene.isWalk){
                this.gameScene.pointerDown = true
                downPos = { x: pointer.x, y: pointer.y }
            }
        })

        this.input.on("pointermove", (pointer: PointerEvent) => {
            if(this.gameScene.pointerDown){
                this.gameScene.camera.scrollX = downPos.x-pointer.x
                this.gameScene.camera.scrollY = downPos.y-pointer.y
            }
        })

        this.input.on("pointerup", () => {
            this.gameScene.pointerDown = false
            downPos = { x: 0, y: 0 }
        })

        this.input.on("pointerupoutside", () => {
            this.gameScene.pointerDown = false
            downPos = { x: 0, y: 0 }
        })

        new Card(this)
    }
}