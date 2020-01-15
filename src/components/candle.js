AFRAME.registerComponent('candle', {
    schema: {
        position: {type: 'string', default: ''},
        rotation: {type: 'string', default: ''},
    },
    init: function () {
        let model = document.createElement('a-image');

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

        model.setAttribute('width', 0.3);

        // set graphic image
        model.setAttribute('src', '/assets/img/candle.png');

        this.el.appendChild(model)
    }
});
