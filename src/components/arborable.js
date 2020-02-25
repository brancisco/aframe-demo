AFRAME.registerComponent('arborable', {
    schema: {
        scaleFrom: {type: 'vec3', default: {x: 0.02, y: 0.02, z: 0.02}},
        scaleTo: {type: 'vec3', default: {x: 0.1, y: 0.1, z: 0.1}},
        nTrees: {type: 'int', default: 1},
        groundPlane: {}
    },
    init: function () {
        let scene = this.el.sceneEl;
        let el = this.el;
        let minDistanceBetweeen = 2.5;
        // TODO: these should be loaded from the obituary - then make sure we're not placing where
        // other people have placed tributes before..
        this.positions = [];
        this.treePlanted = 0;
        var self = this
        this.clickHandler = function (evt) {
            let pos = evt.detail.intersection.point;
            let elPos = el.getAttribute('position')
            // if y not on the ground plane
            if (Math.abs(pos.y) - Math.abs(elPos.y) > 0.05) {
                return
            }

            // if too close to another tree or there has been another tree planted
            for (let p of self.positions) {
                if (UTILS.distance(pos.x, pos.z, p.x, p.z) < minDistanceBetweeen ||
                    self.treePlanted >= self.data.nTrees) {
                    return
                }
            }
            self.treePlanted += 1;

            // add tree tribute
            // const urlParams = new URLSearchParams(window.location.search);
            // const axios = require('axios');
            // axios.get('https://staging.funeralinnovations.com/obituaries/addVRTribute?cors=1', {
            //     params: {
            //         obit_id: urlParams.get('obit_id'),
            //         name: 'John Doe',
            //         data: '',
            //         meta: {
            //             vr_tree_position: pos
            //         },
            //         email: 'brandon@gmail.com'
            //     }
            // })
            //     .then(response => {
            //         console.log(response)
            //     })
            //     .catch(error => {
            //         console.log(error)
            //     });

            // add tree to scene
            self.positions.push(evt.detail.intersection.point);
            let tree = document.createElement('a-obj-model');
            let position = Object.values(evt.detail.intersection.point)
            tree.setAttribute('scale', Object.values(self.data.scaleFrom).join(' '));
            tree.setAttribute('position', Object.values(evt.detail.intersection.point).join(' '));
            tree.setAttribute('rotation', '0 ' + Math.floor(Math.random() * 360) + ' 0');

            // todo: the src and mtl should be passed as a parameter in the schema
            tree.setAttribute('src', '#tree-obj');
            tree.setAttribute('mtl', '#tree-mtl');
            tree.setAttribute('animation', `property: scale; to: ${Object.values(self.data.scaleTo).join(' ')}; loop: false; dur: 3200`);
            tree.setAttribute('animation__2', `property: position; from: ${[position[0], position[1] - 1, position[2]].join(' ')}; to: ${position.join(' ')}; loop: false; dur: 600;`)

            scene.appendChild(tree)
        }
        el.addEventListener('click', this.clickHandler)
    },
    remove () {
        if (this.clickHandler) {
            this.el.removeEventListner('click', this.clickHandler)
        }
    }
});
