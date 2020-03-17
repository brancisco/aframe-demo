AFRAME.registerComponent('text-on-hover', {
    schema: {
        text: { type: 'string', default: '' },
        paddingX: { type: 'number', default: 0.5 },
        paddingZ: { type: 'number', default: 0.5 },
        bgColor: { type: 'string', default: '#000000' },
        textColor: { type: 'string', default: '#ffffff' },
        opacity: { type: 'number', default: 0.3 },
        minDist: { type: 'number', default: 0 },
        cameraId: { type: 'string', default: 'cameraRig'}

    },

    init: function () {
        const data = this.data
        const el = this.el

        this.text = null
        this.closeButton = null
        this.minDist = 3

        this.time = 0
        this.camera = document.getElementById('cameraRig')
        // register the world position of the current element
        this.worldPos = new THREE.Vector3();
        this.worldPos.setFromMatrixPosition(el.object3D.matrixWorld);
        // register the world position of the camera
        this.cameraWorldPos = new THREE.Vector3();
        this.cameraWorldPos.setFromMatrixPosition(this.camera.object3D.matrixWorld);
        this.open = false 

        data.text = data.text

        this.updateWorldPositions = () => {
            this.worldPos = new THREE.Vector3();
            this.worldPos.setFromMatrixPosition(this.el.object3D.matrixWorld);
            // register the world position of the camera
            this.cameraWorldPos = new THREE.Vector3();
            this.cameraWorldPos.setFromMatrixPosition(this.camera.object3D.matrixWorld);
        }

        this.calculateTheta = (c_x, c_z, el_x, el_z) => {
            let xDist = c_x - el_x
            let yDist = c_z - el_z
            let theta = 0

            if (xDist > 0 && yDist > 0) {
                theta = Math.abs(Math.atan(xDist/yDist))
            } else if (xDist > 0 && yDist < 0) {
                theta = Math.abs(Math.atan(yDist/xDist)) + Math.PI/2
            } else if (xDist < 0 && yDist < 0) {
                theta = Math.abs(Math.atan(xDist/yDist)) + Math.PI
            } else {
                theta = Math.abs(Math.atan(yDist/xDist)) + Math.PI*3/2
            }

            return theta
        }

        this.calculateNewXY = (theta, distance) => {
            let [x, y] = [0, 0]
            if (theta < Math.PI/2) {
                x = Math.sin(theta)
                y = Math.cos(theta)
            } else if (theta < Math.PI) {
                let thetap = theta - Math.PI/2
                x = Math.cos(thetap)
                y = -Math.sin(thetap)
            } else if (theta < Math.PI*3/2) {
                let thetap = theta - Math.PI
                x = -Math.sin(thetap)
                y = -Math.cos(thetap)
            } else {
                let thetap = theta - Math.PI*3/2
                x = -Math.cos(thetap)
                y = Math.sin(thetap)
            }
            return [x, y].map(cur => cur*distance)
        }

        this.calculateDistance  = () => {
            return UTILS.distance(
                this.cameraWorldPos.x,
                this.cameraWorldPos.z,
                this.worldPos.x,
                this.worldPos.z
            )
        }

        const closeText = () => {
            if (this.open === false) {
                return
            }
            this.open = false
            this.closed = true
            
            this.closeButton.parentNode.removeChild(this.closeButton)
            this.text.parentNode.removeChild(this.text)            
        }

        const openText = () => {
            this.updateWorldPositions()
            if (this.open === true || this.closed === true) {
                return
            }
            this.open = true

            let theta = this.calculateTheta(
                this.cameraWorldPos.x, this.cameraWorldPos.z,
                this.worldPos.x, this.worldPos.z
            )
            let distance = this.calculateDistance()
            distance -= this.minDist
            
            let [x, z] = this.calculateNewXY(theta, distance)

            this.text = document.createElement('a-text')
            this.text.setAttribute('value', data.text)
            this.text.setAttribute('geometry', 'primitive:plane;width:auto;height:auto;')
            this.text.setAttribute('material', "shader: flat; color: black;opacity:0.3;")
            this.text.setAttribute('position', `${x} 1.3 ${z}`)
            this.text.setAttribute('align', 'center')
            // text.setAttribute('wrapCount', '10')
            this.text.setAttribute('rotation', '0 ' + theta*180/Math.PI + ' 0')
            this.text.setAttribute('animation', 'property: opacity; to: 1; loop: false; dur: 500;')
            this.text.setAttribute('animation__2', `
                property: position;
                from: ${[x, 0, z].join(' ')};
                to: ${[x, '1.3', z].join(' ')};
                loop: false;
                dur: 700;
                easing: easeInQuad;`
            )
            
            this.closeButton = document.createElement('a-plane')
            this.closeButton.setAttribute('material', 'src: #close-button')
            this.closeButton.setAttribute('transparent', 'true')
            this.closeButton.setAttribute('width', '0.3')
            this.closeButton.setAttribute('height', '0.3')
            this.closeButton.setAttribute('position', `${x} 1.9 ${z}`)
            this.closeButton.setAttribute('animation', 'property: opacity; to: 1; loop: false; dur: 500;')
            this.closeButton.setAttribute('animation__2', `property: position; from: ${[x, 0, z].join(' ')}; to: ${[x, '1.9', z].join(' ')}; loop: false; dur: 700;`)
            this.closeButton.setAttribute('rotation', '0 ' + theta*180/Math.PI + ' 0')
            this.closeButton.addEventListener('click', closeText)

            el.appendChild(this.text)
            el.appendChild(this.closeButton)

        }

        el.addEventListener('click', openText);
    },

    tick (time, timeDelta) {
        if (this.closed === true) {
            this.time += timeDelta
            if (this.time > 10) {
                this.closed = false
                this.time = 0
            }
        }
        else if (this.open) {
            this.time += timeDelta
            if (this.time > 50) {
                this.time = 0
                this.updateWorldPositions()
                let theta = this.calculateTheta(
                    this.cameraWorldPos.x, this.cameraWorldPos.z,
                    this.worldPos.x, this.worldPos.z
                )
                let distance = this.calculateDistance()
                distance -= this.minDist

                let [x, z] = this.calculateNewXY(theta, distance)

                this.text.setAttribute('position', `${x} 1.3 ${z}`)
                this.text.setAttribute('rotation', '0 ' + theta*180/Math.PI + ' 0')
                this.closeButton.setAttribute('position', `${x} 1.9 ${z}`)
                this.closeButton.setAttribute('rotation', '0 ' + theta*180/Math.PI + ' 0')
            }
        }
    }
});