AFRAME.registerComponent('headstone-obit', {
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
            let obittext = document.createElement('a-entity')
            obittext.setAttribute('text', "font: kelsonsans; value: " + json.obituary.about.substring(0, 100) + "...; color: #000; align: center; wrapCount: 18; baseline: top")
            this.el.appendChild(obittext)
        })
    }
})