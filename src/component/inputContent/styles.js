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
    boxSizing: 'border-box',
    padding: ' 0% 0%  0% 1%'
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
    height: '20px',
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    border: '1px solid rgb(135, 206, 250)',
    borderRadius: '5px'
  },
  submit: {
    height: '30px',
    width: '20%',
    background: '#ffcc5b',
    border: '0 none',
    cursor: 'pointer',
    fontSize: '14px',
    borderRadius: '10px',
    margin: '10px',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease 0s',
    outline: 'none',
    ':hover':{
      background:'#FFA500'
    }
  },
  register:{
    padding: '8px 50px',
    borderRadius: '0 10px 10px 0',
    background: 'white',
    border: 'none',
    color:'white',
    cursor: 'pointer',
    outline: 'none'
  },
  login:{
    padding: '8px 50px',
    borderRadius: '10px 0 0 10px',
    background: 'white',
    borderStyle: 'black',
    border: 'none',
    color:'white',
    cursor: 'pointer',
    outline: 'none'
},
  error: {
    color: 'red',
    fontSize: '16px',
    paddingTop:'10px'
  },
  inputAccount: {
    color: 'black',
    textAlign: 'center',
    margin:'5%',
    fontSize: '15px',
    transform: 'scale(1.22)'
  },
  inputPassword: {
    color: 'black',
    textAlign: 'center',
    margin:'5%',
    fontSize: '15px',
    transform: 'scale(1.22)'
  },
  loginModal:{
    textAlign: 'center',
    position: 'relative',
    paddingTop: '10%'
  },
  loginSubmit:{
    padding: '8px 50px',
    borderRadius: '10px',
    background: '#00a257',
    borderStyle: 'black',
    border: 'none',
    color:'white',
    cursor: 'pointer',
    outline: 'none'
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
    backgroundColor: 'white'
  },
  styleOfInput: {
    width:'30%',
    borderRadius: '5px',
    border: 'solid 1px #87CEFA',
    height: '20px',
    fontSize: '16px'
  },
  span: {color: 'black'},
  mainExpense: {
    width: '100%',
    height: '80px',
    borderTop: 'solid 1px black',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    fontSize: '14px',
    backgroundColor: '#ff484d',
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
    backgroundColor: '#6cabff',
    boxSizing: 'border-box',
    padding: ' 0% 1%'
},
  expenseCircle: {

  },
  expenseOfStyle: {
    width: '33%',
    textAlign:'center',
    alignItems:'center',
    fontSize: '16px'
  },
  expense: {
    display: 'block',
    fontSize: '20px'
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

}
