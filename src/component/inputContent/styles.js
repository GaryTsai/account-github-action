import React from "react";

export default {
  inputContainer: {
    height: '40px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'black',
    fontSize: '14px',
    borderTop: 'solid 1px black',
    backgroundColor: 'white',
    boxSizing: 'border-box'
  },
  inputLabel: {
    color: 'black',
    fontSize: '16px',
  },
  selectFrame: {
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    backgroundColor: '#F6F7F7',
    borderRadius: '5px',
    ':hover':{
      color: '#fff',
      background: 'rgba(146, 168, 209, 0.5)',
      boxShadow: 'inset 0px 1px 0px rgba(0, 0, 0, 0.1)'
    }
  },
  inputFrame: {
    height: '30px',
    padding: '6px 10px',
    backgroundColor: '#fff',
    border: '1px solid #D1D1D1',
    borderRadius: '4px',
    boxShadow: 'none',
    boxSizing: 'border-box',
    width: '100%'
  },
  submit: {
    height: '30px',
    width: '20%',
    background: '#ffcc5b',
    border: '0 none',
    cursor: 'pointer',
    fontSize: '14px',
    borderRadius: '10px',
    margin: '1px',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease 0s',
    outline: 'none',
    ':hover':{
      background:'#FFA500'
    }
  },
  register:{
    padding: '4px 50px',
    background: 'white',
    color:'white',
    cursor: 'pointer',
    outline: 'none',
    borderBottom: '2px solid #009688',
  },
  login:{
    padding: '4px 50px',
    background: 'white',
    borderStyle: 'black',
    borderBottom: '2px solid #009688',
    color:'white',
    cursor: 'pointer',
    outline: 'none',
},
  forgetPWD:{
    padding: '4px 50px',
    background: 'white',
    borderStyle: 'black',
    border: 'none',
    color:'white',
    cursor: 'pointer',
    outline: 'none',
    borderBottom: '2px solid #ff730e',
  },
  error: {
    backgroundColor: 'white',
    color: 'red',
    fontSize: '16px',
    position: 'relative',
    padding: '3% 0%',
    top: '0%',
    width: '100%',
    display: 'flex',
    marginTop: '20%',
    borderRadius: '10px',
    boxSizing: 'border-box',
    border: '3px solid red',
    fontFamily: 'sans-serif',
    justifyContent: 'center'
  },
  inputAccount: {
    color: 'black',
    textAlign: 'center',
    margin:'5% 11%',
    transform: 'scale(1.05)',
  },
  inputPassword: {
    color: 'black',
    textAlign: 'center',
    margin:'5% 11%',
    fontSize: '15px',
    transform: 'scale(1.05)',
  },
  loginModal:{
    textAlign: 'center',
    position: 'relative',
    top: '10%',
    height: '100%'
  },
  loginSubmit:{
    padding: '6px 50px',
    borderRadius: '10px',
    background: '#ffffff',
    borderStyle: 'black',
    color:'#000000',
    cursor: 'pointer',
    outline: 'none',
    border: '2px solid rgb(0, 162, 87)'
  },
  inputTitle: {
    color: '#4376ff',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center'
  },
  inputBudget: {
    height: '40px',
    position: 'relative',
    top: '0px',
    left: '0px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '1%',
    fontSize: '14px',
    backgroundColor: 'white',
    borderTop: '1px solid black'
  },
  styleOfInput: {
    width:'30%',
    borderRadius: '5px',
    border: 'solid 1px #87CEFA',
    height: '20px',
    fontSize: '16px'
  },
  span: {
    color: 'black'
  },
  mainExpense: {
    width: '100%',
    height: '80px',
    borderTop: 'solid 1px black',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
    fontSize: '14px',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
    padding: ' 0% 1%'
  },
  secondExpense: {
    width: '100%',
    height: '80px',
    borderTop: 'solid 1px black',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    fontSize: '14px',
    backgroundColor: 'rgb(255, 255, 255)',
    boxSizing: 'border-box',
    padding: ' 0% 1%'
},
  expenseCircle: {

  },
  expenseOfStyle: {
    width: '33%',
    textAlign:'center',
    alignItems:'center',
    fontSize: '16px',
    color: '#000000'
  },
  remaining: {
    display: 'block',
    fontSize: '20px',
    color:'rgb(33 208 83)'
  },
  expense: {
    display: 'block',
    fontSize: '20px',
    color:'#FF2416'
  },
  unit: {
    color: '#000000',
    fontSize:'14px'
  },
  time: {
    height: '20px',
    position: 'relative',
    top: '0px',
    left: '0px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '1%',
    fontSize: '14px',
    backgroundColor: 'white',
    color:'#886060',
    fontWeight: 'bold',
    border: '2px solid',
    borderRadius: '10px',
    padding: '5px',
    cursor: 'pointer',
    ':hover':{
      opacity: 0.5,
      boxShadow: 'inset 0px 1px 0px rgba(0, 0, 0, 0.1)'
    }
  },
  styleOfSelectCategory:{
    display: 'flex',
    justifyContent: 'center',
    height: '26px',
    alignItems: 'center',
    background: '#ffffff',
    cursor: 'pointer',
    fontSize: '14px',
    borderRadius: '10px',
    margin: '5px',
    boxShadow: 'rgb(0 0 0 / 20%) 0px 8px 15px',
    transition: 'all 0.3s ease 0s',
    outline: 'none',
    border: '2px solid rgb(0, 150, 136)'
  },
  icon:{
    height:'16px',
    width:'16px'
  },
  logo:{
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    height: '26%',
    width: '80%',
    margin: '0px auto'
  }
}
