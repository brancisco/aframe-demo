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
    }
}