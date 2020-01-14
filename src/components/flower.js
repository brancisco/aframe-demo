AFRAME.registerComponent('flower', {
    schema: {
        position: {type: 'string', default: ''},
        rotation: {type: 'string', default: ''},
        memory_type: {type: 'string', default: 'comment'},
    },
    init: function () {

        // our assets
        const imageSources = {
            COMMENT: '/assets/img/red_rose.png',
            PHOTO: '/assets/img/yellow_rose.png'
        }

        let dimensions = {
            width: 0.2,
            height: 0.5
        }

        let flowerGraphic = document.createElement('a-image')

        // set dimensions
        flowerGraphic.setAttribute('width', dimensions.width)
        flowerGraphic.setAttribute('height', dimensions.height)

        // set position
        if (this.data.position) {
            flowerGraphic.setAttribute('position', this.data.position)
        }

        // set rotation
        if (this.data.rotation) {
            flowerGraphic.setAttribute('rotation', this.data.rotation)
        }

        // set graphic image
        flowerGraphic.setAttribute('src', imageSources[this.data.memory_type.toUpperCase()])

        this.el.appendChild(flowerGraphic)
    }
})
