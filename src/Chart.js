import React, { Component } from 'react';
import './Chart.css'; // Tell Webpack that Chart.js uses these styles
import * as d3 from 'd3';

class Chart extends Component {
  componentDidMount() {
    this.drawChart();
  }
  async drawChart() {
    // initial
    const margin = 60;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    //get Initial value
    var dataList = [];
    var data = await d3.csv(
      'date.csv',
      function(d) {
        return {
          date: d.date,
          value: d.value
        };
      },
      function(data) {
        console.log(data);
        dataList.push(data);
      }
    );
    console.log(data);
    console.log(dataList);

    const svg = d3.select('svg');
    // padding
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin}, ${margin})`);
    //yAxis
    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, 100]);
    chart.append('g').call(d3.axisLeft(yScale));
    //xAxis
    const xScale = d3
      .scaleTime()
      .range([0, width])
      .domain(dataList.map(d => d.date));

    chart
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));
  }
  render() {
    // You can use them as regular CSS styles
    return <svg className="chart" />;
  }
}
export default Chart;
