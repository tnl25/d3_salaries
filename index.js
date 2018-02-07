d3.csv("salaries.csv", function(data) {
  var margin = { top: 50, right: 50, left: 50, bottom: 50 };
  var h = 700 - margin.top - margin.bottom;
  var w = 700 - margin.left - margin.right;
  var body = d3.select("body")
  var svg = body.append("svg")
    .attr("height", h + margin.top + margin.bottom)
    .attr("width", w + margin.left + margin.right)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  var nested_data = d3.nest()
    .key(function(d){
      return (d.Year = 2014, d.JobTitle);
    })
    .rollup(function(v){
        // console.log(v)
        console.log(v[0]['BasePay'])
        return {
          BasePay: d3.mean(v, function(d) {return d.BasePay}),
          TotalPay: d3.mean(v, function(d){return d.TotalPay}),
      }
    })
    .entries(data);
    // console.log(nested_data)
    // console.log(nested_data[0])
    // console.log(nested_data[0]['key'])
    // console.log(nested_data[0]['value']['BasePay'])
    // console.log(nested_data[0]['value']['TotalPay'])

  // scales
  var colorScale = d3.scaleOrdinal(d3.schemeCategory20)
  // var colorScale = d3.scaleSequential(d3.interpolateRainbow);
  var xScale = d3.scaleLinear()
    // set domain to a specific number because the BasePay field has string values
    .domain([50000, 350000])
    .rangeRound([0, w]);
  var yScale = d3.scaleLinear()
    // set domain to a specific number because the number exists outside of scale
    .domain([50000, 480000])
    .rangeRound([h, 0]);
  // X-axis
  var xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(5);
  // Y-axis
  var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(5);

  // nest the data to key-value pair because of duplicate job title
  var circles = svg.selectAll("circle")
    .data(nested_data).enter()
    .append("circle")
//     .attr("cx", function(d) {
//       // v = xScale(data(i));
//       // console.log(d.value[0])
//       // console.log("Total Pay is "+ v + " and " + d3.values(nested_data)[0]);
//       // console.log("The job is "+ v + " and " + d3.keys(data[i]));
//       return d.key;
//     })
//     .attr("cy", function(d) {
//       // v = yScale(d.TotalPay);
//       // console.log("Total Pay is "+ v + " and " + d.TotalPay);
//       return yScale(d.TotalPay);
//     })
//     .attr("r", "5")
//     .attr("stroke", "black")
//     .attr("stroke-width", 1)
//     .attr("fill", function(d, i) {
//       return colorScale(i);
//     })
//     .attr("class", "circle")
//     .on("click", function() {
//       d3.select(this)
//         .transition()
//         .duration(500)
//         .attr("r", 10)
//         .attr("stroke-width", 2);
//     })
//     .on("mouseout", function() {
//       d3.select(this)
//         .transition()
//         .duration(500)
//         .attr("r", 5)
//         .attr("stroke-width", 1);
//     });

//   // X-axis
//   svg.append("g")
//     .attr("class", "axis")
//     .attr("transform", "translate(0," + h + ")")
//     .call(xAxis)
//     .append("text") 
//     .attr("class", "label")
//     .text("Base Pay")
//     .attr("y", -50)
//     .attr("x", w)
//     .attr("dy", ".71em")
//     .style("text-anchor", "end");

//   // Y-axis
//   svg.append("g")
//     .attr("class", "axis")
//     .call(yAxis)
//     .append("text") 
//     .attr("class", "label")
//     .attr("transform", "rotate(-90)")
//     .attr("x", 0)
//     .attr("y", 5)
//     .attr("dy", ".71em")
//     .style("text-anchor", "end")
//     .text("Total Pay");
})
