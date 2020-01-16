AFRAME.registerComponent('arborable', {
    schema: {
        scaleFrom: {type: 'vec3', default: {x: 0.02, y: 0.02, z: 0.02}},
        scaleTo: {type: 'vec3', default: {x: 0.1, y: 0.1, z: 0.1}},
        nTrees: {type: 'int', default: 1}
    },
    init: function () {
        let scene = this.el.sceneEl;
        let el = this.el;
        let minDistanceBetweeen = 2.5;
        // TODO: these should be loaded from the obituary - then make sure we're not placing where
        // other people have placed tributes before..
        this.positions = [];
        this.treePlanted = 0;

        el.addEventListener('click', (evt) => {
            let pos = evt.detail.intersection.point;
            // if y not on the ground plane
            if (+(pos.y.toFixed(2)) < -5.02 || +(pos.y.toFixed(2)) > -4.98) {
                return
            }

            // if too close to another tree or there has been another tree planted
            for (let p of this.positions) {
                if (UTILS.distance(pos.x, pos.z, p.x, p.z) < minDistanceBetweeen ||
                    this.treePlanted >= this.data.nTrees) {
                    return
                }
            }
            this.treePlanted += 1;

            // add tree tribute
            const urlParams = new URLSearchParams(window.location.search);
            const axios = require('axios');
            axios.get('https://staging.funeralinnovations.com/obituaries/addVRTribute?cors=1', {
                params: {
                    obit_id: urlParams.get('obit_id'),
                    name: 'John Doe',
                    data: '',
                    meta: {
                        vr_tree_position: pos
                    },
                    email: 'brandon@gmail.com'
                }
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                });

            // add tree to scene
            this.positions.push(evt.detail.intersection.point);
            let tree = document.createElement('a-obj-model');
            tree.setAttribute('scale', Object.values(this.data.scaleFrom).join(' '));
            tree.setAttribute('position', Object.values(evt.detail.intersection.point).join(' '));
            tree.setAttribute('rotation', '0 ' + Math.floor(Math.random() * 360) + ' 0');

            // todo: the src and mtl should be passed as a parameter in the schema
            tree.setAttribute('src', '#tree-obj');
            tree.setAttribute('mtl', '#tree-mtl');
            tree.setAttribute('animation', `property: scale; to: ${Object.values(this.data.scaleTo).join(' ')}; loop: false; dur: 3000`);
            scene.appendChild(tree)
        });
    }
});
