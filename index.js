/* eslint-disable */
d3.csv('salaries.csv', function(data){
	var body = d3.select('body')
	var margin = {top:50,right:50,left:50,bottom:50}
	var h = 700 - margin.top - margin.bottom
	var w  = 700 - margin.left - margin.right
	// svg  
	var svg = body.append('svg')
		.attr('height', h + margin.top + margin.bottom)
		.attr('width', w + margin.left + margin.right)
		.append('g')
		.attr('transform','translate(' + margin.left + ',' + margin.top + ')')
	// scales
	var colorScale = d3.scaleOrdinal(d3.schemeCategory20)
	var xScale = d3.scaleLinear()
		// set domain to a specific number because the BasePay field has string values
		.domain([50000,350000])
		.rangeRound([0,w])
	var yScale = d3.scaleLinear()
		// set domain to a specific number because the number exists outside of scale
		.domain([50000,480000])
		.rangeRound([h,0])
	// X-axis
	var xAxis = d3.axisBottom()
		.scale(xScale)
		.ticks(5)
	// Y-axis
	var yAxis = d3.axisLeft()
		.scale(yScale)
		.ticks(5)

	var circles = svg.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.filter(function(d){return d.Year = 2014 && d.BasePay > 50000 && d.TotalPay > 50000})
		.attr('cx',function (d) { 
			// v = xScale(d.BasePay); 
			// console.log("Total Pay is "+ v + " and " + d.BasePay); 
			return xScale(d.BasePay)
		})
		.attr('cy',function (d) { 
			// v = yScale(d.TotalPay); 
			// console.log("Total Pay is "+ v + " and " + d.TotalPay); 
			return yScale(d.TotalPay) 
        })
		.attr('r','5')
		.attr('stroke','black')
		.attr('stroke-width',1)
        .attr('fill',function (d,i) { return colorScale(i) })
        .attr('class','circle')
		.on('click', function () {
			d3.select(this)
				.transition()
				.duration(500)
				.attr('r',10)
				.attr('stroke-width',2)
				// .append('text')
			    // .text(function(d){
			    //     str = 'Base: $' +  d.BasePay + 'Total: $' + d.TotalPay
			    //     // console.log(str)
			    //     return str
			    // })
			    // .style('text-anchor','middle')
		})
		.on('mouseout', function () {
			d3.select(this)
				.transition()
				.duration(500)
				.attr('r',5)
				.attr('stroke-width',1)
		})
	// below append MULTIPLE text on top of each other
	// var texts = svg.selectAll('p')
	//     .append('text')
	//     .text(function(d){
	//         str = "BasePay: " +  d.BasePay 
	//         // console.log(str)
	//         return str
	//     })

	// X-axis
    svg.append('g')
		.attr('class','axis')
		.attr('transform', 'translate(0,' + h + ')')
		.call(xAxis)
		.append('text') // X-axis Label
        .attr('class','label')
        .text('Base Pay')
		.attr('y',-50)
		.attr('x',w)
		.attr('dy','.71em')
		.style('text-anchor','end')
		
	// Y-axis
	svg.append('g')
		.attr('class', 'axis')
		.call(yAxis)
		.append('text') // y-axis Label
		.attr('class','label')
		.attr('transform','rotate(-90)')
		.attr('x',0)
		.attr('y',5)
		.attr('dy','.71em')
		.style('text-anchor','end')
		.text('Total Pay')

})



