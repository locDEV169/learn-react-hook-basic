// lab2: cho danh sách  TodoList
//1. render Todos với dữ liệu truyền từ component cha
//2. khi click remove thì xóa item
// phân tích:
//App component sẽ có:
// props: n/a
// state: todoList
// handler: handleTodoClick - remove todo ra khỏi todoList;
// Render: <TodoList todos={todoList} onTodoClick={handleTodoClick} />
//TodoClick sẽ có:
//props: +/ todos: danh sách todos
//       +/ onTodoList: function sẽ đc gọi khi 1 Todo đc click
//state: n/a
//render: ul > li > todo.title
//handle todo onClick: gọi function props.onTodoClick()
import React from 'react'
import PropTypes from 'prop-types'
//khai báo propTypes cho todoList
TodoList.propTypes = {
    //khai báo todos là 1 array
    todos: PropTypes.array,
    //khai báo onTodoClick là 1 function
    onTodoClick: PropTypes.func,
};
//set giá trị default cho prop
//nếu component cha ko truyền props vào thì sẽ đưa về giá trị defaut
TodoList.defaultProps = {
    todos: [],
    onTodoClick: null,
}

function TodoList(props) {
    const { todos, onTodoClick } = props

    function handleClick(todo) {
        if (onTodoClick) {
            onTodoClick(todo);
        }
    }

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <li key={todo.id} onClick={()=>handleClick(todo)}>
                    {todo.title}
                </li>
            ))}
        </ul>
    )
}
export default TodoList