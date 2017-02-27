import React from "react"
import {observer} from "mobx-react"



//We passing a store from main.js
//Values in our store are observable, they will fire all this change events.
//React listen to state of the compoent and then rerender when is a change.
//Now observer is listen to all observables and rerender component if there is any change
//Our store has observable values, that are event emitters.
//Observer in our component is a event listener and it tragers react rerender.

@observer
export default class TodoList extends React.Component {
    createNew(e) {
      if(e.which === 13){
        this.props.store.createTodo(e.target.value)
        e.target.value = ""
      }
    }
    filter(e){
      this.props.store.filter = e.target.value
    }
    render(){
      const {todos, filter, filteredTodos} = this.props.store
      //using map method on array of todos to create list.
      const todoLis = filteredTodos.map(todo => (
        <li> {todo} </li>
      ))
      return <div>

      <h2> todos: </h2>
      <input className="create" onKeyPress={this.createNew.bind(this)} />
      <input className="filter" value={filter} onChange={this.filter.bind(this)} />
      <ul> {todoLis} </ul>
      </div>
    }
}
