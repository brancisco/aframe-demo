AFRAME.registerComponent('headstone-obit', {
    schema: {
        tributes: { type: 'number', default: 0 }
    },
    init: function () {
        // api
        const urlParams = new URLSearchParams(window.location.search)
        fetch('https://staging.funeralinnovations.com/obituaries/getObituary?obit_id=' + urlParams.get('obit_id') + '&format=json&cors=1')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            // create element based on json response
            let obittext = document.createElement('a-entity')
            obittext.setAttribute('text', "font: aileronsemibold; value: " + json.obituary.about.substring(0, 100) + "...; color: #000; align: center; wrapCount: 18; baseline: top")
            this.el.appendChild(obittext)
        })
    }
})