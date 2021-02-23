import React, {Component} from 'react';
import styles from "./inputContent/styles";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
import "firebase/database";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import Gtag from './../eventTracking/Gtag';
const tracker = new Gtag();
const initialState = {
  account:'',
  password:'',
  error:false,
  message:'',
  loginStatus: true,
  exist: false
};
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
  }

  inputAccount = (account) => this.setState({account: account});

  inputPassword = (password) => this.setState({password: password});

  loginCheck = (account,pwd) =>{
    const {loginCallback, eventEmitter} = this.props;
    if(!account&&!pwd ){
      this.setState({error:true, message:'Please input account&password'});
      return ;
    }
    let checkLogin = firebase.database().ref(`/account/${account}`);
    checkLogin.once('value').then((snapshot) => {
      if(snapshot.val()== null){
        this.setState({error:true, message:'account error'})
        return ;
      }
      if(pwd.toString() !== snapshot.val().password.toString()){
        this.setState({error:true, message:'password error'})
        return ;
      }
      localStorage.setItem('account', account);
      eventEmitter.dispatch('accountLogIn',  account.toString());
      loginCallback && loginCallback(account);
    });
  };

  register = (account,pwd) =>{
    const {loginCallback, eventEmitter} = this.props;
    //check if account is exist
    let checkLogin = firebase.database().ref(`/account/${account}`);
    checkLogin.once('value').then((snapshot) => {
      //register success
      if(snapshot.val() == null){
        let register = firebase.database().ref(`/account/`);
        register.child(account).set({password:pwd}).then(()=>{
          console.log('register successfully');
        }).catch(function (err) {
          console.error("register error", err);
        });
        localStorage.setItem('account', account);
        eventEmitter.dispatch('accountRegister',  account.toString());
        loginCallback && loginCallback(account);
        //account is exist
      }else if(snapshot.val().password !== ""){
        this.setState({exist: true, error:true, message:'account is exist'});
        return ;
      }
    });
  };

  loginSelect = (status) => this.setState({loginStatus:status});

  render() {
    const {error, message, loginStatus} = this.state;
    return (
      <div style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: 'block',
        zIndex: 7,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
        <div style={{width:'25%',height:"210px",background:'white',margin:'35vh auto', zIndex:5,
          opacity:'1', minWidth:'349px',borderRadius:' 20px',boxShadow: '0 0 1em #484848',
          border: '1px black bold'
        }}>
          <div style={styles.loginModal}>
            <button type="submit" id="item-submit"  style={{...styles.login, boxShadow: loginStatus ? '0 0 15px 0px #0094ff' : 'none' , color: loginStatus ? 'white' : 'black' , backgroundColor: loginStatus ? '#0094ff' : '#d5d5d5' }} onClick={() => this.loginSelect(true)}>登入
            </button>
            <button type="submit" id="item-submit" style={{...styles.register, boxShadow: loginStatus ? 'none' : '0 0 15px 0px #0094ff' ,color: loginStatus ? 'black' : 'white' , backgroundColor: loginStatus ? '#d5d5d5' : '#0094ff' }} onClick={() => this.loginSelect(false)}>註冊
            </button>
          <div style={styles.inputAccount}>
          <label>帳號: </label>
          <input type="text" value={this.state.account}
                 onChange={(c) => this.inputAccount(c.target.value)}/>
          </div>
          <div style={styles.inputPassword}>
          <label>密碼: </label>
          <input type="text" value={this.state.password}
                 onChange={(c) => this.inputPassword(c.target.value)}/>
          </div>
            <button type="submit" id="item-submit" style={{...styles.loginSubmit}} onClick={() => loginStatus ? this.loginCheck(this.state.account,this.state.password) : this.register(this.state.account,this.state.password) }>確定
            </button>
            {error && <div style={styles.error}>{message}</div>}
          </div>
        </div>
      </div>
    )
  }
}
