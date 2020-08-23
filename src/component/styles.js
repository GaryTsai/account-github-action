export default {
  container: {
    width: '100vw',
    height: '100vh'
  },
  header: {
    width: '100%',
    height: '44px',
    backgroundColor: '#1E90FF',
    top: '0px',
    left: '0px',
    background: 'linear-gradient(to bottom right,white,rgb(100, 178, 255))'
},
  costImg: {
    width: '38px',
    height: '38px',
    position: 'absolute',
    top: '0px',
    left: '0px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '1%',
    margin: '3px auto',
    cursor: 'pointer',
    zIndex: 5
  },
  ctime: {
    height: '100%',
    position: 'relative',
    top: '0px',
    right: '0px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '1%',
    fontSize: '18px',
    color: 'black'
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
    backgroundColor: 'rgb(240, 193, 193)',
    boxSizing: 'border-box',
    padding: '0% 1%',
    borderBottom: '1px solid black'
  },
}
