AFRAME.registerComponent('headstone-dates', {
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
            let birth_date = json.obituary.birth_date.substring(5,7) + "-" + json.obituary.birth_date.substring(8,10) + "-" + json.obituary.birth_date.substring(0,4);
            let deceased_date = json.obituary.deceased_date.substring(5,7) + "-" + json.obituary.deceased_date.substring(8,10) + "-" + json.obituary.deceased_date.substring(0,4);
            // create element based on json response
            let datetext = document.createElement('a-entity')
            datetext.setAttribute('text', "font: aileronsemibold; value: " + birth_date + " - " + deceased_date + "; color: #000; align: center; wrapCount: 9; baseline: top; lineHeight: 25")
            this.el.appendChild(datetext)
        })
    }
})