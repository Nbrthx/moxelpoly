

export interface Place {
    location: number
    name: string
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
                name: "Place A",
                price: 100
            },
            {
                location: 2,
                name: "Place B",
                price: 100
            },
            {
                location: 3,
                name: "Place C",
                price: 100
            },
            {
                location: 5,
                name: "Place D",
                price: 150
            },
            {
                location: 6,
                name: "Place E",
                price: 150
            },
            {
                location: 7,
                name: "Place F",
                price: 150
            },
            {
                location: 9,
                name: "Place G",
                price: 200
            },
            {
                location: 10,
                name: "Place H",
                price: 200
            },
            {
                location: 11,
                name: "Place I",
                price: 200
            },
            {
                location: 13,
                name: "Place J",
                price: 250
            },
            {
                location: 15,
                name: "Place K",
                price: 250
            },
            {
                location: 17,
                name: "Place L",
                price: 300
            },
            {
                location: 19,
                name: "Place M",
                price: 300
            },
            {
                location: 21,
                name: "Place N",
                price: 350
            },
            {
                location: 22,
                name: "Place O",
                price: 350
            },
            {
                location: 23,
                name: "Place P",
                price: 350
            },
            {
                location: 26,
                name: "Place Q",
                price: 350
            },
            {
                location: 27,
                name: "Place R",
                price: 350
            },
            {
                location: 29,
                name: "Place S",
                price: 400
            },
            {
                location: 31,
                name: "Place T",
                price: 400
            },
        ]
    }

}