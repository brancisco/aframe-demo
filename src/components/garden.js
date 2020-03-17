let seedrandom = require('seedrandom')

AFRAME.registerComponent('garden', {
    schema: {
        resources: { type: 'array', default: '' },
        count: { type: 'int', default: 10 },
        position: { type: 'vec2', default: {x: 0, y: 0} },
        innerRadius: { type: 'number', default: 4 },
        outerRadius: { type: 'number', default: 20 },
        minObjDist: { type: 'number', default: 1 }
    },
    init: function () {
        this.position = this.el.getAttribute('position')
        this.width = 16 //this.el.getAttribute('width')
        this.height = 16 //this.el.getAttribute('height')
        this.time = 0
        this.boxCount = 0
        this.posMap = UTILS.getXYTributeCoordinates(
            this.data.position.x,
            this.data.position.y,
            500,
            this.data.outerRadius,
            this.data.innerRadius,
            this.data.minObjDist,
            Math.random,
            this.width,
            this.height,
            this.position.x,
            this.position.z
        )
        this.maxCount = this.data.count >= this.posMap.x.length ? this.posMap.x.length : this.data.count;
        this.boxHeight = -0.1
        this.boxY = this.position.y + (this.boxHeight/2)

        // let box = document.createElement('a-box')
        // box.setAttribute('width', 0.1)
        // box.setAttribute('depth', 0.1)
        // box.setAttribute('height', 6)
        // box.setAttribute('position', [this.data.position.x, this.position.y+3, this.data.position.y].join(' '))
        // this.el.sceneEl.appendChild(box)
    },
    tick (time, timeDelta) {
        if (this.boxCount < this.maxCount)
        this.time += timeDelta
        if (this.time > 100) {
            this.time = 0
            let [x, z] = [this.posMap.x[this.boxCount], this.posMap.y[this.boxCount]]
            let container = document.createElement('a-entity')
            let box = document.createElement('a-obj-model')
            box.setAttribute('src', '#small-flower-obj')
            box.setAttribute('mtl', '#small-flower-mtl')
            box.setAttribute('scale', '0.08 0.08 0.08')
            box.setAttribute('rotation', [Math.random()*5*UTILS.randomSign(), Math.random()*360, Math.random()*5*UTILS.randomSign()].join(' '))
            // box.setAttribute('width', 0.2)
            // box.setAttribute('depth', 0.2)
            // box.setAttribute('height', this.boxHeight)
            
            // box.setAttribute('opacity', 0)
            container.setAttribute('animation', 'property: opacity; to: 1; loop: false; dur: 500;')
            container.setAttribute('animation__2', `property: position; from: ${[x, this.boxY+0.5, z].join(' ')}; to: ${[x, this.boxY, z].join(' ')}; loop: false; dur: 500;`)
            
            container.appendChild(box)
            /** start temp logic to show different messages **/
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }
            let messages = [
                "I'll never forget the times we spent together.",
                "You allways had a smile on your face! Miss you!",
                "I could always count on you to give me advice on the outdoors. Thank you. RIP.",
                "I always knew we would be best friends from the moment we met. Gonna miss you bud."
            ];
            let index = getRandomInt(messages.length)
            /** end temp logic to show different messages **/
            container.setAttribute('text-on-hover', `text:${messages[index]};`)
            // box.setAttribute('position', '0 0 0')
            container.setAttribute('position', [x, this.boxY, z].join(' '))

            this.el.sceneEl.appendChild(container)
            this.boxCount ++
        }
    }

})
