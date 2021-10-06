import React, {Component} from 'react';

const initialState = {
  year: 0
};
export default class Powered extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  getCurrentYear = () => new Date().getFullYear();

  componentDidMount() {
    this.setState({year: this.getCurrentYear()});
  }

  render() {
    const {year} = this.state;

    return (
      <div style={{
        bottom: '0px',
        position: 'inherit',
        width: '100%',
      }}>
        <div style={{
          width: 'calc(100% - 4px)',
          maxWidth: '717px',
          backgroundColor: 'white',
          background: '#ff7600',
          color: 'white',
          bottom: '1px',
          fontSize: '12px',
          textAlign: 'center',
          position: 'fixed',
          padding: '1.5vh 0%',
          borderBottom: '2px solid rgb(0, 185, 156)'
        }}>Copyright© {year} Gary
          Tsai
        </div>
      </div>
    )
  }
}
