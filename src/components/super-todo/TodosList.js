import React, {Component} from 'react';
import fireDB from "../../firebase";


class TodosList extends Component {

//   constructor(props) {
//     super(props);
//     this.deleteTodo = this.deleteTodo.bind(this);
//   }
//
  uncompleteTodo = (e, whichTodo) => {
    e.preventDefault();
    fireDB.firestore()
      .collection('data')
      .doc(`${whichTodo}`)
      .update({
        done: false
      }).then(function () {
      console.log("Document successfully update!");
    })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  completeTodo = (e, whichTodo) => {
    e.preventDefault();
    fireDB.firestore()
      .collection('data')
      .doc(`${whichTodo}`)
      .update({
        done: true
      }).then(function () {
      console.log("Document successfully update!");
    })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  deleteTodo = (e, whichTodo) => {
    e.preventDefault();
    fireDB.firestore()
      .collection('data')
      .doc(`${whichTodo}`)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  };

  render() {
    const {todos, date} = this.props;
    const myTodos = todos.map(item => {
      if (item.date === date) {
        return (
          <div
            className="row"
            //key={item.todoID}
          >

            <div className="col-6 text-left">
              {item.label}
            </div>
            <div className="col-2 text-right">
              {item.done ? (
                <span className="text-success">
                        done
                      </span>
              ) : (
                <span className="text-danger">
                        not now
                      </span>
              )}
            </div>
            <div
              className="col-4 text-right"
              role="group"
              aria-label="Todo Options"
            >
              <button
                className="btn btn-sm btn-outline-dark"
                title="Complete Todo"
                onClick={e => this.completeTodo(e, item.id)}
              >
                <i class="fas fa-check"></i> complete
              </button>
              <button
                className="btn btn-sm btn-outline-dark"
                title="Uncomplete Todo"
                onClick={e => this.uncompleteTodo(e, item.id)}
              >
                <i class="fas fa-times"></i> uncomplete
              </button>
              <button
                className="btn btn-sm btn-outline-dark"
                title="Delete Todo"
                onClick={e => this.deleteTodo(e, item.id)}
              >
                <i class="far fa-trash-alt"></i> del
              </button>
            </div>
          </div>
        );
      }
    });

    return <div>{myTodos}</div>;
  }
}

export default TodosList;
