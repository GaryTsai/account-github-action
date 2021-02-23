import eventEmitter from './eventEmitter';
import Gtag from './Gtag';
import React, {Component} from 'react';

export default class eventTracking extends Component{
  constructor(){
    super();
    this.tracker = new Gtag();
    eventEmitter.subscribe('expense', () => this.tracker.event('expense','insertItem'));
    eventEmitter.subscribe('datepicker', () => this.tracker.event('expense','insertItem'));
    eventEmitter.subscribe('changePage', (status) => this.tracker.event('changePage', status.toString()));
    eventEmitter.subscribe('itemDelete', (date) => this.tracker.event('item','delete', date.toString()));
    eventEmitter.subscribe('itemEdit', (date) => this.tracker.event('item','edit', date.toString()));
    eventEmitter.subscribe('detailOfMonth', (dateAndMonth) => this.tracker.event('detailOfMonth','click', dateAndMonth.toString()));
    eventEmitter.subscribe('accountLogOut', (account) => this.tracker.event('account','logOut', account.toString()));
  }
}
