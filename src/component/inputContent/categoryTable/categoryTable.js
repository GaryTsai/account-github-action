import React, {Component} from 'react';
import category from './classWithImageResources'
import styles from "./styles";
import Radium from "radium";
const initialState = {
};
class categoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
  }

  render() {
    const {closeCallback, selectCallback} = this.props;
    return (
      <div style={{
        position: 'absolute',
        display: 'inline-flex',
        height:  'calc(100% - 286px)',
        width: 'calc(100% - 4px)',
        zIndex: 7,
        bottom: '2px',
        backgroundColor: 'rgb(234 233 233)',
        maxWidth: '716px',
        padding: '1% 2% 3% 2%',
        boxSizing: 'border-box',
        webkitScrollbar: {
        display: 'none'
      }
      }}>
        <div style={{overflow: 'overlay',    webkitScrollbar:{
            display: 'none'
          }, height: 'calc(100% - 40px)'}}>
        {Object.keys(category).map((c) =>
            <div key={'categoryFrame' + c}
              style={{
              backgroundColor: 'white',
              margin: '8px',
              padding: '5px',
              display: 'inline-block',
              textAlign: 'center',
              borderRadius: '20px',
              cursor: 'pointer',
                ...styles.selectCategory
              }}
              onClick={()=>selectCallback(category[c].className)}
            >
              <div key={'category' + c}
                 style={{
                   backgroundSize: '100%',
                   width: '35px',
                   height: '35px',
                   backgroundRepeat: 'no-repeat',
                   zIndex: '5',
                   margin: '5px 10px',
                   backgroundImage: 'url(' + require('./../../../assets/img/'+category[c].resource) + ')'
                 }}
            />
              <p style={{position: 'relative', margin: '5px 0px'}}>{category[c].className}</p>
            </div>
        )}
        </div>
        <div style={{...styles.closeBtn}} onClick={()=> closeCallback()}>close</div>
      </div>)
  }
}

export default Radium(categoryTable)