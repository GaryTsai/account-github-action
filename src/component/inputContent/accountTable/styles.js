export default {
  closeBtn: {
  position: 'absolute',
  bottom: '0px',
  width: '96%',
  textAlign: 'center',
  backgroundColor:'rgb(249 137 129)',
  padding: '2%',
  left: 0,
   cursor: 'pointer',
    ':hover':{
      backgroundColor: 'rgb(236 57 44)',
      boxShadow: 'inset 0px 1px 0px rgba(0, 0, 0, 0.1)'
    }
  },
  selectAccount:{
    backgroundColor: 'white',
    margin: '8px',
    padding: '5px',
    display: 'inline-flex',
    textAlign: 'center',
    borderRadius: '15px',
    border: '2px solid #4376ff',
    justifyContent: 'center',
    width: '40%'
  },
  newAccountTitle: {
    color: '#4376ff',
    textAlign: 'center',
    whiteSpace:'nowrap'
  },
  inputAccountFrame: {
    height: '30px',
    padding: '6px 4px',
    backgroundColor: '#fff',
    border: '1px solid #D1D1D1',
    borderRadius: '4px',
    boxShadow: 'none',
    boxSizing: 'border-box',
    width: '50%',
    fontSize: '14px',
    margin: '5px'
  },
  addAccount: {
    height: '30px',
    width: '15%',
    background: '#ffcc5b',
    borderRadius: '15px',
    border: '0 none',
    cursor: 'pointer',
    fontSize: '14px',
    margin: '0 auto',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease 0s',
    whiteSpace: 'nowrap',
    outline: 'none',
    ':hover':{
      background:'#FFA500'
    }
  },
  newAccountFrame: {
    width: '100%',
    background: 'white',
    height: '10%',
    borderRadius: '15px',
    padding: '5px',
    display: 'inline-flex',
    alignItems: 'center',
    border: '2px solid #c9c9ec'
  },
  back: {
    cursor: 'pointer',
    width: '50px',
    height: '10vw',
    padding: '5px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(' + require('./../../../assets/img/back.png') + ')',
    backgroundSize: '50px 50px'
  },
  delete: {
    cursor: 'pointer',
    width: '20%',
    margin: '5px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(' + require('./../../../assets/img/delete-account.png') + ')',
    backgroundSize: '15px',
    backgroundPosition: 'center',
    ':hover':{
      transform: 'scale(1.5)'
    }
  }
}
