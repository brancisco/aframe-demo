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

    getXYTributeCoordinates (shiftX=0, shiftY=0, total=300, meters=18, minRadius=6, closest=1) {
        function level (n, meters, total, min) {
            return (meters - min) * ((n)/(total)) + min
        }

        function distance (x1, y1, x2, y2) {
            return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
        }

        // generate random x, y coordinates
        let rands = Array(total).fill(0).map(cur => Math.random()*100)
        // based on i (index) so that the points should start closer and expand out
        let x = Array(total).fill(0).map((cur, i) => Math.sin(rands[i])*level(i, meters, total, minRadius)).reverse()
        let y = Array(total).fill(0).map((cur, i) => Math.cos(rands[i])*level(i, meters, total, minRadius)).reverse()

        // conntainers for good positions and bad positions (too close to other points)
        let finalX = []
        let finalY = []

        // check distance from all points to all other points
        for (let i = 0; i < x.length; i ++) {
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
                finalX.push(x[i]+shiftX)
                finalY.push(y[i]+shiftY)
            }
        }
        return {x: finalX.reverse(), y: finalY.reverse()}
    }
}