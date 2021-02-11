import React from 'react';
import classnames from 'classnames';

import * as calendar from './calendar'

import './index_calendar.css'
import {MOCK_DATA} from "../../MOCK_DATA";

export default class Calendar extends React.Component {
  static defaultProps = {
    date: new Date(),
    years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
      2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    onChange: Function.prototype
  };

  state = {
    date: this.props.date,
    currentDate: new Date(),
    selectedDate: null
  };

  get year() {
    return this.state.date.getFullYear();
  }
  get month() {
    return this.state.date.getMonth();
  }
  get day() {
    return this.state.date.getDate();
  }

  handlePrevMonthButtonClick = () => {
    const date = new Date(this.year, this.month - 1);

    this.setState({date});
  };
  handleNextMonthButtonClick = () => {
    const date = new Date(this.year, this.month + 1);

    this.setState({date});
  };
  handleSelectChange = () => {
    const year = this.yearSelect.value;
    const month = this.monthSelect.value;

    const date = new Date(year, month);

    this.setState({date});
  };
  handleDayClick = date => {
    this.setState({selectedDate: date});

    this.props.onChange(date);
  };

  showLabel = (date) => {
    return (
      <div>
        <h1 className="onlyDay">
          {date.getDate()}
        </h1>
        <ul>
          {this.props.todoData.map(item => {
            let month = date.getMonth();
            month++;
            if (month < 10) {month = '0'+month}
            let calDate = date.getDate()+'/'+month+'/'+date.getFullYear();
            if (date.getDate() < 10) {calDate = '0'+calDate}
            console.log(calDate)
            if (item.date === calDate && item.done) {
              return (
                <li className="onlyLabel green">
                  {item.label}
                </li>
              )
            }
            if (item.date === calDate && !item.done) {
              return (
                <li className="onlyLabel">
                  {item.label}
                </li>
              )
            }
          })}
        </ul>
      </div>
    )
  }

  render() {
    const {years, monthNames, weekDayNames} = this.props;
    const {currentDate, selectedDate} = this.state;

    const monthData = calendar.getMonthData(this.year, this.month);

    return (
      <div className="calendar">
        <header>
          <button
            onClick={this.handlePrevMonthButtonClick}
            className="btn btn-outline-warning"
          >{'<'}</button>
          <select
            className="colorsS"
            ref={element => this.monthSelect = element}
            value={this.month}
            onChange={this.handleSelectChange}
          >
            {monthNames.map((name, index) =>
              <option key={name} value={index}>{name} </option>
            )}
          </select>
          <select
            className="colorsS"
            ref={element => this.yearSelect = element}
            value={this.year}
            onChange={this.handleSelectChange}
          >
            {years.map(year =>
              <option key={year} value={year}>{year} </option>
            )}
          </select>
          <button
            onClick={this.handleNextMonthButtonClick}
            className="btn btn-outline-warning"
          >{'>'}</button>
        </header>
        <table>
          <thead>
          <tr>
            {weekDayNames.map(name =>
              <th key={name} className="weekColor" >
                {name}
              </th>
            )}
          </tr>
          </thead>
          <tbody>
          {monthData.map((week, index) =>
            <tr key={index} className="week">
              {week.map((date, index) => date ?
                <td
                  key={index}
                  className={classnames(
                    'day',
                    {'today': calendar.areEqual(date, currentDate)},
                    {'selected': calendar.areEqual(date, selectedDate)}
                  )}
                  onClick={() => this.handleDayClick(date)}
                >
                  {this.showLabel(date)}
                </td>
                :
                <td key={index}/>
              )}
            </tr>
          )}
          </tbody>
        </table>
      </div>
    );
  }
}