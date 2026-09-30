import { GameObjects } from "phaser";
import { Game } from "../scenes/Game";
import { Place } from "../components/MapDatas";



export class House extends GameObjects.Sprite{

    location: number
    ownerId: number
    
    constructor(scene: Game, place: Place, ownerId: number){
        super(scene, 0, 0, "house"+(ownerId+1))

        this.location = place.location
        this.ownerId = ownerId

        scene.add.existing(this)
        
        this.setScale(scene.gameScale)

        if(place.location > 0 && place.location < 8){
            this.setPosition(scene.mapDatas.locations[place.location].x*scene.gameScale, (scene.mapDatas.locations[place.location].y-10)*scene.gameScale)
        }
        else if(place.location > 8 && place.location < 16){
            this.setPosition((scene.mapDatas.locations[place.location].x+16)*scene.gameScale, (scene.mapDatas.locations[place.location].y+10)*scene.gameScale)
            this.setFrame(1)
        }
        else if(place.location > 16 && place.location < 24){
            this.setPosition(scene.mapDatas.locations[place.location].x*scene.gameScale, (scene.mapDatas.locations[place.location].y+27)*scene.gameScale)
            
        }
        else if(place.location > 24 && place.location < 32){
            this.setPosition((scene.mapDatas.locations[place.location].x-16)*scene.gameScale, (scene.mapDatas.locations[place.location].y+10)*scene.gameScale)
            this.setFrame(1)
            this.setFlipX(true)
        }

        this.setDepth(this.y)
    }
}