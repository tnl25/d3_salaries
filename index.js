d3.csv("salaries.csv", function(data) {
  var margin = { top: 50, right: 50, left: 50, bottom: 50 };
  var h = 700 - margin.top - margin.bottom;
  var w = 1024 - margin.left - margin.right;
  var plotArea = d3.select("#chart")
  var svg = plotArea.append("svg")
    .attr("height", h + margin.top + margin.bottom)
    .attr("width", w + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  var nested_data = d3.nest()
    .key(function(d){
      // filter by the most recent year and use JobTitle as key
      return (d.Year = 2014, d.JobTitle);
    })
    .rollup(function(v){
        // console.log(v)
        // console.log(v[0]['BasePay'])
        return {
          BasePay: d3.mean(v, function(d) {return d.BasePay}),
          TotalPay: d3.mean(v, function(d){return d.TotalPay}),
          Year: v[0]['Year']
      }
    })
    .entries(data);
    // console.log(nested_data[0]['key'])
    // console.log(nested_data[0]['value']['BasePay'])

  // scales
  var colorScale = d3.scaleOrdinal(d3.schemeCategory20)
  var xScale = d3.scaleLinear()
    // set domain to a specific number because the BasePay field has string values
    .domain([75000, 350000])
    .rangeRound([0, w]);
  var yScale = d3.scaleLinear()
    // set domain to a specific number because the number exists outside of scale
    .domain([75000, 480000])
    .rangeRound([h, 0]);

  // X-axis
  var xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(5);
  // Y-axis
  var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(5);

  // X-axis
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis)

  svg.append("text") 
    .attr("class", "label")
    .attr("transform", "translate(" + (w / 2) + " ," + (h + margin.bottom) + ")")
    .text("Base Pay")
    .attr("dy", "1em")
    .style("text-anchor", "middle");

  // Y-axis
  svg.append("g")
    .attr("class", "axis")
    .call(yAxis)

  svg.append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - (h/2))
    .attr("y", 0 - margin.left)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Total Pay");

  var circles = svg
    .append("g")
    .attr("class","circles")
    
  var circle = circles
    .append("g")
    .attr("class", "circle-group")
    .selectAll("circle")
    .data(nested_data)
    .enter()
    .append("circle")
    .attr("class", "circle")

  var circleAttributes = circle
    .attr("cx", function(d){
      if (d['value']['BasePay'] > 75000 && d['value']['TotalPay'] > 100000){
        v = d['value']['BasePay']
        // console.log("Base Pay is "+ v)
        return xScale(v)
      }
    })
    .attr("cy", function(d) {
      if (d['value']['BasePay'] > 75000 && d['value']['TotalPay'] > 100000){
        v = d['value']['TotalPay']
        // console.log("Total Pay is "+ v)
        return yScale(v)
      }
    })
    .attr("id",function(d, i){
      return "circle" + i;
    })
    .attr("r","5")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", function(d, i) {
      return colorScale(i);
    })
    .on("mouseover",handleMouseOver)
    .on("mouseout",handleMouseOut)

  
  function handleMouseOver(d){
    d3.select(this)
      .transition()
      .duration(700)
      .attr("r", 20)
      .attr("stroke-width", 2)
   
    circles.select(".circle-group")
      .data(nested_data)
      .append("text")
      .attr("class", "circle-text")
      .attr("x", xScale(d['value']['BasePay'] ))
      .attr("y", yScale(d['value']['TotalPay']))
      .text(function(){
        jobTitle = d['key'];
        basePay = d['value']['BasePay'];
        totalPay = d['value']['TotalPay'];
        let val = [jobTitle,basePay,totalPay]
        return jobTitle;
      })
      .style("text-transform","lowercase")
      .style("font-variant","small-caps")
      .attr("id", function(i){
        return "text" + i;
      })


  }
  function handleMouseOut(d,i){
    d3.select(this)
      .transition()
      .duration(1000)
      .attr("r", 5)
      .attr("stroke-width", 1)
    
    circles.selectAll(".circle-text").remove();
  }
  
})

