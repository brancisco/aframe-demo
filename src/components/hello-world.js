AFRAME.registerComponent('hello-world', {
    init: function () {
        console.log('Hello, World!')
        console.log(UTILS.formatProps([
            {
                name: 'my-prop-name',
                value: '4 3 2' 
            },
            {
                name: 'cool-prop',
                value: 'hello this is a prop' 
            }
        ]))
    }
})
