export default {
  selectTime: {
    // background:'#ffffff',
    cursor:'pointer',
    ':hover':{
      opacity: 0.8,
      backgroundColor: '#a0c5ec'
    }
  },
  activeChart: {
    boxShadow:' 0px 8px 15px rgb(0 0 0 / 20%)',
    cursor:'pointer',
    width:'50%',
    border: '2px solid black',
    backgroundColor: 'cornflowerblue',
    padding: '5px'
  },
  chart: {
    cursor: 'pointer',
    width: '50%',
    backgroundColor: 'white',
    padding: '5px',
    zIndex: 0,
    ':hover': {
      opacity: 0.8,
      backgroundColor: '#d5d4ec'
    },
  },
  snapShotButton: {
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ec3718',
    color: 'white',
    borderRadius: '15px',
    border: '2px solid #a00404',
    margin: '5px',
    float: 'left',
    outline: 'none',
    cursor: 'pointer'
  }
}
