window.UTILS = {
    formatProps(props) {
        return props.map(prop => {
            return `${prop.name}: ${prop.value};`
        }).join(' ')
    },

    randomNumberFromInterval(min, max, isFloat = false) {
        let randomNumber = Math.random() * (max - min + 1) + min
        return isFloat ? randomNumber : Math.floor(randomNumber)
    }
}