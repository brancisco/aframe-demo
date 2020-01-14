AFRAME.registerComponent('flower', {
    schema: {
        position: {type: 'string', default: ''},
        rotation: {type: 'string', default: ''},
        memory_type: {type: 'string', default: 'comment'},
    },
    init: function () {

        // our assets
        const imageSources = {
            COMMENT: '/assets/memory-garden/rose.glb',
            PHOTO: '/assets/memory-garden/lotus.obj'
        }

        let model = document.createElement('a-gltf-model')

        if(this.data.memory_type === 'photo'){
            model = document.createElement('a-obj-model')
            model.setAttribute('scale', '0.1 0.1 0.1')
            model.setAttribute('material', 'color: salmon')

            //  <a-entity obj-model="obj: #lotus-obj;" material="color: pink; wave-height: 10" scale="0.1 0.1 0.1" position="0 0 -2" rotate="1 0 -1">
        }

        // set position
        if (this.data.position) {
            model.setAttribute('position', this.data.position)
        }

        // set rotation
        if (this.data.rotation) {
            model.setAttribute('rotation', this.data.rotation)
        }

        // set graphic image
        model.setAttribute('src', imageSources[this.data.memory_type.toUpperCase()])

        this.el.appendChild(model)
    }
})
