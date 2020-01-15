AFRAME.registerComponent('tributes-garden', {
    schema: {
        // tributes: {type: 'number', default: 0}
    },
    init: function () {

        // fetch tributes from api
        const urlParams = new URLSearchParams(window.location.search);
        let startingXPos = -3;
        let endingXPos = 3;
        let xPosStep = 1;
        let startingZpos = -1;
        let endingZpos = 0;
        fetch(`https://staging.funeralinnovations.com/obituaries/getTributes?obit_id=${urlParams.get('obit_id')}&types=1,2,3,9&status=public,private&format=json&cors=1`)
            .then(response => response.json())
            .then(json => {

                // create elements based on json response
                json.tributes.forEach((trib, i) => {
                    let typeId = parseInt(trib.tribute.type_id);

                    // only care for comments, candles and photo tributes
                    if ([1, 2, 3, 9].includes(typeId)) {

                        // create our tribute
                        let model = document.createElement('a-entity');
                        let memoryAttributes = '';
                        let memoryType = typeId === 2 ? 'candle' : 'flower';

                        let position = {
                            x: (startingXPos + (i * xPosStep)),
                            y: 0,
                            z: UTILS.randomNumberFromInterval(startingZpos, endingZpos, true).toFixed(2)
                        };

                        // check x bounds
                        if (position.x > endingXPos) {
                            position.x = UTILS.randomNumberFromInterval(startingXPos, endingXPos, true).toFixed(2)
                        }

                        // check for tree memory
                        if (typeId === 9 && trib.tribute.data.meta.vr_tree_position) {
                            position = trib.tribute.data.meta.vr_tree_position;
                            model = document.createElement('a-obj-model');
                            model.setAttribute('src', '#tree-obj');
                            model.setAttribute('mtl', '#tree-mtl')
                        }

                        // set position
                        model.setAttribute('position', position);

                        // update flower type
                        if (parseInt(trib.tribute.type_id) === 3)
                            memoryAttributes += 'memory_type: photo';

                        // update memory attributes
                        model.setAttribute(memoryType, memoryAttributes);

                        model.setAttribute('static-body', 'shape: none');

                        this.el.appendChild(model)
                    }
                })
            })
    }
});
