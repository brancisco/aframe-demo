AFRAME.registerComponent('tribute-garden', {
    schema: {
        tributes: { type: 'number', default: 0 }
    },
    init: function () {

        // define some cordinates (these could be defined in api too)
        let coordinates = [
            [1, 0.5, -2],
            [-2, 0.5, -4],
            [-3, 0.5, -3],
            [0, 0.5, -2],
            [2, 0.5, -2],
            [1.5, 0.5, -2]
        ]



        // example api
        fetch('https://staging.funeralinnovations.com/obituaries/getTributes?obit_id=344935&format=json&cors=1')
        .then(response => response.json())
        .then(json => {
            // console.log(json)

            // create elements based on json response
            json.tributes.forEach((memory, i) => {
                console.log(memory)

                let tribute = document.createElement('a-entity')
                let memoryAttributes = 'position: ' + coordinates[i].join(' ')
                let memoryType = parseInt(memory.tribute.type_id) === 2 ? 'candle' : 'flower'
                tribute.setAttribute(memoryType, memoryAttributes)
                this.el.appendChild(tribute)


            })
        })
    }
})
