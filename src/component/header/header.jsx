import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'
import styles from "./styles";
const initialState = {
  currentTime: '',
};

export default class InputContent extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  setCurrentTime = () => window.setInterval((() => this.setState({currentTime: new Date().toLocaleTimeString()})));

  componentDidMount() {
    this.setCurrentTime();
  }

  getImage = route =>{

    switch (route) {
      case 'record':
        return <Route path='/'><div>
            <Link to='/account/total'><img style={styles.costImg} alt="" onClick={()=>this.props.changePage('total')}  src={require('../../assets/img/cost-list.png')}/></Link>
            <Link to='/account/chart'><img style={{...styles.chartImg, zIndex: 5}} alt="" onClick={()=>this.props.changePage('chart')} src={require('../../assets/img/chart.png')}/></Link>
            </div></Route>;
      case 'total':
        return <Route path='/'><div>
            <Link to='/account/'><img style={styles.costImg} alt="" onClick={()=>this.props.changePage('record')} src={require('../../assets/img/record.png')}/></Link>
          </div></Route>;
      case 'detailOfMonth':
        return <Route path='/'><div>
            <Link to='/account/total'><img style={styles.costImg} alt="" onClick={()=>this.props.changePage('total')}  src={require('../../assets/img/cost-list.png')}/></Link>
            <Link to='/account/'><img style={{...styles.recordImg, zIndex: 5}} alt="" onClick={()=>this.props.changePage('record')} src={require('../../assets/img/record.png')}/></Link>
          </div></Route>;
      case 'chart':
        return <Route path='/'><div>
            <Link to='/account/total'><img style={styles.costImg} alt="" onClick={()=>this.props.changePage('total')}  src={require('../../assets/img/cost-list.png')}/></Link>
            <Link to='/account/'><img style={{...styles.recordImg, zIndex: 5}} alt="" onClick={()=>this.props.changePage('record')} src={require('../../assets/img/record.png')}/></Link>
          </div></Route>;
      default:
        return
    }
  };

  render() {
    const {currentTime} = this.state;
    const {route} = this.props;

    return (
      <div>
        <div style={styles.header}>
          {<div style={{position: 'relative'}}>
            {this.getImage(route)}
            {<div style={{position: 'relative'}}><Route path='/'><Link to='/account/login'><img style={{...styles.logoutImg, right:'0px'}} alt="" onClick={()=>this.props.logOut()} src={require('../../assets/img/logout.png')}/></Link></Route>
            </div>}
          </div>}
          <div style={styles.ctime}>現在時間: {currentTime}</div>
        </div>
      </div>
    )
  }
}
