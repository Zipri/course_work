import React, {Component} from 'react';

import './Nav.css'


class Nav extends Component {
  render() {
    const {user, logOutUser} = this.props;

    return (
      <nav className="navbar navbar-expand selfColor">
        <div className="header d-flex fontC">
          <h3>
            <a href="#">
              Mentor Book
            </a>
          </h3>
          <ul className="d-flex">
            <li>
              <a href="/">Список учеников на день</a>
            </li>
            <li>
              <a href="/calendar">Календарь учеников</a>
            </li>
            {!user && (
              <li className="special">
                <a href="/register">
                  Зарегистрироваться
                </a>
              </li>
            )}
            {!user && (
              <li className="special">
                <a href="/login">
                  Войти
                </a>
              </li>
            )}
            {user && (
              <li className="special">
                <a
                  href="/login"
                  onClick={e => logOutUser(e)}
                >
                  Выйти
                </a>
              </li>
            )}
            {user && (
              <li>
                <a>
                  Добро пожаловать, {user.email}!
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
