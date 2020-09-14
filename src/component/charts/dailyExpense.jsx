import React, {Component} from 'react';
import Radium from "radium";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "react-circular-progressbar/dist/styles.css";

// import DatePicker from "react-datepicker";
import DatePicker from 'react-mobile-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import utils from "../../utils/dateFormat";
import styles from "./styles";

am4core.useTheme(am4themes_animated);

const initialState = {
  dailyExpenseOfMonth: '',
  year: new Date().getFullYear(),
  time: new Date()
};

const monthMap = {
  '1': 'Jan',
  '2': 'Feb',
  '3': 'Mar',
  '4': 'Apr',
  '5': 'May',
  '6': 'Jun',
  '7': 'Jul',
  '8': 'Aug',
  '9': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

const dateConfig = {
  'year': {
    format: 'YYYY',
    caption: 'Year',
    step: 1,
  },
  'month': {
    format: value => monthMap[value.getMonth() + 1],
    caption: 'Mon',
    step: 1,
  }
};

class DailyExpense extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const date = new Date();
    const {items} = this.props;
    const dailyExpense = [];
    const days = utils.days(date.getFullYear(), date.getMonth() + 1);

    let array = {};
    for (let d = 1; d <= days; d++) {
      let dateOfTheMonth = date.getFullYear() + '-' + utils.toDualDigit(date.getMonth() + 1) + '-' + utils.toDualDigit(d);
      let filterMonthItem = items.filter(function (item) {
        return item.date.includes(dateOfTheMonth);
      });
      if (filterMonthItem.length !== 0) {
        array[d] = (filterMonthItem);
      }
    }
    for (let i = 1; i < days; i++) {
      let formatDate = date.getFullYear() + '-' + utils.toDualDigit(date.getMonth() + 1) + '-' + utils.toDualDigit(i);
      let daily = items.filter(function (item, index, array) {
        return item.date.includes(formatDate);
      });
      dailyExpense.push({
        date: utils.toDualDigit(date.getMonth() + 1) + '-' + utils.toDualDigit(i),
        dailyExpense: daily.reduce(function (accumulator, currentValue, currentIndex, array) {
          return accumulator + parseInt(currentValue.itemValue);
        }, 0)
      })
    }
// Themes begin
    am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
    var chart = am4core.create("daily-expense", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

// Add data
    chart.data = dailyExpense;

    prepareParetoData();

    function prepareParetoData() {
      var total = 0;

      for (let i = 0; i < chart.data.length; i++) {
        let value = chart.data[i].dailyExpense;
        total += value;
      }

      var sum = 0;
      for (let i = 0; i < chart.data.length; i++) {
        let value = chart.data[i].dailyExpense;
        sum += value;
        chart.data[i].pareto = sum / total * 100;
      }
    }

// disabled
    chart.logo.disabled = true;
// Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "date";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.tooltip.disabled = true;
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 25;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;

// Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "dailyExpense";
    series.dataFields.categoryX = "date";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

// on hover, make corner radiuses bigger
    var hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
      if (chart.data[target.dataItem.index].dailyExpense < 250)
        return chart.colors.getIndex(1);
      if (chart.data[target.dataItem.index].dailyExpense < 1000)
        return chart.colors.getIndex(11);
      else
        return chart.colors.getIndex(10);
    });


    var paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    paretoValueAxis.renderer.opposite = true;
    paretoValueAxis.min = 0;
    paretoValueAxis.max = 100;
    paretoValueAxis.strictMinMax = true;
    paretoValueAxis.renderer.grid.template.disabled = true;
    paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
    paretoValueAxis.numberFormatter.numberFormat = "#'%'"
    paretoValueAxis.cursorTooltipEnabled = false;

    var paretoSeries = chart.series.push(new am4charts.LineSeries())
    paretoSeries.dataFields.valueY = "pareto";
    paretoSeries.dataFields.categoryX = "date";
    paretoSeries.yAxis = paretoValueAxis;
    paretoSeries.tooltipText = "pareto: {valueY.formatNumber('#.0')}%[/]";
    paretoSeries.bullets.push(new am4charts.CircleBullet());
    paretoSeries.strokeWidth = 2;
    paretoSeries.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    paretoSeries.strokeOpacity = 0.5;
// Cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  state = {
    time: new Date(),
    isOpen: false,
  }

  handleClick = () => this.setState({isOpen: true});

  handleCancel = () => this.setState({isOpen: false});

  handleSelect = (time) => this.setState({time, isOpen: false});

  getChartHeight = () => {
    return window.innerHeight - 44 - 26.5 - 40
  };

  render() {
    const {year, time} = this.state;
    return (
      <div style={{background: '#ffffff'}}>
        <div className="App">
          <a style={{cursor: 'pointer'}}
             onClick={this.handleClick}>
            <div style={{
              backgroundColor: '#b8dbff',
              textAlign: 'center',
              color: 'black',
              fontSize: '20px', ...styles.selectTime
            }}>{utils.dateFormat(time).slice(0, 7)}</div>
          </a>
          <DatePicker
            value={this.state.time}
            isOpen={this.state.isOpen}
            onSelect={this.handleSelect}
            dateConfig={dateConfig}
            onCancel={this.handleCancel}/>
        </div>
        <div id="daily-expense" style={{width: "100%", height: this.getChartHeight()}}/>
      </div>
    );
  }
}

export default Radium(DailyExpense);