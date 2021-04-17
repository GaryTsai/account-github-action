import React, {Component} from 'react';
import accountList from './account'
import styles from "./styles";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
import "firebase/database";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import Radium from "radium";

const initialState = {
  isAddOpen: false,
  newAccount: '',
  accountList: []
};
class accountTable extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const {account} = this.props;
    const self = this;
    let accountList = [];
    let getAccountCategory = firebase.database().ref(`account/${account}`);
    getAccountCategory.once('value').then((snapshot) => {
      if(!snapshot.val()){
        return;
      }
      let accountList = snapshot.val().accountCategory;
      self.setState({accountList:accountList})
    });

  }

  openAddModel = () =>{
    this.setState({isAddOpen: true})
  };

  closeAddModel = () =>{
    this.setState({isAddOpen: false})
  };

  inputAccount = account =>{
    this.setState({newAccount: account})
  };

  submitNewAccount = () =>{
    const {account} = this.props;
    const {accountList} = this.state;
    accountList.push(this.state.newAccount);
    console.log(accountList);
    let setAccountCategory = firebase.database().ref(`account/${account}`);
    setAccountCategory.update({accountCategory: accountList});
    this.setState({newAccount: '', isAddOpen: false})
  };

  deleteAccount = (acc, e) => {
    const {account} = this.props;
    const {accountList} = this.state;
    let index = accountList.indexOf(acc);
    if(index != -1){
      accountList.splice(index,1);
    }
    let setAccountCategory = firebase.database().ref(`account/${account}`);
    setAccountCategory.update({accountCategory: accountList});
    this.setState({accountList: accountList})
    e.preventDefault();
  };

  render() {
    const {isAddOpen, accountList} = this.state
    const {closeCallback, selectCallback} = this.props;
    return (
      <div style={{
        position: 'absolute',
        display: 'inline-flex',
        height:  window.screen.width <= 500 ? 'calc(100% - 291px)' : 'calc(100% - 295px)',
        width: 'calc(100% - 4px)',
        zIndex: 7,
        bottom: '2px',
        backgroundColor: 'rgb(234 233 233)',
        maxWidth: '716px',
        padding: '1% 2% 3% 2%',
        boxSizing: 'border-box',
        webkitScrollbar: {
        display: 'none'
      }
      }}>
        {!isAddOpen && <div style={{overflow: 'overlay',    webkitScrollbar:{
            display: 'none'
          }, width: '100%', textAlign: 'center'}}>
        {Object.keys(accountList).map((c) =>
            <div key={'accountFrame' + c}
              style={{...styles.selectAccount}}
            >
              <p style={{cursor: 'pointer', position: 'relative', margin: '5px 0px', width: '80%'}} onClick={()=>selectCallback(accountList[c])}>{accountList[c]}</p>
              <div key={'accountDelete' + c} style={styles.delete} onClick={(e) => this.deleteAccount(accountList[c], e)}/>
            </div>
        )}
          <div key={'new-acccount'}
               style={{...styles.selectAccount, border: 'none'}}
               onClick={this.openAddModel}
          >
            <p style={{position: 'relative', margin: '5px 0px'}}>+ 新增帳戶</p>
          </div>
        </div>}
        {isAddOpen &&<div style={{display: 'inline-flex', width: '100%'}}>
          <div style={styles.back} onClick={this.closeAddModel}/>
          <div style={styles.newAccountFrame}>
          <div style={{width: '30%', display: 'inline-flex'}}><label style={styles.newAccountTitle}>新增帳戶名稱:</label></div>
          <input type="text" style={styles.inputAccountFrame} value={this.state.newAccount}
                 onChange={(c) => this.inputAccount(c.target.value)}/>
          <button key={'new-acccount-button'}style={{...styles.addAccount}} onClick={this.submitNewAccount}>新增</button>
        </div>
        </div>}
        <div style={{...styles.closeBtn}} onClick={()=> closeCallback()}>close</div>
      </div>)
  }
}

export default Radium(accountTable)