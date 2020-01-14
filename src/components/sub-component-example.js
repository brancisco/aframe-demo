AFRAME.registerComponent('sub-component-example', {
    schema: {
        url: { type: 'asset' },
        position: { type: 'vec3' },
        rotation: { type: 'vec3' }
    },
    init: function () {
        console.log({data: this.data})
        this.image = document.createElement('a-image')
        this.image.setAttribute('src', `url(${this.data.url})`)
        console.log({
            innerpos: Object.values(this.data.position).join(' '),
            innerrot: Object.values(this.data.rotation).join(' ')
        })
        this.image.setAttribute('position', Object.values(this.data.position).join(' '))
        this.image.setAttribute('rotation', Object.values(this.data.rotation).join(' '))
        this.el.appendChild(this.image)
    }
})