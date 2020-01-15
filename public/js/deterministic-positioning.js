// function to decide how far from the middle to place the coordinates
function level (n, meters, total) {
  return n*(meters)/total
}

// function to determin distance between two points
function distance (x1, y1, x2, y2) {
  let dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
  return dist
}

// seed random
Math.seedrandom('my random seed')

// parameters
let total = 500
let meters = 30
let closest = 1

// generate random x, y coordinates
let rands = Array(total).fill(0).map(cur => Math.random()*100)
// based on i (index) so that the points should start closer and expand out
let x = Array(total).fill(0).map((cur, i) => Math.sin(rands[i])*level(i, meters, total))
let y = Array(total).fill(0).map((cur, i) => Math.cos(rands[i])*level(i, meters, total))

// conntainers for good positions and bad positions (too close to other points)
let finalX = []
let finalY = []
let badX = []
let badY = []

// check distance from all points to all other points
for (let i = 0; i < x.length; i ++) {
  let okay = true
  for (let j = i+1; j < x.length; j ++) {
    let dist = distance(x[i], y[i], x[j], y[j])
    if (dist < closest) {
      okay = false
      break
    }
  }
  // record good positions
  if (okay) {
    finalX.push(x[i])
    finalY.push(y[i])
  }
  // record bad positions
  else {
    badX.push(x[i])
    badY.push(y[i])
  }
}

// graph below

var trace1 = {
  x: finalX,
  y: finalY,
  mode: 'markers',
  type: 'scatter'
};

var trace2 = {
  x: badX,
  y: badY,
  mode: 'markers',
  type: 'scatter'
};

Plotly.newPlot('myDiv', [trace2, trace1], {width: 700, height: 700});