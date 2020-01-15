AFRAME.registerComponent('candle', {
    schema: {
        position: {type: 'string', default: ''},
        rotation: {type: 'string', default: ''},
    },
    init: function () {
        let model = document.createElement('a-obj-model');

        // set position
        if (this.data.position) {
            model.setAttribute('position', this.data.position)
        }

        // set rotation
        if (this.data.rotation) {
            model.setAttribute('rotation', this.data.rotation)
        }

        // scale down our candle
        model.setAttribute('scale', '3 3 3');

        // set model sources
        model.setAttribute('src', '#lantern-obj');
        model.setAttribute('mtl', '#lantern-mtl');

        this.el.appendChild(model)
    }
});
