AFRAME.registerComponent('sub-component-example', {
    schema: {
        url: { type: 'asset' },
        position: { type: 'vec3' },
        rotation: { type: 'vec3' }
    },
    init: function () {
        this.image = document.createElement('a-box')
        this.image.setAttribute('src', `url(${this.data.url})`)
        this.image.setAttribute('position', Object.values(this.data.position).join(' '))
        this.image.setAttribute('rotation', Object.values(this.data.rotation).join(' '))
        this.image.setAttribute('change-color-on-hover', '')
        this.el.appendChild(this.image)
    }
})