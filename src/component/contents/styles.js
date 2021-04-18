export default {
  items: {
    width: '100%',
    alignItems: 'center',
    color: 'black',

  },
  account:{
    fontSize: '12px',
    color: 'rgba(0,75,169,0.56)',
    margin: '0px',
    display: 'inline-block'
  },
  item: {
    width: '100%',
    height:'45px',
    backgroundColor: 'white',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: 'solid 1px black',
    fontSize: '16px',
    boxSizing: 'border-box',
    padding: ' 0% 1%'
  },
  deleteIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
    height: '30px',
    width: '30px',
    cursor: 'pointer',
    ':hover':{
      transform: 'scale(1.1)'
    }
  },
  editIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
    height: '30px',
    width: '30px',
    cursor: 'pointer',
    ':hover':{
      transform: 'scale(1.1)'
    }
  },
  editTitle: {
    color: 'black',
    fontSize: '14px',
    textAlign: 'center'
  },
  editFinish: {
    height: '30px',
    width: '15%',
    background: '#5dff8d',
    border: '0 none',
    cursor: 'pointer',
    fontSize: '14px',
    borderRadius: '10px',
    margin: '5px',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease 0s',
    outline: 'none',
    whiteSpace: 'nowrap',
    ':hover':{
      background: '#4CAF50',
    }
  },
  inputFrame: {
    height: '20px',
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    border: '1px solid rgb(135, 206, 250)',
    borderRadius: '5px'
  },
  inputTitle: {
    color: '#4376ff',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center'
  },
  span: {color: 'black'},
  styleOfYearMonth:{
    width:'100%',
    height:'44px',
    display: 'flex',
    color: 'black',
    fontSize: '18px',
    alignItems: 'center',
    backgroundColor: 'rgb(240, 193, 193)',
    boxSizing: 'border-box',
    padding: '0% 1%',
  },
  styleOfDate: {
    width:'100%',
    height:'22px',
    display: 'flex',
    color: 'black',
    fontSize: '18px',
    alignItems: 'center',
    backgroundColor: 'rgb(135, 223, 194)',
    boxSizing: 'border-box',
    padding: '0% 1%',
    justifyContent: 'center'
  },
  styleOfItem: {
    width:'100%',
    height:'44px',
    display: 'flex',
    color: 'black',
    fontSize: '18px',
    alignItems: 'center',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    padding: '0% 1%',
    borderBottom: '1px solid gray',
    justifyContent: 'space-between'
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
    border: '2px solid rgb(0, 150, 136)',
    whiteSpace: 'nowrap'
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
}
