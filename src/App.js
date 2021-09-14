import './App.scss';
import ColorBox from './components/ColorBox';
import TodoList from './components/Todo';
import React,{useState} from 'react';
import TodoForm from './components/TodoFrom';

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

  function handleTodoSubmit(formValues){
    console.log("Form Values", formValues)
    //add new todo to current todoList
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList)
  }

  return (
    <div className="App">
      <h1>Welcome to React Hook</h1>
      <ColorBox />
      <h2>React Hook lab2 -TodoList</h2>
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/>
      <h2>React Hook lab3 -TodoForm</h2>
      <TodoForm onSubmit={handleTodoSubmit}/>
    </div>
  );
}

export default App;
