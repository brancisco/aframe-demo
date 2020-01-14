AFRAME.registerComponent('tributes-garden', {
    schema: {
        // tributes: {type: 'number', default: 0}
    },
    init: function () {

        // define some coordinates (these could be defined in api too)
        let coordinates = [
            [-0.2, 0.5, -2], // candle
            [-1, 0.5, -2.5],
            [0.1, 0.5, -2.07], // candle
            [-0.5, 0.5, -2],
            [-0.75, 0.5, -2],
            [0.5, 0.25, -2.07] // photo
        ]

        // fetch tributes from api
        fetch('https://staging.funeralinnovations.com/obituaries/getTributes?obit_id=344935&format=json&cors=1')
            .then(response => response.json())
            .then(json => {

                // create elements based on json response
                json.tributes.forEach((trib, i) => {

                    // create our tribute
                    let memory = document.createElement('a-entity')
                    let memoryAttributes = 'position: ' + coordinates[i].join(' ')
                    let memoryType = parseInt(trib.tribute.type_id) === 2 ? 'candle' : 'flower'

                    // update flower type
                    if (parseInt(trib.tribute.type_id) === 3)
                        memoryAttributes += '; memory_type: photo'

                    // update memory attributes
                    memory.setAttribute(memoryType, memoryAttributes)

                    this.el.appendChild(memory)
                })
            })
    }
})
