import React, { Component } from "react";
import styles from "./inputContent/styles";
import { Route, Link } from "react-router-dom";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
import "firebase/database";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const initialState = {
  account: "",
  password: "",
  error: false,
  message: "",
  loginStatus: "login",
  exist: false,
  email: "",
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentWillUnmount() {
    window.document.removeEventListener(
      "keydown",
      function (e) {
        if (e.keyCode === 13)
          this.loginSubmitWithKeydown(this.state.loginStatus);
      }.bind(this)
    );
  }

  componentDidMount() {
    window.document.addEventListener(
      "keydown",
      function (e) {
        if (e.keyCode === 13)
          this.loginSubmitWithKeydown(this.state.loginStatus);
      }.bind(this)
    );
  }

  loginSubmitWithKeydown = () => this.getStatusMethod(this.state.loginStatus);

  inputAccount = (account) => this.setState({ account: account });

  inputPassword = (password) => this.setState({ password: password });

  inputEmail = (email) => this.setState({ email: email });

  loginCheck = (account, pwd) => {
    const { loginCallback, eventEmitter } = this.props;
    if (!account && !pwd) {
      this.setState({ error: true, message: "Please input email&password" });
      setTimeout(() => this.setState({ error: false, message: "" }), 5000);
      return;
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(account, pwd)
      .then(() => {
        var user = firebase.auth().currentUser;
        if (user) {
          localStorage.setItem("account", user.uid);
          eventEmitter.dispatch("accountLogIn", user.uid.toString());
          loginCallback && loginCallback(user.uid);
        }
      })
      .catch((error) => {
        this.setState({ error: true, message: error.message });
        setTimeout(() => this.setState({ error: false, message: "" }), 5000);
        return;
      });
  };

  register = (account, pwd) => {
    const { loginCallback, eventEmitter } = this.props;
    if (!account && !pwd) {
      this.setState({ error: true, message: "Please input email&password" });
      setTimeout(() => this.setState({ error: false, message: "" }), 5000);
      return;
    }
    let user = {
      email: account,
      pwd: pwd,
    };
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.pwd)
      .then((u) => {
        // 取得註冊當下的時間
        let date = new Date();
        let now = date.getTime();
        // 記錄相關資訊到 firebase realtime database
        firebase
          .database()
          .ref(`/account/${u.user.uid}`)
          .set({
            signup: now,
            email: user.email,
          })
          .then(() => {
            // 儲存成功後顯示訊息
            localStorage.setItem("account", account);
            eventEmitter.dispatch("accountRegister", account.toString());
            console.log("register successfully");
            loginCallback && loginCallback(u.user.uid);
          });
      })
      .catch((error) => {
        // 註冊失敗時顯示錯誤訊息
        this.setState({
          exist: true,
          error: true,
          message: error.message.toString(),
        });
        console.log("register failed");
        return;
      });
  };

  resetPassWordMail = (email) => {
    const auth = firebase.auth();
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        window.alert("已發送信件至信箱，請按照信件說明重設密碼");
        window.location.reload(); // 送信後，強制頁面重整一次
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  signInWithGoogleAccount = () => {
    const { loginCallback, eventEmitter } = this.props;
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        if (
          this.state.loginStatus === "register" &&
          !result.additionalUserInfo.isNewUser
        ) {
          this.setState({
            exist: true,
            error: true,
            message:
              "The Google email of account is exist, please" +
              " use other email",
          });
          setTimeout(() => this.setState({ error: false, message: "" }), 5000);
          return;
        }
        firebase
          .database()
          .ref(`/account/${result.user.uid}`)
          .set({
            signup: new Date().getTime(),
            email: result.user.email,
          })
          .then(() => {
            // 儲存成功後顯示訊息
            localStorage.setItem("account", result.user.uid);
            eventEmitter.dispatch(
              "accountRegister",
              result.user.uid.toString()
            );
            console.log("google email register successfully");
            loginCallback && loginCallback(result.user.uid);
          })
          .catch((err) => {
            // 註冊失敗時顯示錯誤訊息
            this.setState({
              exist: true,
              error: true,
              message: "account is exist",
            });
            console.log("register failed");
            return;
          });
      })
      .catch((error) => {
        this.setState({
          exist: true,
          error: true,
          message: error.message.toString(),
        });
        setTimeout(() => this.setState({ error: false, message: "" }), 5000);
      });
  };

  signInWithFaceBookAccount = () => {
    const { loginCallback, eventEmitter } = this.props;
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        if (
          this.state.loginStatus === "register" &&
          !result.additionalUserInfo.isNewUser
        ) {
          this.setState({
            exist: true,
            error: true,
            message:
              "The Facebook email of account is exist, please" +
              " use other email",
          });
          setTimeout(() => this.setState({ error: false, message: "" }), 5000);
          return;
        }
        if (result) {
          firebase
            .database()
            .ref(`/account/${result.user.uid}`)
            .set({
              signup: new Date().getTime(),
              email: result.user.email,
            })
            .then(() => {
              // 儲存成功後顯示訊息
              localStorage.setItem("account", result.user.uid);
              eventEmitter.dispatch(
                "accountRegister",
                result.user.uid.toString()
              );
              console.log("google email register successfully");
              loginCallback && loginCallback(result.user.uid);
            })
            .catch((err) => {
              // 註冊失敗時顯示錯誤訊息
              this.setState({
                exist: true,
                error: true,
                message: "account is exist",
              });
              console.log("register failed");
              return;
            });
        }
      })
      .catch((error) => {
        this.setState({
          exist: true,
          error: true,
          message: error.message.toString(),
        });
        setTimeout(() => this.setState({ error: false, message: "" }), 5000);
      });
  };

  loginSelect = (status) => this.setState({ loginStatus: status });

  getStatusMethod = (loginStatus) => {
    switch (loginStatus) {
      case "login":
        return this.loginCheck(this.state.account, this.state.password);
      case "register":
        return this.register(this.state.account, this.state.password);
      case "forgetPWD":
        return this.resetPassWordMail(this.state.email);
      default:
        return;
    }
  };

  render() {
    const { error, message, loginStatus } = this.state;
    return (
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          display: "block",
          zIndex: 7,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >   <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100%",
        height: "50px",
        background: "linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)",
        fontSize: "24px"
      }}>帳戶管理平台</div>
        <div
          style={{
            ...styles.loginFrame,
            height: "100%",
            width: "100%",
            background: "white",
            zIndex: 5,
            opacity: "1",
            minWidth: "349px",
            boxShadow: "0 0 1em #484848",
            fontFamily: "sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
          }}
        >
          <div style={styles.loginModal}>
            <div
              style={{
                ...styles.logo,
                backgroundImage:
                  "url(" + require("./../assets/img/logo.png") + ")",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                whiteSpace: "nowrap",
              }}
            >
              <div
                id="item-submit"
                style={{
                  ...styles.login,
                  color: loginStatus === "login" ? "white" : "black",
                  backgroundColor:
                    loginStatus === "login" ? "#009688" : "white",
                }}
                onClick={() => this.loginSelect("login")}
              >
                登入
              </div>
              <div
                id="item-submit"
                style={{
                  ...styles.register,
                  color: loginStatus === "register" ? "white" : "black",
                  backgroundColor:
                    loginStatus === "register" ? "#009688" : "white",
                }}
                onClick={() => this.loginSelect("register")}
              >
                註冊
              </div>
              <div
                id="item-submit"
                style={{
                  ...styles.forgetPWD,
                  color: loginStatus === "forgetPWD" ? "white" : "black",
                  backgroundColor:
                    loginStatus === "forgetPWD" ? "#ff730e" : "white",
                }}
                onClick={() => this.loginSelect("forgetPWD")}
              >
                忘記密碼
              </div>
            </div>
            {loginStatus !== "forgetPWD" && (
              <div>
                <div style={styles.inputAccount}>
                  <input
                    style={styles.inputFrame}
                    name={"email"}
                    type="text"
                    value={this.state.account}
                    placeholder="請輸入帳號(email)"
                    onChange={(c) => this.inputAccount(c.target.value)}
                  />
                </div>
                <div style={styles.inputPassword}>
                  <input
                    style={styles.inputFrame}
                    type="text"
                    value={this.state.password}
                    placeholder="請輸入密碼"
                    onChange={(c) => this.inputPassword(c.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  id="item-login-submit"
                  style={{ ...styles.loginSubmit }}
                  onClick={() => this.getStatusMethod(loginStatus)}
                >
                  確定
                </button>
              </div>
            )}
            {loginStatus === "forgetPWD" && (
              <div style={{ ...styles.inputAccount, lineHeight: "34px" }}>
                <div>請填入你的帳號(email): </div>
                <input
                  style={{ ...styles.inputFrame, marginBottom: "30px" }}
                  type="text"
                  value={this.state.email}
                  onChange={(c) => this.inputEmail(c.target.value)}
                />
                <button
                  type="submit"
                  id="item-login-submit"
                  style={{ ...styles.loginSubmit, border: "2px solid #ff730e" }}
                  onClick={() => this.getStatusMethod(loginStatus)}
                >
                  確定
                </button>
              </div>
            )}
            {loginStatus === "forgetPWD" && (
              <span
                style={{
                  display: "block",
                  fontWeight: "bold",
                  padding: "20px",
                }}
              >
                請至填入的mail信箱重設您的密碼
              </span>
            )}
            {loginStatus !== "forgetPWD" && (
              <div>
                <Link
                  to="/account-github-action/"
                  style={{ textDecoration: "none" }}
                >
                  <div className="OpenIdLoginModule">
                    <div
                      className="oauth-google-inner"
                      onClick={() => this.signInWithGoogleAccount()}
                    >
                      <img
                        alt={"google logo"}
                        style={styles.icon}
                        src={require("./../assets/img/GGL_logo_googleg_18.png")}
                      />
                      <div>
                        {loginStatus === "login"
                          ? "以 Google 登入"
                          : "以 Google 註冊並登入"}
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="OpenIdLoginModule">
                  <div
                    className="oauth-google-inner"
                    onClick={() => this.signInWithFaceBookAccount()}
                  >
                    <img
                      alt={"facebook logo"}
                      style={styles.icon}
                      src={require("./../assets/img/facebook-icon.png")}
                    />
                    <div>
                      {loginStatus === "login"
                        ? "以 FaceBook 登入"
                        : "以 FaceBook 註冊並登入"}
                    </div>
                  </div>
                </div>
                {loginStatus === "register" && (
                  <div className="tooltip">
                    <img
                      alt={"alert icon"}
                      style={styles.icon}
                      src={require("./../assets/img/alert-icon.png")}
                    />
                    <span className="tooltiptext">
                      Regardless of Faccebook or Google, the same email can only
                      be registered once
                    </span>
                  </div>
                )}
              </div>
            )}
            {error && <div style={styles.error}>{message}</div>}
          </div>
        </div>
      </div>
    );
  }
}
