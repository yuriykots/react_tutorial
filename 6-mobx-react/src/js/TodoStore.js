import {computed, observable} from "mobx"

class TodoStore {
  @observable todos = ["buy milk", "buy eggs"]
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
    this.todos.push(value)
  }
}



var store = window.store = new TodoStore
export default store
