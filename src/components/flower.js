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
        };

        let model = document.createElement('a-image');

        model.setAttribute('width', 0.5);

        // set position
        if (this.data.position) {
            model.setAttribute('position', this.data.position)
        }

        // set graphic image
        model.setAttribute('src', imageSources[this.data.memory_type.toUpperCase()]);

        this.el.appendChild(model)
    }
});
