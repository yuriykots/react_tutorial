import {computed, observable} from "mobx"

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
    return this.todos.filter(todo => !this.filter || matchesFilter.test(todo))
  }
  createTodo(value){
    this.todos.push(new Todo(value))
  }
}



var store = window.store = new TodoStore
export default store
