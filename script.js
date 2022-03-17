let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"

let baseTemp
let values = []

let xScale
let yScale

let width = 1200
let height = 600
let padding = 60

let canvas = d3.select('#canvas')
               .attr('width', width)
               .attr('height', height)

let generateScales = () => {

  xScale = d3.scaleLinear()
             .range([padding, width - padding])

  yScale = d3.scaleLinear()
             .range([padding, height - padding])

}

let drawCells = () => {

  canvas.selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('class', 'cell')
        .attr('fill', (item) => {
          variance = item['variance']
          if(variance <= -1) {
            return 'SteelBlue'
          } else if (variance <= 0) {
            return 'LightSteelBlue'
          } else if (variance <= 1) {
            return 'Orange'
          } else {
            return 'Crimson'
          }
        })
        .attr('data-year', (item) => {
          return item['year']
        })
        .attr('data-month', (item) => {
          return item['month'] - 1
        })
        .attr('data-temp', (item) => {
          return baseTemp + item['variance']
        })
           
}

let drawAxes = () => {
  let xAxis = d3.axisBottom(xScale)
  let yAxis = d3.axisLeft(yScale)

  canvas.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', `translate(0, ${height - padding})`)

  canvas.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', `translate(${padding}, 0)`)

}

fetch(url)
  .then(response => response.json())
  .then(dataset => {
    values = dataset['monthlyVariance']
    baseTemp = dataset['baseTemperature']
    console.log(values)
    generateScales()
    drawCells()
    drawAxes()
  })