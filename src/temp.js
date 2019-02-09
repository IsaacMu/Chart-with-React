// var svg = d3.select('svg');
// const margin = {
//     top: 20,
//     right: 20,
//     bottom: 30,
//     left: 50
// };
// const width = +svg.attr('width') - margin.left - margin.right;
// const height = +svg.attr('height') - margin.top - margin.bottom;
//
//
// //xAxis
// var xScale = d3
//     .scaleBand()
//     .rangeRound([0, width])
//     .padding(0.1);
// xScale.domain(
//     dataList.map(function(d) {
//         return d.date;
//     })
// );
//
// //yAxis
// var yScale = d3.scaleLinear().rangeRound([height, 0]);
//
// const maxY = d3.max(dataList, function(d) {
//     return +d.value;
// });
// yScale.domain([0, maxY]);
//
// var bars = svg.selectAll("rect")			//Select all bars
//     .data(dataList);	//Re-bind data to existing bars, return the 'update' selection
//
//
// // var barGroups = chart
// //     .selectAll()
// //     .data(dataList)
// //     .enter();
// bars.enter()
//     .append('rect')
//     .attr('class', 'bar')
//     .attr('x', function(g) {
//         return xScale(g.date);
//     })
//     .attr('y', function(g) {
//         return yScale(Number(g.value));
//     })
//     .attr('height', function(g) {
//         return height - yScale(Number(g.value));
//     })
//     .attr('width', xScale.bandwidth())
//     .attr("fill", function(d) {				//Sets the fill value
//         return "rgb(0, 0, " + Math.round(d * 10) + ")";
//     })
//     .merge(bars)							//Merges the enter selection with the update selection
//     .transition()							//Initiate a transition on all elements in the update selection (all rects)
//     .duration(500)
//     .attr("x", function(d, i) {				//Set new x position, based on the updated xScale
//         return xScale(d.date);
//     })
//     .attr("y", function(d) {				//Set new y position, based on the updated yScale
//         return height - yScale(d.value);
//     })
//     .attr("width", xScale.bandwidth())		//Set new width value, based on the updated xScale
//     .attr("height", function(d) {			//Set new height value, based on the updated yScale
//         return yScale(d.value);
//     });
// //
// // svg
// //     .selectAll()
// //     .data(dataList)
// //     .enter()
// //     .append('text')
// //     .attr('class', 'bar')
// //     .attr('x', function(d) {
// //         return xScale(d.date) + xScale.bandwidth() / 2 - 2;
// //     })
// //     .attr('y', function(d) {
// //         return yScale(d.value) - 1;
// //     })
// //     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
// //     .text(function(d) {
// //         return d.value;
// //     });
