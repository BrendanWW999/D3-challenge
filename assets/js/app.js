// @TODO: YOUR CODE HERE!

// Creating margins for the scatterplot
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight + 30);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(d3_data) {

// choosing poverty vs healthcare

  d3_data.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    });
          
  var xLinearScale = d3.scaleLinear().domain([d3.min(d3_data, d => d.poverty) * 0.8, d3.max(d3_data, d=> d.poverty) * 1.2]).range([0, width]);
  var yLinearScale = d3.scaleLinear().domain([d3.min(d3_data, d => d.healthcare) * 0.8, d3.max(d3_data, d=> d.healthcare) * 1.2]).range([height, 0]);
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append the x and y axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
  chartGroup.append("g")
    .call(leftAxis);

 // creating circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(d3_data)
    .enter()
    .append("g")
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 20)
    .classed("stateCircle", true);

  // adding state abbreviations in the circles
  chartGroup.append("g").selectAll("text")
    .data(d3_data)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("dx", d => xLinearScale(d.poverty))
    .attr("dy", d => yLinearScale(d.healthcare))
    .classed("stateText", true);

// Positioning and Labels for Scatterplot
  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .text("Percentage of People in Poverty");

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - ((margin.left/2)+2))
    .attr("x", 0 - (height / 2))
    .attr("value", "Healthcare")
    .classed("axis-text", true)
    .text("Percentage Healthcare");
});