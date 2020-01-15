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
        const urlParams = new URLSearchParams(window.location.search)
        const tributeTypes = {
            COMMENT: 1,
            CANDLE: 2,
            PHOTO: 3
        }

        fetch(`https://staging.funeralinnovations.com/obituaries/getTributes?obit_id=${urlParams.get('obit_id')}&format=json&cors=1`)
            .then(response => response.json())
            .then(json => {

                // create elements based on json response
                json.tributes.forEach((trib, i) => {

                    // only care for comments, candles and photo tributes
                    if([1,2,3].includes(parseInt(trib.tribute.type_id)))
                    {
                        // create our tribute
                        let memory = document.createElement('a-entity')
                        let memoryAttributes = ''
                        let memoryType = parseInt(trib.tribute.type_id) === 2 ? 'candle' : 'flower'

                        let position = {
                            x: null,
                            y: 0.5,
                            z: UTILS.randomNumberFromInterval(-1.7, 1, true).toFixed(2)
                        };

                        // set tribute graphics as well as grouped positions
                        if (parseInt(trib.tribute.type_id) === tributeTypes.CANDLE) {
                            position.x = UTILS.randomNumberFromInterval(-1, 1, true).toFixed(2)
                        } else if (parseInt(trib.tribute.type_id) === tributeTypes.COMMENT) {
                            position.x = UTILS.randomNumberFromInterval(-2, -1, true).toFixed(2)
                        } else if (parseInt(trib.tribute.type_id) === tributeTypes.PHOTO) {
                            position.x = UTILS.randomNumberFromInterval(0, 1, true).toFixed(2)
                        }

                        // set position
                        memory.setAttribute('position', position)

                        let rotation = [0, UTILS.randomNumberFromInterval(-180, 180), 0]

                        // set rotation so that flower aren't always facing same direction
                        memory.setAttribute('rotation', rotation.join(' '))

                        // update flower type
                        if (parseInt(trib.tribute.type_id) === 3)
                            memoryAttributes += 'memory_type: photo'

                        // update memory attributes
                        memory.setAttribute(memoryType, memoryAttributes)

                        memory.setAttribute('startic-body', 'shape: auto')

                        this.el.appendChild(memory)
                    }
                })
            })
    }
})
