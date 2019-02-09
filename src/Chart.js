import React, { Component } from 'react';
import './Chart.css'; // Tell Webpack that Chart.js uses these styles
import * as d3 from 'd3';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.drawInitialChart = this.drawInitialChart.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    this.drawInitialChart();
  }
  componentDidUpdate(prevProps) {
    if (!(prevProps == undefined || prevProps.dataList.length == 0)) {
      if (this.props.dataList !== prevProps.dataList) {
        this.updateChart(this.props.dataList);
      }
    }
  }
  updateChart(dataList) {
    console.log(dataList);
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
    d3.selectAll('svg > *').remove();
    var svg = d3.select('svg');
    // initial
    const margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    // padding
    const chart = svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    //xAxis
    var xScale = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1);

    //yAxis
    // const maxY = d3.max(dataList,function(d){return +d.value})
    // console.log(maxY)
    var yScale = d3.scaleLinear().rangeRound([height, 0]);
    xScale.domain(
      dataList.map(function(d) {
        return d.date;
      })
    );
    chart
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    const maxY = d3.max(dataList, function(d) {
      return +d.value;
    });
    yScale.domain([0, maxY]);
    chart.append('g').call(d3.axisLeft(yScale));

    var barGroups = chart
      .selectAll()
      .data(dataList)
      .enter();
    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function(g) {
        return xScale(g.date);
      })
      .attr('y', function(g) {
        return yScale(Number(g.value));
      })
      .attr('height', function(g) {
        return height - yScale(Number(g.value));
      })
      .attr('width', xScale.bandwidth());

    svg
      .selectAll()
      .data(dataList)
      .enter()
      .append('text')
      .attr('class', 'bar')
      .attr('x', function(d) {
        return xScale(d.date) + xScale.bandwidth() / 2 - 2;
      })
      .attr('y', function(d) {
        return yScale(d.value) - 1;
      })
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .text(function(d) {
        return d.value;
      });
  }
  async drawInitialChart() {
    var dataList = [];
    await d3.csv(
      'date.csv',
      function(d) {
        return {
          date: d.date,
          value: d.value
        };
      },
      function(data) {
        dataList.push(data);
      }
    );
    var svg = d3.select('svg');
    // initial
    const margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    // padding
    const chart = svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    //xAxis
    var xScale = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1);

    //yAxis
    // const maxY = d3.max(dataList,function(d){return +d.value})
    // console.log(maxY)
    var yScale = d3.scaleLinear().rangeRound([height, 0]);
    xScale.domain(
      dataList.map(function(d) {
        return d.date;
      })
    );
    chart
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    const maxY = d3.max(dataList, function(d) {
      return +d.value;
    });
    yScale.domain([0, maxY]);
    chart.append('g').call(d3.axisLeft(yScale));

    var barGroups = chart
      .selectAll()
      .data(dataList)
      .enter();
    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function(g) {
        return xScale(g.date);
      })
      .attr('y', function(g) {
        return yScale(Number(g.value));
      })
      .attr('height', function(g) {
        return height - yScale(Number(g.value));
      })
      .attr('width', xScale.bandwidth());

    svg
      .selectAll()
      .data(dataList)
      .enter()
      .append('text')
      .attr('class', 'bar')
      .attr('x', function(d) {
        return xScale(d.date) + xScale.bandwidth() / 2 - 2;
      })
      .attr('y', function(d) {
        return yScale(d.value) - 1;
      })
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .text(function(d) {
        return d.value;
      });
    this.props.setData(dataList);
  }

  render() {
    // You can use them as regular CSS styles
    // initial
    return <svg className="chart" width="960" height="500" />;
  }
}
export default Chart;
