AFRAME.registerComponent('tribute-garden', {
    schema: {
        tributes: { type: 'number', default: 0 }
    },
    init: function () {

        // define some cordinates (these could be defined in api too)
        let coordinates = [
            [-0.2, 0.5, -2], // candle
            [-1, 0.5, -2.5],
            [0.1, 0.5, -2.1], // candle
            [-0.5, 0.5, -2],
            [-0.75, 0.5, -2],
            [0.5, 0.5, -2.2] // photo
        ]



        // example api
        fetch('https://staging.funeralinnovations.com/obituaries/getTributes?obit_id=344935&format=json&cors=1')
        .then(response => response.json())
        .then(json => {

            // create elements based on json response
            json.tributes.forEach((memory, i) => {

                let tribute = document.createElement('a-entity')
                let memoryAttributes = 'position: ' + coordinates[i].join(' ')
                let memoryType = parseInt(memory.tribute.type_id) === 2 ? 'candle' : 'flower'

                // update flower type
                if(parseInt(memory.tribute.type_id) === 3)
                    memoryAttributes += '; memory_type: photo'

                tribute.setAttribute(memoryType, memoryAttributes)
                this.el.appendChild(tribute)


            })
        })
    }
})
