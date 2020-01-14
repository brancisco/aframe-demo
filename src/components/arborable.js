import axios from 'axios'

AFRAME.registerComponent('arborable', {
    schema: {

    },
    init: function () {
        let scene = this.el.sceneEl
        let el = this.el
        let defaults = {
            scale: '0.02 0.02 0.02'
        }
        this.positions = []

        el.addEventListener('click', (evt) => {
            let pos = evt.detail.intersection.point
            console.log(pos)
            for (p of this.positions) {
                console.log(UTILS.distance(pos.x, pos.z, p.x, p.z))
                if (UTILS.distance(pos.x, pos.z, p.x, p.z) < 2.5) {
                    return
                }
            }

            // add tree tribute
            // axios({
            //     method: 'post',
            //     url: 'https://staging.funeralinnovations.com/obituaries/addTribute&cors=1',
            //     data: {
            //         obit_id: -1,
            //         name: 'John Doe',
            //         data: '',
            //         meta: {
            //             vr_tree_position: pos
            //         },
            //         type_id: 9
            //     }
            // })
            // .then(response => {
            //     console.log(response)
            // })

            // add tree to scene
            this.positions.push(evt.detail.intersection.point)
            let tree = document.createElement('a-obj-model')
            tree.setAttribute('scale', defaults.scale)
            tree.setAttribute('position', Object.values(evt.detail.intersection.point).join(' '))
            tree.setAttribute('src', '#tree-obj')
            tree.setAttribute('mtl', '#tree-mtl')
            tree.setAttribute('animation', "property: scale; to: 0.1 0.1 0.1; loop: false; dur: 3000")
            scene.appendChild(tree)
        });
    }
})
