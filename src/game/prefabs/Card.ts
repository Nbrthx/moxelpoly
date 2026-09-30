import { GameObjects } from "phaser";
import { GameUI } from "../scenes/GameUI";
import { Place } from "../components/MapDatas";
import { Player } from "./Player";
export class Card extends GameObjects.Container {

    uiScale: number
    text: GameObjects.Text

    buyBtn: GameObjects.Image;
    nobuyBtn: GameObjects.Image;

    buyCallback: (place: Place) => void
    nobuyCallback: () => void

    currentPlace: Place

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

        this.buyBtn = scene.add.image(scene.scale.width/2-42*this.uiScale, scene.scale.height/2+100*this.uiScale, "buy-btn")
        this.buyBtn.setScale(this.uiScale)
        this.buyBtn.setTexture("buy-btn-d")

        this.nobuyBtn = scene.add.image(scene.scale.width/2+42*this.uiScale, scene.scale.height/2+100*this.uiScale, "nobuy-btn")
        this.nobuyBtn.setScale(this.uiScale)

        this.buyBtn.setInteractive()
        this.buyBtn.on("pointerdown", () => {
            if(this.buyBtn.texture.key == "buy-btn" && this.currentPlace){
                this.setVisible(false)
                this.buyCallback(this.currentPlace)
            }
        })

        this.nobuyBtn.setInteractive()
        this.nobuyBtn.on("pointerdown", () => {
            this.setVisible(false)
            this.nobuyCallback()
        })

        this.text = scene.add.text(scene.scale.width/2, scene.scale.height/2, "Null", {
            fontFamily: "monogram", fontSize: 16*scene.uiScale, color: "#313638"
        })
        this.text.setWordWrapWidth(128*this.uiScale)
        this.text.setOrigin(0.5)

        this.add([bg, img, arrowLeft, arrowRight, this.buyBtn, this.nobuyBtn, this.text])
    }

    showCard(place: Place, player: Player){

        this.text.setText("Buy this "+place.name+" with price $"+place.price+"?")

        this.currentPlace = place

        if(player.money >= place.price){
            this.buyBtn.setTexture("buy-btn")
        }
        else{
            this.buyBtn.setTexture("buy-btn-d")
        }

        this.setVisible(true)
    }
}