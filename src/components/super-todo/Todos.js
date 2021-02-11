import React, {Component} from 'react';
import TodosList from "./TodosList";
import './styles.css'


class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoName: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({[itemName]: itemValue});
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.addTodo(this.state.todoName);
    this.setState({todoName: ''});
  }


  render() {


    return (
      <div className="forceStyle">

          <div className="allWidth colors">
            <form
              className="formgroup"
              onSubmit={this.handleSubmit}
            >
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className="form-control"
                  name="todoName"
                  placeholder={`Добавить новое занятие на ${this.props.date}`}
                  aria-describedby="buttonAdd"
                  value={this.state.todoName}
                  onChange={this.handleChange}
                />
                <div className="input-group-append">
                  <button
                    type="submit"
                    className="btn btn-sm btn-info"
                    id="buttonAdd"
                  >
                    добавить
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="allWidth">
            <div className="card border-top-0 rounded-0">
              <TodosList
                todos={this.props.todos}
                date={this.props.date}
              />
            </div>
          </div>

      </div>
    );
  }
}

export default Todos;


