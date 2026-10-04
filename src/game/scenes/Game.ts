import { GameObjects, Scene } from 'phaser';
import { Player } from '../prefabs/Player';
import { GameUI } from './GameUI';
import { MapDatas } from '../components/MapDatas';
import { House } from '../prefabs/House';

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    bg: GameObjects.Image;
    gameScale: number
    houses: House[]

    // State
    players: Player[]
    currentIndex: number;

    diceDouble: boolean

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

        this.mapDatas = new MapDatas()

        const startPos = { x: this.mapDatas.locations[0].x*this.gameScale, y: this.mapDatas.locations[0].y*this.gameScale }

        const player1 = new Player(this, startPos.x, startPos.y, 0, "Niberthix")
        const player2 = new Player(this, startPos.x, startPos.y, 1, "Sabrina")

        this.players = [player1, player2]

        this.currentIndex = 0

        this.houses = []

        this.UI = (this.scene.get('GameUI') || this.scene.add('GameUI', new GameUI(), true)) as GameUI

        this.pointerDown = false

        this.input.on("pointermove", (_pointer: PointerEvent, currentlyOver: GameObjects.GameObject[]) => {
            this.UI.pointerCurrentlyOver = currentlyOver.length
        })

        this.diceDouble = false

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
        const player = this.players[this.currentIndex]

        if(curr < dest){ 

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

            if((curr % 32) == 31) {
                player.money += 150
                this.UI.refreshInfoBoard()
            }

            this.isWalk = true
        }
        else{
            setTimeout(() => {
                const place = this.mapDatas.places.find(v => v.location == (dest % 32))
                if(place){
                    const ownedHouse = this.houses.find(v => v.location == place.location)
                    if(ownedHouse){
                        const owner = this.players.find(v => v.id == ownedHouse.ownerId) 
                        if(owner && ownedHouse.ownerId != player.id){
                            owner.money += place.price/2
                            player.money -= place.price/2
                            this.UI.refreshInfoBoard()
                            this.isWalk = false
                            this.changeTurn()
                        }
                        else{
                            this.isWalk = false
                            this.changeTurn()
                        }
                    }
                    else{
                        this.UI.card.showCard(place, player)
                    }
                }
                else{
                    this.isWalk = false
                    this.changeTurn()
                    this.UI.dice.setVisible(true)
                }
            }, 1200)
        }
    }

    changeTurn(){
        if(this.diceDouble){
            this.diceDouble = false
        }
        else{
            this.currentIndex = (this.currentIndex + 1) % this.players.length
        }
    }
}
