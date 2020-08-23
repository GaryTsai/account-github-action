import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Radium from "radium";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import category from '../../../settings/category'
import styles from "./styles";
// import DatePicker from "react-datepicker";
import DatePicker from 'react-mobile-datepicker';

import "react-datepicker/dist/react-datepicker.css";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
import "firebase/database";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import utils from "../../../utils/dateFormat";

const month = utils.toDualDigit(new Date().getMonth() + 1);
const day = utils.toDualDigit(new Date().getDate());
const initialState = {
  inputCategory: '早餐',
  inputContent: '',
  inputValue: '',
  date: new Date().getDate().toString(),
  startDate: new Date(),
  recordDate: new Date().getFullYear() + '-' + month + '-' + day,
  isOpen: false
};

class InputContent extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  itemCheck = () => {
    const {inputValue} = this.state;

    if(!inputValue) return false;

    return true
  };

  submitContent = () => {
    const {updateItemCallback, items, account} = this.props;
    const {recordDate} = this.state;
    if (!this.itemCheck()) {
      return;
    }
    items.push({
      date: recordDate,
      itemClass: this.state.inputCategory,
      itemContent: this.state.inputContent,
      itemValue: this.state.inputValue
    });
    let postRef = firebase.database().ref(`/expense/${account}`);
    let timestamp = Math.floor(Date.now() / 1000);
    postRef.child(timestamp.toString()).set({
      timestamp: timestamp,
      date: recordDate,
      itemClass: this.state.inputCategory,
      itemContent: this.state.inputContent,
      itemValue: this.state.inputValue
    }).then(function () {
      console.log("新增Post成功");
    }).catch(function (err) {
      console.error("新增Post錯誤：", err);
    });

    this.setState({inputContent: '', inputValue: ''});
    updateItemCallback && updateItemCallback(recordDate);
  };

  inputContent = (content) => this.setState({inputContent: content});

  inputValue = (value) => {
    if (!isNaN(value)) {
      return this.setState({inputValue: value});
    }
    return;
  };

  inputCategory = (value) => this.setState({inputCategory: value});


  monthOfCost = () => {
    const {items} = this.props;
    const {startDate} = this.state;
    let result = 0;
    const whichMonth = startDate.getFullYear() + '-' + utils.toDualDigit(startDate.getMonth() + 1);
    let monthItems = items.filter(function (item) {
      return item.date.includes(whichMonth);
    });
    for (let i = 0; i < monthItems.length; i++) {
      result += parseInt(monthItems[i].itemValue);
    }
    return result;
  };

  todayOfCost = dayItems => {
    const {recordDate} = this.state;
    if (!dayItems) return;
    let result = 0;
    let todayItems = dayItems.filter(function (item) {
      return item.date.includes(recordDate);
    });
    Object.values(todayItems).map((c) => result += parseInt(c.itemValue));

    return result
  };

  inputBudget = budget => {
    const {setBudgetCallback} = this.props;
    if (!isNaN(budget)) {
      return setBudgetCallback && setBudgetCallback(budget);
    }
    return;
  };

  getFormatDate = date => {
    const year = date.getFullYear();
    const month = utils.toDualDigit(date.getMonth() + 1);
    const day = utils.toDualDigit(date.getDate());

    return year + '-' + month + '-' + day
  };

  handleChange = date => {
    this.props && this.props.itemCallback(date,this.getFormatDate(date));

    this.setState({
      startDate: date,
      recordDate: this.getFormatDate(date),
      isOpen: false
    });
  };

  handleClick = () => {
    this.setState({ isOpen: true });
  }

  handleCancel = () => {
    this.setState({ isOpen: false });
  };

  handleSelect = (time) => {
    this.setState({ time, isOpen: false });
  };
  handleClick = () => {
    this.setState({ isOpen: true });
  }
  render() {
    const {items, monthOfBudget, datePickerDate} = this.props;
    const {startDate} = this.state;
    const month = ((startDate.getMonth() + 1));
    const remainDays = (utils.days(new Date().getFullYear(), new Date().getMonth()))+ 1 - day;
    console.log(datePickerDate);
    const percentage = ((parseInt(monthOfBudget)-this.monthOfCost())/parseInt(monthOfBudget)*100).toFixed(0)
    return (
      <div>
        <div style={styles.mainExpense}>
          <div style={styles.expenseOfStyle}>{month} 月花費: <span style={styles.expense}>{this.monthOfCost()} $NT</span>
          </div>
          <div style={styles.expenseOfStyle}>該日花費: <span style={styles.expense}>{this.todayOfCost(items)} $NT</span>
          </div>
          <div style={styles.expenseOfStyle}>實際支出: <span
            style={styles.expense}>{(this.monthOfCost()/day).toFixed(0)} $NT/天</span></div>
        </div>
        <div style={styles.secondExpense}>
          <div style={styles.expenseOfStyle}>剩餘天數: <span
            style={styles.expense}>{remainDays} 天</span></div>
          <div style={{ width: 65, height: 65 }}>
            <CircularProgressbar   styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              rotation: 0.25,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'butt',

              // Text size
              textSize: '30px',

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: `rgba(255, 120, 0, ${percentage / 20})`,
              textColor: parseInt(percentage) > 0  ? '#ffffff' : '#f44336',
              trailColor: parseInt(percentage) > 0  ? '#ffffff' : '#f44336',
            })} strokeWidth={12} trailColor={'#ffffff'} value={percentage} text={`${percentage}%` } />
          </div>
          <div style={styles.expenseOfStyle}>剩餘花費: <span
            style={styles.expense}>{monthOfBudget - this.monthOfCost()} $NT</span></div>
        </div>
        <div style={styles.inputBudget}>
          {/*<DatePicker*/}
          {/*  selected={datePickerDate}*/}
          {/*  onChange={this.handleChange}*/}
          {/*  onFocus={e=>{e.preventDefault();e.stopPropagation();}}*/}
          {/*/>*/}
          <a style={styles.time} key={'datePicker'}
            onClick={this.handleClick}>
            {this.state.recordDate}
          </a>
          <DatePicker
            value={datePickerDate}
            isOpen={this.state.isOpen}
            onSelect={this.handleChange}
            onCancel={this.handleCancel}
            theme={'dark'}
          />
          <div style={{
            display: 'flex',
            justifyContent: ' center'
          }}>
            <span style={styles.span}>預估預算: </span><input type="text"
                                                          style={styles.styleOfInput}
                                                          value={monthOfBudget}
                                                          onChange={(c) => this.inputBudget(c.target.value)}/><span
            style={styles.span}> $NT</span></div>
          <span style={{...styles.span, whiteSpace:'nowrap'}}>剩餘預算/天: <span
            style={styles.span}>{Math.round(((monthOfBudget - this.monthOfCost()) / remainDays))}</span><span
            style={styles.span}>元</span>
          </span>
        </div>
        <div style={styles.inputContainer}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '80%'}}>
            <label style={styles.inputTitle}>類別: </label>
            <select className='category' style={styles.selectFrame} id="category"
                    onChange={(c) => this.inputCategory(c.target.value)}>
              {category['CATEGORY'].map((c, i) => (
                <option key={'category' + i} value={c}>{c}</option>
              ))}
            </select>
            <label style={styles.inputTitle}>備註: </label>
            <input type="text" style={styles.inputFrame} value={this.state.inputContent}
                   onChange={(c) => this.inputContent(c.target.value)}/>
            <label style={styles.inputTitle}>費用: </label>
            <input type="text" style={styles.inputFrame} value={this.state.inputValue}
                   onChange={(c) => this.inputValue(c.target.value)}/>
          </div>
          <button type="submit" key={"item-submit"} style={{...styles.submit}} onClick={() => this.submitContent()}>儲存
          </button>
        </div>
      </div>
    )
  }
}
export default Radium(InputContent)