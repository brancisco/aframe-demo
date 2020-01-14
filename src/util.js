window.UTILS = {
    formatProps (props) {
        return props.map(prop => {
            return `${prop.name}: ${prop.value};`
        }).join(' ')
    }
}