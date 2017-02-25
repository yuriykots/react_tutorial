import React from "react"
import {observer} from "mobx-react"



//We passing a store from main.js
//Values in our store are observable, they will fire all this change events.
//React listen to state of the compoent and then rerender when is a change
//Now observer is listen to all observables and rerender component if there is any change
//Our store is observable values in our store is event emitters,
//Observer in our component is a event listener and it tragers react rerender.
@observer
export default class TodoList extends React.Component {
    render(){
      return <h1>{this.props.store.todos[0]} </h1>
    }
}
