AFRAME.registerComponent('headstone-name', {
    schema: {
        tributes: { type: 'number', default: 0 }
    },
    init: function () {
        // api
        fetch('https://staging.funeralinnovations.com/obituaries/getObituary?obit_id=344935&format=json&cors=1')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            // create element based on json response
            let nametext = document.createElement('a-entity')
            nametext.setAttribute('text', "font: aileronsemibold; value: " + json.obituary.name.full + "; color: #000; align: center; wrapCount: 14; baseline: top")
            this.el.appendChild(nametext)
        })
    }
})