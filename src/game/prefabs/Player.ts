import { GameObjects } from "phaser"
import { Game } from "../scenes/Game"


export class Player extends GameObjects.Sprite {

    scene: Game
    step: number
    offset: { x: number, y: number }

    balance: number

    constructor(scene: Game, x: number, y: number, id: number){

        let texture = "char1"
        let offset = { x: 0, y: 0 }
        let animIdle = "char1-idle"
        if(id == 1){
            texture = "char2"
            offset = { x: 1, y: 2 }
            animIdle = "char2-idle"
        }

        super(scene, x, y, texture)

        this.scene = scene
        this.offset = offset

        setTimeout(() => this.play(animIdle), Math.floor(Math.random()*500))

        scene.add.existing(this)
        this.setScale(scene.gameScale)

        this.step = 0

        this.balance = 0
    }
}