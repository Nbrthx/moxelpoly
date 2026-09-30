import { GameObjects } from "phaser";
import { GameUI } from "../scenes/GameUI";
import { Player } from "./Player";



export class InfoBoard extends GameObjects.Container {

    player: Player
    money: GameObjects.Text;

    constructor(scene: GameUI, x: number, y: number, player: Player | null){
        super(scene, x, y)

        scene.add.existing(this)

        if(player == null){
            player = new Player(scene.gameScene, 0, 0, 100, "Empty")
        }

        this.player = player

        const bg = scene.add.image(0, 0, "info-board")
        bg.setScale(scene.uiScale)
        bg.setInteractive()

        const name = scene.add.text(0, -12*scene.uiScale, player.name, {
            fontFamily: "monogram", color: "#313638", fontSize: 16*scene.uiScale,
        })
        name.setOrigin(0.5)

        this.money = scene.add.text(0, 6*scene.uiScale, "$"+player.money, {
            fontFamily: "monogram", color: "#239063", fontSize: 16*scene.uiScale
        })
        this.money.setOrigin(0.5)

        this.add([bg, name, this.money])
    }

    refresh() {
        this.money.setText("$"+this.player.money)
    }
}