import React, { useState, useEffect } from "react";
import TodoItems from "./components/TodoItems";
import "./App.css";
import { FixedSizeList as List } from "react-window";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const [lists, setLists] = useState([]);//Lưu trữ dữ liệu của lists
  const [data, setData] = useState([]);//Lưu trữ dữ liệu lấy được từ server
  const [point, setPoint] = useState(0);//Sau mỗi lần scroll xuống cuối trang và lấy thêm 5 items từ data, point sẽ cộng thêm 5 để đánh dấu vị trí cho lần nhập tiếp theo
  const inputElement = React.createRef();
  let count = "";
  

  function handlerSubmit(event) {// Xử lý khi ấn submit
    event.preventDefault();// Hủy bỏ hành động mặc định của form khi bấm submit
    setLists([...lists, count]);//push giá trị người dùng nhập vào lists
    inputElement.current.value = "";// làm trống nhập để người dùng nhập lần tiếp theo
  }


  function handlerChange(event) {//Ghi nhận khi người dùng nhập vào form
    count = event.target.value;
  }


  function handlerScroll(e){
    if( e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight - 0.5 && point  < data.length){//nếu scroll xuống cuối trang và data vẫn chưa hết, tiếp tục hiển thị thêm 5 data cho người dùng
      let mangcon = data.slice(point, point + 5);//Lấy thêm 5 data
      setLists(lists.concat(mangcon));//add 5 data vào list để render ra cho người dùng
      setPoint(point + 5);//đánh dấu vị trí cho lần update data tiếp theo
    }
  }


  let TodoList = lists.map(function (list, index) {//Nhóm các todoItems
    return <TodoItems key={index} list={list} index={index}/>;
  });

  
  useEffect(() => {// Call data server
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then(function(res){
      return res.json();
    })
    .then(function(posts){
      let post_id = posts.map(function(post){
        return post.id;
      })
      setData(post_id);
    })
  }, []);


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
      
      <Router>
      <div >
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route path="/React-dom">
            <List
              className="box-todolist"
              height={224.8}
              itemCount={data.length}
              itemSize={56.2}
              width={550}
            >
              {({ index, style }) => (
                <div style = {style}> <TodoItems list={data[index]}/> </div>
              )}
            </List>
          </Route>

          <Route path="/Infinity-scroll">
            <div className="box-todolist" onScroll = {handlerScroll}>{TodoList}</div>
          </Route>

          <Route path="/">
            <div className="box-todolist">{TodoList}</div>
          </Route>

        </Switch>
      </div>
    </Router>
  </div>
  );
}

export default App;