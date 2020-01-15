AFRAME.registerComponent('flower', {
    schema: {
        position: {type: 'string', default: ''},
        rotation: {type: 'string', default: ''},
        memory_type: {type: 'string', default: 'comment'},
    },
    init: function () {

        // our assets
        const imageSources = {
            COMMENT: '#red-rose',
            PHOTO: '#yellow-rose'
        };

        let model = document.createElement('a-image');

        model.setAttribute('width', 0.5);
        model.setAttribute('scale', '3 3 3');

        // set position
        if (this.data.position) {
            model.setAttribute('position', this.data.position)
        }

        // set graphic image
        model.setAttribute('src', imageSources[this.data.memory_type.toUpperCase()]);

        this.el.appendChild(model)
    }
});
