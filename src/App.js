import React, { Component } from 'react';
import './App.css';
import Chart from './Chart.js';
import Input from './Input.js';
class App extends Component {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.setDataList = this.setDataList.bind(this);
    this.addValue = this.addValue.bind(this);
    this.state = {
      value: '',
      dataList: []
    };
  }
  addValue(value) {
    //according to date, produce next month
    var date = this.state.dataList[this.state.dataList.length - 1].date;
    var month = parseInt(date.substr(5));
    if (month == 12) {
      date = parseInt(date.substr(0, 4)) + 1 + '-01';
    } else if (month < 9) date = date.substr(0, 4) + '-0' + (month + 1);
    else date = date.substr(0, 4) + '-' + (month + 1);
    //set State
    var tempList = this.state.dataList;
    var objectTemp = { date: date, value: value };
    var final = tempList.concat(objectTemp);
    this.setState({ dataList: final, value: this.state.value });
  }

  handleValueChange(value) {
    this.setState({ value: value, dataList: this.state.dataList });
  }
  setDataList(dataList) {
    // console.log(dataList);
    this.setState({ dataList: dataList, value: this.state.value });
  }
  render() {
    const value = this.state.value;
    const dataList = this.state.dataList;
    return (
      <div className="App">
        <div style={{ height: '80px' }}>
          <Chart dataList={dataList} setData={this.setDataList} />
        </div>
        <div className="Input">
          <Input
            value={value}
            onValueChange={this.handleValueChange}
            addValue={this.addValue}
          />
        </div>
      </div>
    );
  }
}

export default App;
