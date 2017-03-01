import {computed, observable} from "mobx"


//Before we had an array of todos. But we want to store more information.
//We want an object fro every todo that will have value, id and complete status
//To do this we are creating a constructor.
//Every value inside this todo object will be observable.

class Todo {
  @observable value
  @observable id
  @observable complete

  constructor(value){
    this.value = value
    this.id = Date.now()
    this.complete = false
  }
}

class TodoStore {
  @observable todos = []
  @observable filter =""

//computed value is calculated every time I change observable value
//When ther is no filter filteredTodos showing all todos.
//As soon as we change observable todos, computed valu is automaticly
// calculated and we have new array of filtered values.

  @computed get filteredTodos(){
    var matchesFilter = new RegExp(this.filter, "i")
    return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value))
  }
  createTodo(value){

    //We are pushing new todo to a array. It will be new todo object that we are creating with
    //our class and constructor function.
    this.todos.push(new Todo(value))
  }

  clearComplete = () => {
    const incompleteTodos = this.todos.filter(todo => !todo.complete)
    this.todos.replace(incompleteTodos)
  }






}



var store = window.store = new TodoStore
export default store
