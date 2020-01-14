AFRAME.registerComponent('tribute-garden', {
    init: function () {
        fetch('/fill/out/here')
        .then(response => response.json())
        .then(json => {
            // todo: what do do with data

            /** START EXAMPLE **/
            this.flowerGarden = document.createElement('a-entity')
            let flowerProps = [
                {
                    name: 'my-property',
                    value: json.tributes
                }
            ]
            this.flowerGarden = document.setAttribute('flower-garden', UTILS.formatProps(this.flowerProps))
            this.el.appendChild(flowerGarden)
            /** END EXAMPLE **/
        })
    }
})
