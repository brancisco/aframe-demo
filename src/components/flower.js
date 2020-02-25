AFRAME.registerComponent('flower', {
    schema: {
        position: {type: 'string', default: ''},
        rotation: {type: 'string', default: ''},
        height: {type: 'int', default: '1'},
        memory_type: {type: 'string', default: 'COMMENT'},
    },
    init: function () {

        // our assets
        const imageSources = {
            PHOTO: {
                src: '#small-flower-obj',
                mtl: '#small-flower-mtl'
            },
            COMMENT: {
                src: '#large-flower-obj',
                mtl: '#large-flower-mtl'
            }
        };

        let model = document.createElement('a-obj-model')

        model.setAttribute('height', this.data.height)
        model.setAttribute('scale', '0.2 0.2 0.2');

        // set position
        if (this.data.position) {
            model.setAttribute('position', this.data.position)
        }

        // set graphic image
        model.setAttribute('src', imageSources[this.data.memory_type.toUpperCase()].src)
        model.setAttribute('mtl', imageSources[this.data.memory_type.toUpperCase()].mtl)
        model.setAttribute('opacity', 0)
        model.setAttribute('animation', 'property: opacity; to: 1; loop: false; dur: 500;')

        this.el.appendChild(model)
    }
});
