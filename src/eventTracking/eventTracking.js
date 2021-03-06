import eventEmitter from './eventEmitter';
import Gtag from './Gtag';
import {Component} from 'react';

export default class eventTracking extends Component{
  constructor(){
    super();
    this.tracker = new Gtag();
    eventEmitter.subscribe('itemInsert', (category) => this.tracker.event('item','insert', category.toString()));
    eventEmitter.subscribe('datepicker', () => this.tracker.event('date','click'));
    eventEmitter.subscribe('changePage', (status) => {
      this.tracker.pageview('account/' + status.toString());
    });
    eventEmitter.subscribe('itemDelete', () => this.tracker.event('item','delete'));
    eventEmitter.subscribe('itemEdit', () => this.tracker.event('item','edit'));
    eventEmitter.subscribe('detailOfMonth', (dateAndMonth) => this.tracker.event('detailOfMonth','click', dateAndMonth.toString()));
    eventEmitter.subscribe('accountLogOut', (account) => this.tracker.event('account','logOut', account.toString()));
    eventEmitter.subscribe('accountRegister', (account) => this.tracker.event('account','register', account.toString()));
    eventEmitter.subscribe('accountLogIn', (account) => this.tracker.event('account','logIn', account.toString()));
  }
}
