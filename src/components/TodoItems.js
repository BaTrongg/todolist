import React from "react";
import "./TodoItems.css";
import { useState } from "react";
import checkdone from "./icon/checked.svg";
import checkNoteDone from "./icon/check-mark.svg";
import trash from './icon/trash.svg';
function TodoItems(props) {
  const [done, setDone] = useState(true);
  const [className, setClassName] = useState("");
  const [url,setUrl] = useState(checkNoteDone); 
  let list = props.list;
  let divElement = React.createRef();

  function clickItems() {//Handler sự kiện click vào item, nếu item đã hoàn thành thì bôi đen nó, nếu chưa thì làm sáng nó lên
    if (done) {
      setClassName('actives');
      setUrl(checkdone);
      setDone(false);
    } else {
      setClassName('');
      setUrl(checkNoteDone);
      setDone(true);
    }
  }

  function clickTrash() {//Handler sự kiện click vào nút xóa, item sẽ bị xóa nếu hàm được gọi
    divElement.current.remove();
  }

  return (
    <div ref = {divElement}>
      <img className = 'check' src={url} />
      <label className={className} onClick={clickItems}>
          {list}
      </label>
      <img className = 'trash' src = {trash} onClick = {clickTrash}></img>
    </div>
  );
}

export default TodoItems;
