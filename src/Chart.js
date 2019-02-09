import React, { Component } from 'react';
import './Chart.css'; // Tell Webpack that Chart.js uses these styles
import * as d3 from 'd3';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this);
  }
  componentDidMount() {
    var data = this.drawChart();
    this.props.setData(data);
  }

  async drawChart() {
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

    var data = this.props.dataList;
    console.log('1');
    var dataList = data;
    // var dataList = this.state.dataList;
    //get Initial value
    var dataType = await d3.csv(
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
    return dataList;
  }

  render() {
    // You can use them as regular CSS styles
    // initial
    return <svg className="chart" width="960" height="500" />;
  }
}
export default Chart;
