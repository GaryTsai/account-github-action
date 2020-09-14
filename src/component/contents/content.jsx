import React, {Component} from 'react';
import Radium from "radium";
import styles from "./styles";
import category from "../../settings/category";
import _isUndefined from 'lodash/isUndefined';
import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
import "firebase/database";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const initialState = {
  theItems: [],
  isEdit: '',
  editCategory: '',
  editValue: '',
  editContent: ''
};


class Content extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  itemDelete = (timestamp) => {
    const {deleteCallback} = this.props;
    deleteCallback && deleteCallback(timestamp);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.items !== this.state.theItems) {
      let initalIsEdit = [];
      let category = [];
      let content = [];
      let value = [];
      prevProps.items.map((item, idx) => {
        initalIsEdit[idx] = false;
        category[idx] = prevProps.items[idx].itemClass;
        content[idx] = prevProps.items[idx].itemValue;
        value[idx] = prevProps.items[idx].itemContent;
      });
      this.setState({
        theItems: prevProps.items,
        isEdit: initalIsEdit,
        editCategory: category,
        editValue: content,
        editContent: value
      })
    }
  }

  componentDidMount() {
    const {items} = this.props;
    let initalIsEdit = [];
    let category = [];
    let content = [];
    let value = [];

    items.map((item, idx) => {
      initalIsEdit[idx] = false;
      category[idx] = items[idx].itemClass;
      content[idx] = items[idx].itemValue;
      value[idx] = items[idx].itemContent;
    });
    this.setState({
      theItems: items,
      isEdit: initalIsEdit,
      editCategory: category,
      editValue: content,
      editContent: value
    })
  }

  isEdit = (idx) => {
    const {isEdit} = this.state;
    isEdit[idx] = !isEdit[idx];
    this.setState({isEdit: isEdit})
  }

  editFinish = (timestamp, idx) => {
    const {editCategory, editValue, editContent} = this.state;
    const {account, updateItemCallback, dateTime} = this.props;
    let setDate = firebase.database().ref(`expense/${account}/${timestamp}`);
    editContent[idx] = _isUndefined(editContent[idx]) ? '' : editContent[idx];
    setDate.update({itemClass: editCategory[idx], itemValue: editValue[idx], itemContent: editContent[idx]});
    updateItemCallback && updateItemCallback(dateTime);
    this.isEdit(idx);
  };
  editCategory = (category, idx) => {
    const {editCategory} = this.state;
    editCategory[idx] = category;
    this.setState({editCategory: editCategory});
  };
  editValue = (value, idx) => {
    const {editValue} = this.state;
    editValue[idx] = value;
    this.setState({editValue: editValue});
  };
  editContent = (content, idx) => {
    const {editContent} = this.state;
    editContent[idx] = content;
    this.setState({editContent: editContent});
  };

  render() {
    const {theItems, isEdit, editCategory, editValue, editContent} = this.state;
    return (
      <div style={{...styles.items, textAlign: 'left'}}>
        {theItems && theItems.map((c, idx) => (
          <div key={'itemShow' + idx}>
            {!isEdit[idx] && <li style={{...styles.item, listStyleType: 'none'}} key={'item' + idx}>
              <span>{c.itemClass}</span>
              <span>{c.itemValue}$NT</span>
              <span>備註:{c.itemContent}</span>
              <span><img onClick={() => this.isEdit(idx)} key={'content-edit' + idx} style={styles.editIcon}
                         alt="cost of item" src={require('../../assets/img/item-edit.png')}/></span>
              <span onClick={this.itemDelete.bind(this, c.timestamp)}><img key={'content-delete' + idx}
                                                                           style={styles.deleteIcon} alt="cost of item"
                                                                           src={require('../../assets/img/item-delete.png')}/></span>
            </li>}
            {isEdit[idx] && <div key={'category' + idx} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%'
            }}>
              <li style={{...styles.item, listStyleType: 'none'}} key={'editItem' + idx}>
                <label style={styles.editTitle}>類別: </label>
                <select className='category' style={styles.selectFrame} id="category" value={editCategory[idx]}
                        onChange={(c) => this.editCategory(c.target.value, idx)}>
                  {category['CATEGORY'].map((c, i) => (
                    <option key={'category' + i} value={c}>{c}</option>
                  ))}
                </select>
                <label style={styles.editTitle}>費用: </label>
                <input type="text" style={styles.inputFrame} value={editValue[idx]} ref={(value) => {
                  this.value = value;
                }}
                       onChange={(c) => this.editValue(c.target.value, idx)}/>
                <label style={styles.editTitle}>備註: </label>
                <input type="text" style={styles.inputFrame} value={editContent[idx]} ref={(content) => {
                  this.content = content;
                }}
                       onChange={(c) => this.editContent(c.target.value, idx)}/>
                <button type="submit" id="item-submit" key={'edit-item-submit' + idx} style={{...styles.editFinish}}
                        onClick={() => this.editFinish(c.timestamp, idx)}>完成
                </button>
              </li>
            </div>}
          </div>
        ))}
      </div>
    )
  }
}

export default Radium(Content)