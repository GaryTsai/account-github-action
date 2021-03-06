export default {
  container: {
    width: '100vw',
    height: '100vh'
  },
  styleOfYear:{
    width:'100%',
    height:'44px',
    display: 'flex',
    color: 'black',
    fontSize: '18px',
    alignItems: 'center',
    backgroundColor: 'rgb(255, 97, 97)',
    boxSizing: 'border-box',
    padding: '0% 1%',
    borderBottom: 'solid 3px #c53400'

},
  styleOfMonth:{
    width:'100%',
    height:'44px',
    display: 'flex',
    color: 'black',
    fontSize: '18px',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
    padding: '0% 1%',
    borderBottom: '1px solid black',
    cursor: 'pointer',
    ':hover':{
      backgroundColor: 'rgb(255 153 153)',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.6)'
    }
  },
}
