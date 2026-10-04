import { GameObjects, Scene } from "phaser";
import { Card } from "../prefabs/Card";
import { Game } from "./Game";
import { InfoBoard } from "../prefabs/InfoBoard";
import { Place } from "../components/MapDatas";
import { House } from "../prefabs/House";
import { Dice } from "../prefabs/Dice";



export class GameUI extends Scene {

    uiScale: number
    gameScene: Game

    card: Card

    pointerCurrentlyOver: number // from Game Scene

    infoBoards: InfoBoard[];
    dice: Dice;

    constructor(){
        super("GameUI")
    }

    create(){
        this.gameScene = this.scene.get("Game") as Game

        this.uiScale = 3

        this.pointerCurrentlyOver = 0

        this.infoBoards = [
            new InfoBoard(this, 64*this.uiScale, 32*this.uiScale, this.gameScene.players[0]),
            new InfoBoard(this, this.scale.width-64*this.uiScale, 32*this.uiScale, this.gameScene.players[1]),
            new InfoBoard(this, this.scale.width-64*this.uiScale, this.scale.height-32*this.uiScale, null),
            new InfoBoard(this, 64*this.uiScale, this.scale.height-32*this.uiScale, null)
        ]

        // this.add.text(32, 64, "Hello World", {
        //     fontFamily: "monogram", color: "#000000", fontSize: 16*this.uiScale
        // })

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


        this.dice = new Dice(this)

        this.card = new Card(this)
        this.card.setVisible(false)

        this.card.nobuyCallback = () => {
            this.gameScene.isWalk = false
            this.gameScene.changeTurn()
            this.dice.setVisible(true)
        }

        this.card.buyCallback = (place: Place) => {
            this.gameScene.players[this.gameScene.currentIndex].money -= place.price
            this.refreshInfoBoard()

            this.gameScene.houses.push(
                new House(this.gameScene, place, this.gameScene.currentIndex)
            )
            
            this.gameScene.isWalk = false
            this.gameScene.changeTurn()
            this.dice.setVisible(true)
        }
    }

    refreshInfoBoard(){
        this.infoBoards.forEach(v => {
            v.refresh()
        })
    }
}