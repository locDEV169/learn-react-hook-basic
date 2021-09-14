import './App.scss';
import ColorBox from './components/ColorBox';
import TodoList from './components/Todo';
import React,{useState} from 'react';


function App() {
  const [todoList,setTodoList] = useState([
    {id:1,title: "I ... 1"},
    {id:2,title: "I ... 2"},
    {id:3,title: "I ... 3"},
  ]);

  function handleTodoClick(todo){
    console.log(todo)
    const index = todoList.findIndex(x => x.id == todo.id)
    if(index < 0 ) return;
    const newTodoList = [...todoList];
    newTodoList.splice(index,1);
    setTodoList(newTodoList)
  }

  return (
    <div className="App">
      <h1>Welcome to React Hook</h1>
      <ColorBox />
      <h2>React Hook lab2 -TodoList</h2>
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/>
    </div>
  );
}

export default App;
