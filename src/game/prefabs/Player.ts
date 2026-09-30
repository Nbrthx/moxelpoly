import { GameObjects } from "phaser"
import { Game } from "../scenes/Game"


export class Player extends GameObjects.Sprite {

    id: number
    name: string
    scene: Game
    step: number
    offset: { x: number, y: number }

    money: number

    constructor(scene: Game, x: number, y: number, id: number, name: string){

        let texture = "char1"
        let offset = { x: -1, y: -1 }
        let animIdle = "char1-idle"

        if(id == 1){
            texture = "char2"
            offset = { x: 1, y: 2 }
            animIdle = "char2-idle"
        }

        super(scene, x, y, texture)

        this.scene = scene
        this.id = id
        this.name = name
        this.offset = offset

        this.setPosition(this.x+this.offset.x*scene.gameScale, this.y+this.offset.y*scene.gameScale)

        setTimeout(() => this.play(animIdle), id*800)

        if(name != "Empty") scene.add.existing(this)
        this.setScale(scene.gameScale)

        this.step = 0

        this.money = 1000
    }
}