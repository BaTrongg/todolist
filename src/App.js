import React, { useState } from "react";
import TodoItems from "./components/TodoItems";
import "./App.css";

function App() {
  const [lists, setLists] = useState([]);
  const inputElement = React.createRef();
  let count = "";

  function handlerSubmit(event) {
    event.preventDefault();
    setLists([...lists, count]);
    inputElement.current.value = "";
  }

  function handlerChange(event) {
    count = event.target.value;
  }

  let TodoList = lists.map(function (list, index) {
    return <TodoItems key={index} list={list} index={index}/>;
  });

  return (
    <div id="App">
      <form onSubmit={handlerSubmit}>
        <input
          placeholder="What need todo done?"
          onChange={handlerChange}
          type="text"
          ref={inputElement}
        ></input>
      </form>
      <div className="box-todolist">{TodoList}</div>
    </div>
  );
}

export default App;