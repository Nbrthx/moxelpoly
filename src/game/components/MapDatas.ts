

export interface Place {
    location: number
    name: string
    group: string
    price: number
}

export class MapDatas {

    locations: { x: number, y: number }[]
    places: Place[]

    constructor(){
        this.locations = [
            { x: 524, y: 287 },

            { x: 464, y: 288 },
            { x: 416, y: 288 },
            { x: 368, y: 288 },
            { x: 320, y: 288 },
            { x: 272, y: 288 },
            { x: 224, y: 288 },
            { x: 176, y: 288 },
            { x: 116, y: 288 },

            { x: 116, y: 248 },
            { x: 116, y: 216 },
            { x: 116, y: 184 },
            { x: 116, y: 152 },
            { x: 116, y: 120 },
            { x: 116, y: 88 },
            { x: 116, y: 56 },
            { x: 116, y: 10 },

            { x: 176, y: 10 },
            { x: 224, y: 10 },
            { x: 272, y: 10 },
            { x: 320, y: 10 },
            { x: 368, y: 10 },
            { x: 416, y: 10 },
            { x: 464, y: 10 },
            { x: 524, y: 10 },

            { x: 524, y: 56 },
            { x: 524, y: 88 },
            { x: 524, y: 120 },
            { x: 524, y: 152 },
            { x: 524, y: 184 },
            { x: 524, y: 216 },
            { x: 524, y: 248 },
        ]

        this.places = [
            {
                location: 1,
                name: "Mediterranean Avenue",
                group: "A",
                price: 60
            },
            {
                location: 2,
                name: "Baltic Avenue",
                group: "A",
                price: 60
            },
            {
                location: 3,
                name: "Oriental Avenue",
                group: "A",
                price: 60
            },
            {
                location: 5,
                name: "Vermont Avenue",
                group: "B",
                price: 100
            },
            {
                location: 6,
                name: "Connecticut Avenue",
                group: "B",
                price: 100
            },
            {
                location: 7,
                name: "St. Charles Place",
                group: "B",
                price: 120
            },
            {
                location: 9,
                name: "States Avenue",
                group: "C",
                price: 140
            },
            {
                location: 10,
                name: "Virginia Avenue",
                group: "C",
                price: 140
            },
            {
                location: 11,
                name: "St. James Place",
                group: "C",
                price: 160
            },
            {
                location: 13,
                name: "Tennessee Avenue",
                group: "D",
                price: 180
            },
            {
                location: 15,
                name: "New York Avenue",
                group: "D",
                price: 200
            },
            {
                location: 17,
                name: "Kentucky Avenue",
                group: "E",
                price: 220
            },
            {
                location: 19,
                name: "Indiana Avenue",
                group: "E",
                price: 240
            },
            {
                location: 21,
                name: "Illinois Avenue",
                group: "F",
                price: 260
            },
            {
                location: 22,
                name: "Atlantic Avenue",
                group: "F",
                price: 260
            },
            {
                location: 23,
                name: "Ventnor Avenue",
                group: "F",
                price: 280
            },
            {
                location: 26,
                name: "Marvin Gardens",
                group: "G",
                price: 300
            },
            {
                location: 27,
                name: "Pacific Ave",
                group: "G",
                price: 320
            },
            {
                location: 29,
                name: "North Carolina Ave",
                group: "H",
                price: 350
            },
            {
                location: 31,
                name: "Pennsylvania Ave",
                group: "H",
                price: 400
            },
        ]
    }

}