AFRAME.registerComponent('headstone-photo', {
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
            let photo = document.createElement('a-plane')
            photo.setAttribute('src', json.obituary.pic)
            this.el.appendChild(photo)
        })
    }
})