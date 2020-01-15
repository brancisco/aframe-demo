AFRAME.registerComponent('change-color-on-hover', {
    schema: {
        color: {default: 'red'}
    },

    init: function () {
        var scene = this.el.sceneEl
        var data = this.data;
        var el = this.el;
        var defaultColor = el.getAttribute('material').color;

        el.addEventListener('mouseenter', function () {
            el.setAttribute('color', data.color);
        });

        el.addEventListener('mouseleave', function () {
            el.setAttribute('color', defaultColor);
        });

        el.addEventListener('click', function (evt) {
            console.log(evt)
            console.log(evt.detail.intersection.point);
            el.setAttribute('color', 'blue')
            let newBox = document.createElement('a-box')
            newBox.setAttribute('width', '0.3')
            newBox.setAttribute('height', '0.3')
            newBox.setAttribute('position', Object.values(evt.detail.intersection.point).join(' '))

            scene.appendChild(newBox)
        });
    }
});