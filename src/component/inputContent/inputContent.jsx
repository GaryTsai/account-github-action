import React, {Component} from 'react';
import Radium from "radium";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./styles";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
import "firebase/database";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import utils from "../../utils/dateFormat";
import CategoryTable from "./categoryTable/categoryTable";
import AccountTable from "./accountTable/accountTable";

const month = utils.toDualDigit(new Date().getMonth() + 1);
const day = utils.toDualDigit(new Date().getDate());
const initialState = {
  inputCategory: '早餐',
  inputContent: '',
  inputValue: '',
  inputAccount: '現金',
  date: new Date().getDate().toString(),
  startDate: new Date(),
  recordDate: new Date().getFullYear() + '-' + month + '-' + day,
  isOpen: false,
  isOpenCategoryTable: false,
  isOpenAccountTable: false
};

class InputContent extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  itemCheck = () => {
    const {inputValue} = this.state;

    if (!inputValue) return false;
    return true
  };

  submitContent = () => {
    const {updateItemCallback, items, account, eventEmitter} = this.props;
    const {recordDate} = this.state;
    if (!this.itemCheck()) {
      return;
    }
    items.push({
      date: recordDate,
      accountClass: this.state.inputAccount,
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
      itemValue: this.state.inputValue,
      accountClass: this.state.inputAccount,
    }).then(function () {
      console.log("新增Post成功");
    }).catch(function (err) {
      console.error("新增Post錯誤：", err);
    });
    eventEmitter.dispatch('itemInsert', this.state.inputCategory.toString());
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

  inputAccountContent = (account) => this.setState({inputAccount: account});

  monthOfCost = () => {
    const {items} = this.props;
    const {startDate} = this.state;
    const newStartDate = new Date(startDate);
    let result = 0;
    const whichMonth = newStartDate.getFullYear() + '-' + utils.toDualDigit(newStartDate.getMonth() + 1);
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

  handleChange = date => {
    const {eventEmitter} = this.props;
    this.props && this.props.itemCallback(date);
    eventEmitter.dispatch('datePicker', date.toString());
    this.setState({
      startDate: date,
      recordDate: date,
      isOpen: false
    });
  };

  handleCancel = () => this.setState({isOpen: false});

  handleSelect = (time) => this.setState({time, isOpen: false});

  handleClick = () => {
    this.setState({isOpen: true});
  };

  openCategoryList = () => {
    if(this.state.isOpenAccountTable) return;
    this.setState({isOpenCategoryTable: true});
  }

  closeCategoryList = () => this.setState({ isOpenCategoryTable: false});

  openAccountList = () => {
    if(this.state.isOpenCategoryTable) return;
    this.setState({isOpenAccountTable: true});
  }

  closeAccountList = () => this.setState({ isOpenAccountTable: false});

  isSmallDevices = () => window.screen.width < 414;

  changeCategory = (category) =>{
    this.setState({inputCategory: category, isOpenCategoryTable:false})
  };

  changeAccount = (account) =>{
    this.setState({inputAccount: account, isOpenAccountTable:false})
  };

  render() {
    const {items, monthOfBudget, account} = this.props;
    const {startDate, isOpenCategoryTable, isOpenAccountTable} = this.state;
    var newStartDate = new Date(startDate);
    const month = ((newStartDate.getMonth() + 1));
    const remainDays = (utils.days(new Date().getFullYear(), new Date().getMonth() + 1)) +1 - day;
    const percentage = ((parseInt(monthOfBudget) - this.monthOfCost()) / parseInt(monthOfBudget) * 100).toFixed(0)
    const isSmallDevice = window.screen.width <= 450;
    return (
      <div>
        <div style={styles.mainExpense}>
          <div style={styles.expenseOfStyle}>{month} 月花費: <span style={styles.expense}>{this.monthOfCost()} <span style={styles.unit}>$NT</span></span>
          </div>
          <div style={styles.expenseOfStyle}>該日花費: <span style={styles.expense}>{this.todayOfCost(items)} <span style={styles.unit}>$NT</span></span>
          </div>
          <div style={styles.expenseOfStyle}>實際支出: <span
            style={styles.expense}>{(this.monthOfCost() / day).toFixed(0)} <span style={styles.unit}>$NT/天</span></span></div>
        </div>
        <div style={styles.secondExpense}>
          <div style={styles.expenseOfStyle}>剩餘天數: <span
            style={styles.expense}>{remainDays} <span style={styles.unit}>天</span></span></div>
          <div style={{width: 65, height: 65}}>
            <CircularProgressbar styles={buildStyles({
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
              pathColor: `rgba(232, 115, 24, ${percentage / 20})`,
              textColor: parseInt(percentage) > 0 ? 'rgb(206 90 0)' : '#f44336',
              trailColor: parseInt(percentage) > 0 ? '#9e9e9e' : '#f44336',
            })} strokeWidth={12} trailColor={'#ffffff'} value={percentage} text={`${percentage}%`}/>
          </div>
          <div style={styles.expenseOfStyle}>剩餘花費: <span
            style={styles.remaining}>{monthOfBudget - this.monthOfCost()} <span style={styles.unit}>$NT</span></span></div>
        </div>
        <div style={styles.inputBudget}>
          <div className="col">
            <input type="date" className="form-control" placeholder="日期"
                   onChange={(c) => this.handleChange(c.target.value)} value={this.state.recordDate}/>
          </div>

          {!this.isSmallDevices() && <div style={{
            display: 'flex',
            justifyContent: ' center',
            alignItems: 'center'
          }}>
            <span style={styles.span}>預估預算: </span>
            <input type="text"
                   style={styles.styleOfInput}
                   value={monthOfBudget}
                   onChange={(c) => this.inputBudget(c.target.value)} inputmode="numeric" />
                   <span style={styles.span}> $NT</span>
          </div>}
          {!this.isSmallDevices() &&<span style={{...styles.span, whiteSpace: 'nowrap'}}>剩餘預算/天: <span
            style={styles.span}>{Math.round(((monthOfBudget - this.monthOfCost()) / remainDays))}</span><span
            style={styles.span}>元</span>
          </span>}
        </div>
        {this.isSmallDevices() &&<div style={{...styles.inputBudget, borderTop: '1px solid black'}}>
          <div style={{
            width: '50%'
          }}>
            <span style={styles.span}>預估預算: </span>
            <input type="text"
                   style={styles.styleOfInput}
                   value={monthOfBudget}
                   onChange={(c) => this.inputBudget(c.target.value)} inputmode="numeric" />
            <span style={styles.span}> $NT</span>
          </div>
          <span style={{...styles.span, width: '50%', whiteSpace: 'nowrap'}}>剩餘預算/天: <span
            style={styles.span}>{Math.round(((monthOfBudget - this.monthOfCost()) / remainDays))}</span><span
            style={styles.span}>元</span>
          </span>
        </div>}
        <div style={styles.inputContainer}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
            <label style={styles.inputTitle}>帳戶: </label>
            <div style={{...styles.styleOfSelectCategory, border:'2px solid #ffbf00', width: '100%'}} onClick={()=>this.openAccountList()}>{this.state.inputAccount}</div>
            {isOpenAccountTable && <AccountTable account={account} closeCallback={() => this.closeAccountList()} selectCallback={this.changeAccount}/>}
            <label style={styles.inputTitle}>類別: </label>
            <div style={{...styles.styleOfSelectCategory, width: '100%'}}onClick={()=>this.openCategoryList()}>{this.state.inputCategory}</div>
            {isOpenCategoryTable && <CategoryTable closeCallback={() => this.closeCategoryList()} selectCallback={this.changeCategory}/>}
            <label style={styles.inputTitle}>備註: </label>
            <input type="text" style={styles.inputFrame} value={this.state.inputContent}
                   onChange={(c) => this.inputContent(c.target.value)}/>
            <label style={styles.inputTitle}>費用: </label>
            <input type="text" style={styles.inputFrame} value={this.state.inputValue}
                   onChange={(c) => this.inputValue(c.target.value)} inputmode="numeric" />
            {!isSmallDevice && <button type="submit" key={"item-submit"} style={{...styles.submit,margin: '0px 5px', borderRadius: '10px'}} onClick={() => this.submitContent()}>儲存
            </button>}
          </div>
        </div>
        {isSmallDevice && <button type="submit" key={"item-submit"} style={{...styles.submit, borderTop: '1px solid black'}} onClick={() => this.submitContent()}>儲存
        </button>}
      </div>
    )
  }
}

export default Radium(InputContent)