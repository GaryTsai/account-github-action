import React, {Component} from 'react';
import styles from "./styles";
import utils from "../../utils/dateFormat";

const initialState = {
  monthItems: '',
};

export default class DetailOfMonth extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.items !== this.props.items) {
      this.showDetailOfMonth(nextProps.items, this.props.annualMonth,);
    }
  }

  deleteItem = (timestamp) => {
    const {deleteCallback} = this.props;
    deleteCallback && deleteCallback(timestamp);
  };

  showDetailOfMonth = (items, dateAndMonth) => {
    const days = utils.days(dateAndMonth.slice(0, 4), dateAndMonth.slice(6, 8));
    let array = {};
    for (let d = 1; d <= days; d++) {
      let dateOfTheMonth = dateAndMonth + '-' + utils.toDualDigit(d);
      let filterMonthItem = items.filter(function (item) {
        return item.date.includes(dateOfTheMonth);
      });
      if (filterMonthItem.length !== 0) {
        array[d] = (filterMonthItem);
      }
    }
    this.setState({monthItems: array});
  };

  dailyCost = (cost_data) =>{
    let total_cost = 0;
    cost_data.map((c, idx) => (
      total_cost += parseInt(c.itemValue)
    ));

    return total_cost;
  };

  componentDidMount() {
    const {annualMonth, items} = this.props;
    this.showDetailOfMonth(items, annualMonth);
  }

  render() {
    const {monthItems} = this.state;
    const {annualMonth} = this.props;
    console.log(monthItems);
    return (
      <div style={{display: 'inline-block', textAlign: 'left', width: '100%'}}>
        <li style={{listStyleType: 'none', ...styles.styleOfYearMonth}}>{annualMonth}</li>
        {Object.keys(monthItems).reverse().map((c, idx) => (
          <div key={'monthCost' + idx}>
            <li style={{listStyleType: 'none', ...styles.styleOfDate}}>{c+ ' :'}<div style={styles.dailyCost} >{'    ' + this.dailyCost(monthItems[c])}</div></li>
            {Object.keys(monthItems[c]).reverse().map((item, idx2) => (
              <li style={{listStyleType: 'none', ...styles.styleOfItem}} key={'item' + idx2}>
                <span>{monthItems[c][item].itemClass + ':'}</span>
                <span>{(monthItems[c][item].itemContent ? (monthItems[c][item].itemContent + '') : '')}</span>
                <span>{monthItems[c][item].itemValue + '$NT'}</span>
                <span><img onClick={() => this.deleteItem(monthItems[c][item].timestamp)} style={styles.deleteIcon}
                           alt="delete item" src={require('../../assets/img/item-delete.png')}/></span>
                {/*<span><img style={styles.editIcon} alt="edit item" src={require('./../../../assets/img/item-edit.png')}/></span>*/}
              </li>
            ))}
          </div>
        ))}

      </div>
    )
  }
}