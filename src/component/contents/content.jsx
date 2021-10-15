import React, { Component } from "react";
import Radium from "radium";
import styles from "./styles";
import _isUndefined from "lodash/isUndefined";
import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
import "firebase/database";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import eventEmitter from "../../eventTracking/eventEmitter";
import CategoryTable from "../inputContent/categoryTable/categoryTable";
import AccountTable from "../inputContent/accountTable/accountTable";

const initialState = {
  theItems: [],
  isEdit: "",
  editCategory: "",
  editValue: "",
  editContent: "",
  editAccount: "",
  accountList: [],
  inputCategory: "",
  isOpenCategoryTable: false,
  isOpenAccountTable: false,
};

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  itemDelete = (timestamp) => {
    const { deleteCallback } = this.props;
    deleteCallback && deleteCallback(timestamp);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.items !== this.state.theItems) {
      let initialIsEdit = [];
      let category = [];
      let content = [];
      let value = [];
      let account = [];
      this.getAccountList();
      prevProps.items.map((item, idx) => {
        initialIsEdit[idx] = false;
        account[idx] = prevProps.items[idx].accountClass;
        category[idx] = prevProps.items[idx].itemClass;
        content[idx] = prevProps.items[idx].itemValue;
        value[idx] = prevProps.items[idx].itemContent;
      });
      this.setState({
        theItems: prevProps.items,
        isEdit: initialIsEdit,
        editAccount: account,
        editCategory: category,
        editValue: content,
        editContent: value,
      });
    }
  }

  componentDidMount() {
    this.getAccountList();
  }

  getAccountList = () => {
    const { account } = this.props;
    const self = this;
    let getAccountCategory = firebase.database().ref(`account/${account}`);
    getAccountCategory.once("value").then((snapshot) => {
      if (!snapshot.val()) {
        return;
      }
      let accountList = snapshot.val().accountCategory;
      self.setState({ accountList: accountList });
    });
  };

  isEdit = (idx) => {
    const { isEdit } = this.state;
    isEdit[idx] = !isEdit[idx];
    this.setState({ isEdit: isEdit });
  };

  editFinish = (timestamp, idx) => {
    const { editCategory, editValue, editContent, editAccount } = this.state;
    const { account, updateItemCallback, dateTime } = this.props;
    let setDate = firebase.database().ref(`expense/${account}/${timestamp}`);
    editContent[idx] = _isUndefined(editContent[idx]) ? "" : editContent[idx];
    setDate.update({
      accountClass: editAccount[idx],
      itemClass: editCategory[idx],
      itemValue: editValue[idx],
      itemContent: editContent[idx],
    });
    eventEmitter.dispatch("itemEdit", dateTime.toString());
    updateItemCallback && updateItemCallback(dateTime);
    this.isEdit(idx);
  };
  editCategory = (category, idx) => {
    const { editCategory } = this.state;
    editCategory[idx] = category;
    this.setState({ editCategory: editCategory, isOpenCategoryTable: false });
  };
  editValue = (value, idx) => {
    const { editValue } = this.state;
    editValue[idx] = value;
    this.setState({ editValue: editValue });
  };
  editContent = (content, idx) => {
    const { editContent } = this.state;
    editContent[idx] = content;
    this.setState({ editContent: editContent });
  };

  editAccount = (account, idx) => {
    const { editAccount } = this.state;
    editAccount[idx] = account;
    this.setState({ editAccount: editAccount, isOpenAccountTable: false });
  };

  closeCategoryList = () => this.setState({ isOpenCategoryTable: false });

  closeAccountList = () => this.setState({ isOpenAccountTable: false });

  openCategoryList = () => {
    if (this.state.isOpenAccountTable) return;
    this.setState({ isOpenCategoryTable: true });
  };

  openAccountList = () => {
    if (this.state.isOpenCategoryTable) return;
    this.setState({ isOpenAccountTable: true });
  };

  render() {
    const {
      theItems,
      isEdit,
      editCategory,
      editValue,
      editContent,
      editAccount,
      isOpenCategoryTable,
      isOpenAccountTable,
    } = this.state;
    const { account } = this.props;
    return (
      <div style={{ ...styles.items, textAlign: "left" }}>
        {theItems &&
          theItems.map((c, idx) => (
            <div key={"itemShow" + idx}>
              {!isEdit[idx] && (
                <li
                  style={{ ...styles.item, listStyleType: "none" }}
                  key={"item" + idx}
                >
                  <span>{c.itemClass} </span>
                  <span>
                    {c.itemValue}$NT
                    <p style={styles.account}>{c.accountClass}</p>
                  </span>
                  <span>備註:{c.itemContent}</span>
                  <span>
                    <img
                      onClick={() => this.isEdit(idx)}
                      key={"content-edit" + idx}
                      style={styles.editIcon}
                      alt="cost of item"
                      src={require("../../assets/img/item-edit.png")}
                    />
                  </span>
                  <span onClick={this.itemDelete.bind(this, c.timestamp)}>
                    <img
                      key={"content-delete" + idx}
                      style={styles.deleteIcon}
                      alt="cost of item"
                      src={require("../../assets/img/item-delete.png")}
                    />
                  </span>
                </li>
              )}
              {isEdit[idx] && (
                <div
                  key={"category" + idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  <li
                    style={{
                      ...styles.item,
                      padding:
                        isOpenCategoryTable || isOpenAccountTable
                          ? "0%"
                          : "0% 1%",
                      listStyleType: "none",
                    }}
                    key={"editItem" + idx}
                  >
                    <label style={styles.editTitle}>帳戶: </label>
                    <div
                      style={{
                        ...styles.styleOfSelectCategory,
                        border: "2px solid #ffbf00",
                        width: "30%",
                      }}
                      onClick={() => this.openAccountList()}
                    >
                      {editAccount[idx]}
                    </div>
                    {isOpenAccountTable && (
                      <AccountTable
                        account={account}
                        idx={idx}
                        closeCallback={() => this.closeAccountList()}
                        selectCallback={this.editAccount}
                      />
                    )}
                    <label style={styles.editTitle}>類別: </label>
                    <div
                      style={{ ...styles.styleOfSelectCategory, width: "30%" }}
                      onClick={() => this.openCategoryList()}
                    >
                      {editCategory[idx]}
                    </div>
                    {isOpenCategoryTable && (
                      <CategoryTable
                        closeCallback={() => this.closeCategoryList()}
                        idx={idx}
                        selectCallback={this.editCategory}
                      />
                    )}
                    <label style={styles.editTitle}>費用: </label>
                    <input
                      type="text"
                      style={styles.inputFrame}
                      value={editValue[idx]}
                      ref={(value) => {
                        this.value = value;
                      }}
                      onChange={(c) => this.editValue(c.target.value, idx)}
                      inputMode="numeric"
                    />
                    <label style={styles.editTitle}>備註: </label>
                    <input
                      type="text"
                      style={styles.inputFrame}
                      value={editContent[idx]}
                      ref={(content) => {
                        this.content = content;
                      }}
                      onChange={(c) => this.editContent(c.target.value, idx)}
                    />
                    <button
                      type="submit"
                      id="item-submit"
                      key={"edit-item-submit" + idx}
                      style={{ ...styles.editFinish }}
                      onClick={() => this.editFinish(c.timestamp, idx)}
                    >
                      完成
                    </button>
                  </li>
                </div>
              )}
            </div>
          ))}
      </div>
    );
  }
}

export default Radium(Content);
