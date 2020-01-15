AFRAME.registerComponent('candle', {
    schema: {
        position: {type: 'string', default: ''},
        rotation: {type: 'string', default: ''},
    },
    init: function () {
        let model = document.createElement('a-gltf-model');

        // set position
        if (this.data.position) {
            model.setAttribute('position', this.data.position)
        }

        // set rotation
        if (this.data.rotation) {
            model.setAttribute('rotation', this.data.rotation)
        }

        // scale down our candle
        model.setAttribute('scale', '0.1 0.1 0.1');

        // set graphic image
        model.setAttribute('src', '/models/memory-garden/candle.glb');

        this.el.appendChild(model)
    }
});
