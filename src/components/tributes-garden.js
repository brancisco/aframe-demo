let seedrandom = require('seedrandom')

AFRAME.registerComponent('tributes-garden', {
    schema: {
        // tributes: {type: 'number', default: 0}
    },
    init: function () {
        const scene = this.el.sceneEl;

        // fetch tributes from api
        const urlParams = new URLSearchParams(window.location.search);

        let startingXPos = -27;
        let endingXPos = 18;
        let startingZpos = -80;
        let endingZpos = 0;

        let positions = UTILS.getXYTributeCoordinates(4, -17, 400, 35, 7, 1.75, seedrandom(urlParams.get('obit_id')))

        fetch(`https://staging.funeralinnovations.com/obituaries/getTributes?obit_id=${urlParams.get('obit_id')}&types=1,2,3,9&limit=50&status=public,private&format=json&cors=1`)
            .then(response => response.json())
            .then(json => {

                // create elements based on json response
                let i = 0
                for (let trib of json.tributes) {
                    // if there are more tributes than there are positions just break
                    if (i > json.tributes.length) {
                        break
                    }
                    let typeId = parseInt(trib.tribute.type_id);

                    // only care for comments, candles and photo tributes
                    if ([1, 2, 3, 9].includes(typeId)) {

                        // create our tribute
                        let model = document.createElement('a-entity');
                        let memoryAttributes = '';
                        let memoryType = typeId === 2 ? 'candle' : 'flower';

                        // check x bounds
                        while (positions.x[i] > endingXPos || positions.x[i] < startingXPos ||
                               positions.y[i] > endingZpos || positions.y[i] < startingZpos) {
                            i ++
                            if (i >= json.tributes.length) {
                                break
                            }
                        }

                        let position = {
                            x: positions.x[i],
                            y: -3.52,
                            z: positions.y[i]
                        };

                        // check for tree memory
                        if (typeId === 9 && trib.tribute.data.meta.vr_tree_position) {
                            position = trib.tribute.data.meta.vr_tree_position;
                            model = document.createElement('a-obj-model');
                            model.setAttribute('src', '#tree-obj');
                            model.setAttribute('mtl', '#tree-mtl');

                            // scale tree based on its age
                            let scale = {x: 0.1, y: 0.1, z: 0.1};

                            // Tree growth simulation. We're using a 10 hr window for quick progression of growth
                            // given server and client timezone are different counting in hours might be a bit off
                            let maturityTime = 10; // in hrs
                            let birthDate = new Date(trib.tribute.datetime);
                            let today = new Date();
                            let elapsedTime = today - birthDate;
                            let elapsedHours = Math.floor(elapsedTime / 1000 / 60 / 60);

                            // scale up each hour
                            if (elapsedHours >= 0 && elapsedHours < maturityTime) {
                                scale.x += elapsedHours * 0.1;
                                scale.y += elapsedHours * 0.1;
                                scale.z += elapsedHours * 0.1
                            } else if (elapsedHours > maturityTime) {
                                scale.x = 1;
                                scale.y = 1;
                                scale.z = 1
                            }

                            model.setAttribute('scale', scale)
                        }

                        // place candle on the floor
                        if (typeId === 2) {
                            position.y = -2.09
                        }

                        // set position
                        model.setAttribute('position', position);

                        // update flower type
                        if (parseInt(trib.tribute.type_id) === 3)
                            memoryAttributes += 'memory_type: photo';

                        // update memory attributes
                        model.setAttribute(memoryType, memoryAttributes);

                        model.setAttribute('static-body', 'shape: none');

                        scene.appendChild(model)
                        i ++
                    }
                }
            })
    }
});
