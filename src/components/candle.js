AFRAME.registerComponent('candle', {
    schema: {
        position: {type: 'string', default: ''},
        rotation: {type: 'string', default: ''},
    },
    init: function () {
        let dimensions = {
            width: 0.2,
            height: 0.5
        }

        let graphic = document.createElement('a-image')

        // set dimensions
        graphic.setAttribute('width', dimensions.width)
        graphic.setAttribute('height', dimensions.height)

        // set position
        if (this.data.position) {
            graphic.setAttribute('position', this.data.position)
        }

        // set rotation
        if (this.data.rotation) {
            graphic.setAttribute('rotation', this.data.rotation)
        }

        // set graphic image
        graphic.setAttribute('src', '/assets/img/candle.png')

        this.el.appendChild(graphic)
    }
})
