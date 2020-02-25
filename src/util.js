window.UTILS = {
    formatProps (props) {
        return props.map(prop => {
            return `${prop.name}: ${prop.value};`
        }).join(' ')
    },

    distance (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
    },

    randomNumberFromInterval(min, max, isFloat = false) {
        let randomNumber = Math.random() * (max - min + 1) + min
        return isFloat ? randomNumber : Math.floor(randomNumber)
    },

    randomSign () {
        if (Math.random() > 0.5) {
            return -1
        }
        return 1
    },

    getXYTributeCoordinates (
        shiftX=0,
        shiftY=0,
        total=300,
        meters=18,
        minRadius=6,
        closest=1,
        rng=Math.random,
        width=null,
        height=null,
        positionX,
        positionY
    ) {
        function level (n, meters, total, min) {
            return (meters - min) * ((n)/(total)) + min
        }

        function distance (x1, y1, x2, y2) {
            return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
        }

        // generate random x, y coordinates
        let rands = Array(total).fill(0).map(cur => rng()*100)
        // based on i (index) so that the points should start closer and expand out
        let x = Array(total).fill(0).map((cur, i) => Math.sin(rands[i])*level(i, meters, total, minRadius)).reverse()
        let y = Array(total).fill(0).map((cur, i) => Math.cos(rands[i])*level(i, meters, total, minRadius)).reverse()

        // conntainers for good positions and bad positions (too close to other points)
        let finalX = []
        let finalY = []

        let xr, xl, yf, yb
        if (width && height) {
            xr = width/2 + positionX
            xl = -width/2 + positionX
            yf = height/2 + positionY
            yb = -height/2 + positionY
        }
        
        // check distance from all points to all other points
        for (let i = 0; i < x.length; i ++) {
            let sX = x[i]+shiftX
            let sY = y[i]+shiftY

            if (width && (xr < sX || xl > sX)) {
                continue
            }
            if (height && (yf < sY || yb > sY)) {
                continue
            }
            let okay = true
            for (let j = i+1; j < x.length; j ++) {
                let dist = distance(x[i], y[i], x[j], y[j])
                if (dist < closest) {
                    okay = false
                    break
                }
            }
            // record good positions
            if (okay) {
                finalX.push(sX)
                finalY.push(sY)
            }
        }
        return {x: finalX.reverse(), y: finalY.reverse()}
    }
}