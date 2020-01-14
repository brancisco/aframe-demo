require('./sub-component-example.js')

AFRAME.registerComponent('multi-photo-example', {
    schema: {
        tributes: { type: 'number', default: 0 }
    },
    init: function () {

        // define some cordinates (these could be defined in api too)
        let cordinates = [
            [1, 1, 1],
            [2, 2, 2],
            [3, 3, 3],
            [4, 4, 4],
            [5, 5, 5]
        ]

        // define some rotations
        let rotations = [
            [0, 10, 0],
            [20, 30, 0],
            [50, 0, 100],
            [20, 0, 0],
            [0, 0, 30]
        ]
        // example api
        fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            // create elements based on json response
            for (let i = 0; i < 5; i ++) {
                let photoel = document.createElement('a-entity')
                let position = cordinates[i]
                let rotation = rotations[i]
                console.log({pos: position.join(' '), rot: rotation.join(' ')})
                photoel.setAttribute('sub-component-example', `url: ${json[i].thumbnailUrl}; position: ${position.join(' ')}; rotation: ${rotation.join(' ')}`)
                this.el.appendChild(photoel)
            }
        })
    }
})
