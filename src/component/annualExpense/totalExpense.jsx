import React, {Component} from 'react';
import styles from "./styles";
import utils from "../../utils/dateFormat";
import Radium from "radium";
const initialState = {
  initYear: 2020,
  AnnualCost: 0,
  AnnualMonthCost: '',
};

class InputContent extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps !== nextContext) {
      this.setAnnualCost();
    }
  }

  setAnnualCost = result => {
    const cost = {};
    Object.keys(result).map((y) => {
      let accumulator = 0;
      Object.keys(result[y]).map((v, idx) =>
        accumulator += result[y][idx]
      );
      return cost[y] = parseInt(accumulator);
    });
    this.setState({AnnualCost: cost})
  };

  annualMonthCost = () => {
    const {items} = this.props;
    const {initYear} = this.state;
    let result = {};
    let dateYear = new Date().getFullYear() + '-';
    const month = new Date().getMonth();
    for (let y = initYear; y <= parseInt(dateYear); y++) {
      result[y.toString()] = {};
      const endMonth = parseInt(y) === parseInt(dateYear) ? month + 1 : 12;
      for (let m = 1; m <= endMonth; m++) {
        result[y.toString()][m - 1] = 0;
        let dateYearAndMonth = y.toString() + '-' + utils.toDualDigit(m);
        let filterMonthItem = items.filter(function (item) {
          return item.date.includes(dateYearAndMonth);
        });
        for (let i = 0; i < filterMonthItem.length; i++) {
          result[y][m - 1] += parseInt(filterMonthItem[i].itemValue);
        }
      }
    }
    this.setState({AnnualMonthCost: result});
    this.setAnnualCost(result);
  };

  componentDidMount() {
    this.annualMonthCost();
  }

  render() {
    const {AnnualCost, AnnualMonthCost} = this.state;
    const {detailOfMonth} = this.props;

    return (
      <div style={{display: 'inline-block', textAlign: 'left', width: '100%'}}>
        {Object.keys(AnnualMonthCost).map((c, idx) => (
          <div key={'AnnualCost' + idx}>
            {AnnualCost[c] !== 0 &&
            <li style={{listStyleType: 'none', ...styles.styleOfYear}}>{c + '年 : '}{AnnualCost[c]}$NT</li>}
            {Object.keys(AnnualMonthCost[c]).map((d, idx) => (
              AnnualMonthCost[c][idx] !== 0 &&
              <li style={{listStyleType: 'none', ...styles.styleOfMonth}} key={'monthOfCost' + c + idx}
                  onClick={() => detailOfMonth([c, idx])}>{idx + 1 + '月 : ' + AnnualMonthCost[c][idx]}$NT</li>
            ))}
          </div>
        ))}
      </div>
    )
  }
}
export default Radium(InputContent)