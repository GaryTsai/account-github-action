import React, {Component} from 'react';
import Header from './component/header/header';
import Content from './component/contents/content';
import LogIn from './component/login';
import _isUndefined from 'lodash/isUndefined';
import DailyExpense from './component/charts/dailyExpense';

// import Workbook from './utils/workbook';
import InputContent from './component/inputContent/inputContent';
import Powered from './component/powered/powered';
import DetailMonth from './component/detailOfMonth/detailOfMonth';
import TotalExpense from './component/annualExpense/totalExpense';
import utils from './utils/dateFormat';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
import "firebase/database";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import './App.css';
import eventEmitter from './eventTracking/eventEmitter';
import eventTracking from './eventTracking/eventTracking';

// import {saveAs} from 'file-saver';
// import XLSX from 'xlsx';
// import Gtag from './eventTracking/Gtag';
// const tracker = new Gtag();
const firebaseConfig= {
  apiKey: process.env.REACT_APP_APP_KEY,
  authDomain:process.env.REACT_APP_AUTHDOMAIN,
  databaseURL:process.env.REACT_APP_DATABSEURL,
  projectId:process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGEINGSENDERID,
  appId:　process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
};

const initialState = {
  inputContent: '',
  inputCategory: '',
  allItems: [],
  monthItems: [],
  monthOfBudget:'',
  route: 'login',
  annualMonth:'',
  date: '',
  account: '',
  todayItems:[],
  year:'',
  month:'',
  loading: true.valueOf(),
  datePickerDate: new Date()
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    new eventTracking();
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if(nextState.account !== this.state.account){
      this.getUserData(nextState.account,this.getCurrentDate())
    }
    if(nextState.allItems !== this.state.allItems){
      this.setState({allItems:nextState.allItems});
    }
    if(nextState.todayItems !== this.state.todayItems){
      this.setState({ todayItems: nextState.todayItems});
    }
  }

  componentDidMount() {
    const {account} = this.state;
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    this.loginRecord();
    const date = utils.dateFormat(new Date());
    this.getUserData(account, date);
  };

  loginRecord = () =>{
    const account = localStorage.getItem('account');
    if(!!account)
      this.login(account);
    else return;
  };

  logOut = () =>{
    localStorage.removeItem('account');
    eventEmitter.dispatch('accountLogOut', this.state.account.toString());
    this.setState({account:'', route:'login'})
  };

  getCurrentDate =()=>{
    let year = new Date().getFullYear();
    let month = ('0' + (new Date().getMonth()+1)).slice(-2);
    let day = ('0' + (new Date().getDate())).slice(-2);
    return year+'-'+month+'-'+day;
  };

  getUserBudget = account =>{
    let self =this;
    if(account ==='') return ;
    let getBudgetRef = firebase.database().ref(`/account/${account}`);
    getBudgetRef.once('value').then((snapshot) => {
      let accountBudget = snapshot.val().budget;
      self.setState({monthOfBudget:accountBudget})
    });

  };

  getUserData = (account, date )=>{
    let getDataRef = firebase.database().ref(`/expense/${account}` );
    let self =this;
    getDataRef.once('value').then( (snapshot) => {
      let items = [];
      if(!!account && snapshot.val() == null)
        return self.setState({allItems:items, todayItems: [], date:date, loading: false});
      if(!account &&_isUndefined(snapshot.val()[account])) return;
      snapshot.forEach(element => {
        items.unshift(element.val());
      });

      if(items.length === 1  && items[0].budget){
        self.setState({loading: false});
        return;
      }
      let todayItems = items.filter(function(item){
           return  item.date.includes(date);
      });
      if(this.state.loading === true){
        self.setState({allItems:items, todayItems: todayItems.reverse(), date:date, loading: false});
      }else
      self.setState({allItems:items, todayItems: todayItems.reverse(), date:date});
    });
    this.getUserBudget(account);
  };

  updateItem = date => {
    const {account} = this.state;
    this.getUserData(account, date);
  };

  deleteItem = (timestamp) => {
    const {date, account} = this.state;
    let delRef = firebase.database().ref(`/expense/${account}` );
    delRef.child(`${timestamp}`).remove().then(function () {
      eventEmitter.dispatch('itemDelete', date.toString());
      console.log("刪除成功");
    }).catch(function (err) {
      console.error("刪除錯誤：", err);
    });
    this.getUserData(account, date);
  };

  setBudget = (budgetValue) => {
    const {account} = this.state;
    let setBudgetRef = firebase.database().ref(`/account/` );
    setBudgetRef.child(account).update({budget:budgetValue}).then(function () {
      console.log("預算設定成功");
    }).catch(function (err) {
      console.error("預算設定錯誤：", err);
    });
    this.setState({monthOfBudget: budgetValue});
  };

  changePage = status => {
    eventEmitter.dispatch('changePage', [status.toString()]);
    this.setState({route: status});
  }

  itemCallback = (date) => {
    this.setState({date: date, datePickerDate:date});
    this.updateItem(date);
  };

  showDetailOfMonth = (dateAndMonth) =>{
    const {allItems} = this.state;
    // const dateYearAndMonth = y +'-'+ utils.toDualDigit(m);
    const days =utils.days(dateAndMonth.slice(0,4),dateAndMonth.slice(6,8));
    let array = {};
    for (let d = 1; d <= days; d++) {
      let dateOfTheMonth = dateAndMonth + '-' + utils.toDualDigit(d);
      let filterMonthItem = allItems.filter(function (item) {
        return item.date.includes(dateOfTheMonth);
      });
      if (filterMonthItem.length !== 0) {
        array[d] = (filterMonthItem);
      }
    }
    eventEmitter.dispatch('detailOfMonth', dateAndMonth.toString());
    this.setState({route: 'detailOfMonth', monthItems:array, annualMonth: dateAndMonth});
  };

  login = (account) => this.setState({account: account, route:'record'});
// file download
//   download = () => {
//     //檔名
//     var filename = 'Account.xlsx';
//     //表名
//     var sheetname = new Date().getFullYear().toString()+'Account';
//     //測試資料
//
//     var data = [
//       ['date', 'item', 'value'],
//       ['abc', 1, new Date().toLocaleString()],
//       ['def', 123.456, new Date('2015-03-25T13:30:12Z')],
//     ];
//     //下載
//     this.downloadXlsx(filename, sheetname, data);
//   };
//   downloadXlsx = (filename, sheetname, data) => {
//
//     //說明
//     //所使用函式可參考js-xlsx的GitHub文件[https://github.com/SheetJS/js-xlsx]
//
//     //write
//     var wb = new Workbook();
//     var ws = this.sheet_from_array_of_arrays(data);
//     wb.SheetNames.pop();
//     wb.SheetNames.push(sheetname);
//     wb.Sheets[sheetname] = ws;
//     var wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
//
//     //saveAs
//     saveAs(new Blob([this.s2ab(wbout)], {type: "application/octet-stream"}), filename)
//   }
// //datenum
//   datenum = (v, date1904) => {
//     if (date1904) v += 1462;
//     var epoch = Date.parse(v);
//     return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
//   }
//
//
//   //sheet_from_array_of_arrays
//   sheet_from_array_of_arrays = (data, opts) => {
//     var ws = {};
//     var range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}};
//     for (var R = 0; R != data.length; ++R) {
//       for (var C = 0; C != data[R].length; ++C) {
//         if (range.s.r > R) range.s.r = R;
//         if (range.s.c > C) range.s.c = C;
//         if (range.e.r < R) range.e.r = R;
//         if (range.e.c < C) range.e.c = C;
//         var cell = {v: data[R][C]};
//         if (cell.v == null) continue;
//         var cell_ref = XLSX.utils.encode_cell({c: C, r: R});
//
//         if (typeof cell.v === 'number') cell.t = 'n';
//         else if (typeof cell.v === 'boolean') cell.t = 'b';
//         else if (cell.v instanceof Date) {
//           cell.t = 'n';
//           cell.z = XLSX.SSF._table[14];
//           cell.v = this.datenum(cell.v);
//         } else cell.t = 's';
//
//         ws[cell_ref] = cell;
//       }
//     }
//     if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
//     return ws;
//   };
//
//
//   //s2ab
//   s2ab = (s) => {
//     var buf = new ArrayBuffer(s.length);
//     var view = new Uint8Array(buf);
//     for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
//     return buf;
//   };

  render() {
    const { monthOfBudget, route, annualMonth, date, allItems, todayItems, account,year,month, loading, datePickerDate} = this.state;

    return (
      <div className="App" style={{
        height: window.innerHeight - '4px',
        margin: '0 auto',
        fontFamily: 'cursive'
      }}>
        {route !=='login' && loading === true &&<div style={{    position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          display: 'block',
          zIndex: 7,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'}}><img  style={{display:'flex',
          width: '120px',
          height: '120px',
          position: 'relative',
          margin: '0px auto',
          backgroundSize: '100%',
          top: 'calc(50% - 50px)'
        }} src={require('./assets/img/loading.gif')}/></div>}
        <div>{route ==='login' && <LogIn eventEmitter={eventEmitter} loginCallback={this.login}/>}</div>
        <header  style={{height: window.innerHeight}} className="App-header">
          <div style={{
            width: '100%',
            margin: '0 auto',
            backgroundColor: 'whitesmoke',
            borderRadius: '5px',
          }}>
            {<Header logOut={this.logOut} route={route} changePage={this.changePage} />}
            {route === 'chart' &&
            <DailyExpense eventEmitter={eventEmitter} items={allItems}  itemCallback={this.itemCallback}  month={month} monthItems={this.state.monthItems} datePickerDate={datePickerDate}/>}
            {route === 'record' &&
            <InputContent eventEmitter={eventEmitter} items={allItems} monthOfBudget={monthOfBudget} account={account} setBudgetCallback={this.setBudget}  updateItemCallback={this.updateItem} dateTime={date}
            itemCallback={this.itemCallback} datePickerDate={datePickerDate}/>}
            {route === 'record'  &&
            <Content items={todayItems} updateItemCallback={this.updateItem}deleteCallback={this.deleteItem} dateTime={date} account={account}/>}
            {route === 'total'  && <TotalExpense items={allItems} detailOfMonth={this.showDetailOfMonth}/>}
            {route === 'detailOfMonth'  && <DetailMonth items={allItems} year={year} month={month} deleteCallback={this.deleteItem}  annualMonth={annualMonth} updateShowDetailOfMonth={this.showDetailOfMonth} />}
            {/*<button onClick={() => this.download()}>Download</button>*/}
            <Powered/>
          </div>
        </header>
      </div>
    )
  }
}