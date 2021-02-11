import React, { Component } from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import { navigate } from '@reach/router';
import fireDB, {fireAuth} from "../../firebase";

import Calendar from "../calendar/index_calendar";
import Todos from "../super-todo/Todos";
import Nav from "../nav-bar/Nav";
import Login from "../login/Login";
import Register from "../registration/Register";

import './app.css'

export default class App extends Component {
  thisDay = () => {
    return ((new Date()).getDate())
  }
  thisMonth = () => {
    return ((new Date()).getMonth()+1)
  }
  thisYear = () => {
    return ((new Date()).getFullYear())
  }
  state = {
    todoData: [],
    user: null,
    displayName: null,
    userID: null,
    date: (this.thisDay()+'/'+'0'+this.thisMonth()+'/'+this.thisYear())
  };

  componentDidMount() {
    this.updateList();
  }

  // componentDidUpdate(prevState) {
  //   if (this.state.todoData !== prevState.todoData) {
  //     console.log(this.state);
  //     console.log(prevState);
  //   }
  // }

  updateList() {
    fireAuth.onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        })
      }
    });

    fireDB
      .firestore()
      .collection('data')
      .get()
      .then((snapshot) => {
        let todos = snapshot.docs.map(item => ({
          ...item.data(),
          id: item.id
        }))
        let todoList = [];

        todos.map(item => {
          if (this.state.user && (item.userID === fireAuth.currentUser.uid)) {
            todoList.push({
              label: item.label,
              important: item.important,
              done: item.done,
              id: item.id,
              date: item.date
            })
          }
        });

        this.setState({
          todoData: todoList
        })
      });
  }

  registerUser = userName => {
    fireAuth.onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate('/');
        window.location.href = '/';
      });
    });
  };
  logOutUser = e => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null
    });

    fireAuth.signOut().then(() => {
      navigate('/login');
      window.location.href = '/login';
    });
  };

  addTodo = todoName => {
    if (todoName) {
      fireDB.firestore()
        .collection('data')
        .add({
          label: todoName,
          done: false,
          important: false,
          userID: fireAuth.currentUser.uid,
          date: this.state.date
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  };

  handleSubmit = (event) => {
    const eventMap = event.target.value.toString().split('-');
    const eventDate = eventMap[2]+'/'+ eventMap[1]+'/'+eventMap[0];
    this.setState({
      date: eventDate
    })
  }

  showTodos = () => {
    return (
      <div>

        <div className="style d-flex">
          <h1 className="sizeF font" >
            Установка даты    |
          </h1>
          <input
            className="colors"
            // value={this.thisYear()+'-'+'0'+this.thisMonth()+'-'+this.thisDay()}
            type="date"
            onChange={event => this.handleSubmit(event)}
          />
        </div>

        <Todos
          todos={this.state.todoData}
          addTodo={this.addTodo}
          date={this.state.date}
        />
        {console.log(this.state.date)}
      </div>
    )
  }
  showCal = () => {
    return (
      <Calendar todoData={this.state.todoData}/>
    )
  }
  showLogin = () => {
    return (<Login />)
  }
  showReg = () => {
    return (
      <Register registerUser={this.registerUser} />
    )
  }

  render() {

    return (
      <div>
        <Nav
          user={this.state.user}
          logOutUser={this.logOutUser}
        />

        <Router>
          {!this.state.user && (
            <div className="text-center mt-5 font">
              <p>Пожалуйста, зарегистрируйтесь или войдите в учётную запись</p>
            </div>)}
          <Route
            path = "/login"
            component={this.showLogin}
          />
          <Route
            path = "/register"
            component={this.showReg}
          />
          {this.state.user && (<Route
            exact path = "/"
            component={this.showTodos}
          />)}
          {this.state.user && (<Route
            path = "/calendar"
            component={this.showCal}
          />)}
        </Router>
      </div>
    )
  }
}