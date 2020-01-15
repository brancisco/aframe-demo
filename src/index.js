/* AFRAME LIBRARY SHOULD BE THE FIRST THING IMPORTED */
require('aframe')

/* REQUIRE ANY node_module LEVEL COMPONENTS HERE */
// require('example-component')
require('aframe-extras')
require('axios')

/* LIBS */
require('./util')

/* REQUIRE LOCAL COMPONENTS HERE */
require('./components/hello-world')
require('./components/multi-photo-example')
require('./components/headstone-name')
require('./components/headstone-dates')
require('./components/headstone-obit')
require('./components/headstone-photo')
require('./components/tribute-garden')
require('aframe-particle-system-component');
