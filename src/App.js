import './App.scss';
import ColorBox from './components/ColorBox';
import TodoList from './components/Todo';
import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoFrom';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import queryString from 'query-string';
import PostFiltersForm from './components/PostFiltersForm';
import Clock from './components/Clock';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "I ... 1" },
    { id: 2, title: "I ... 2" },
    { id: 3, title: "I ... 3" },
  ]);
  //tạo danh sách post lấy từ Api về
  const [postList, setPostList] = useState([]);
  //tạo state cho pagination
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11,
  });
  //
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    //tạo 1 filter mới cho search
    //title_like là tên trả về đúng như back end quy định 
    title_like: '',
  })

  //sử dụng hook useEffect()
  // đoạn này gọi callBack làm denpendencies: arrary emty => tương tự như componentDidMount
  useEffect(() => {
    async function fetchPostList() {
      try {
        //_limit=10&_page=1
        const paramsString = queryString.stringify(filters);
        // link api
        // const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
        //chuyển lại gọi pramString để gọi đừng link đúng vs pagination lẫn PostList
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        // gọi file có trong api
        const response = await fetch(requestUrl);
        // chuyển file response sang file json
        const responseJSON = await response.json();
        console.log({ responseJSON })


        // llấy dữ liệu data từ responseJSON
        const { data, pagination } = responseJSON;
        //console.log({data})

        //set data cho PostList
        setPostList(data)
        //set data cho pagination
        setPagination(pagination)
      } catch (error) {
        console.log("failed to fetch post List", error.message)
      }
    }

    // gọi để chạy function phía trên
    fetchPostList();
  }, [filters]);

  // đoạn này gọi callBack làm denpendencies: rỗng => tương tự như componentWillMount
  useEffect(() => {
    console.log('TODO list effect');
  });

  function handleTodoClick(todo) {
    console.log(todo)
    const index = todoList.findIndex(x => x.id === todo.id)
    if (index < 0) return;
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList)
  }

  //add item vào TodoList
  function handleTodoSubmit(formValues) {
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

  //handle change page 
  function handlePageChange(newPage) {
    console.log("newPage ", newPage)
    setFilters({
      //giữ lại filter ban đầu
      ...filters,
      //đổi lại _page là newPage
      _page: newPage,
    })
  }

  //handle change 
  function handleFiltersChange(newFilters){
    console.log("newFilters", newFilters)
    setFilters({
      ...filters,
      //reset về lại trang 1
      //search kết quả ra nhìu trang nên chỉ để 1 trang
      _page: 1,
      //trả lại giá trị của searchTerm
      title_like: newFilters.searchTerm,
    })
  }

  //set useState cho show Clock = true
  const [showClock, setShowClock] = useState(true);

  //render app
  return (
    <div className="App">
      <h1>Welcome to React Hook</h1>
      <ColorBox />
      <p>-----------------------------------------</p>
      <h2>React Hook useState lab2 -TodoList</h2>
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
      <h2>React Hook useState lab3 -TodoForm</h2>
      <TodoForm onSubmit={handleTodoSubmit} />
      <p>-----------------------------------------</p>
      <h2>React Hook useEffect lab1 - PostList Api</h2>
      <PostList posts={postList} />
      <h2>React Hook useEffect lab2 - PostList Api + Pagination(phân trang)</h2>
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
      <h2>React Hook useEffect lab3 - PostList Api + Search Term() + kỹ thuật debounce</h2>
      <PostFiltersForm 
        onSubmit={handleFiltersChange}
      />
      <h2>React Hook useEffect lab4 - useEffect cleanup với code Clock </h2>
      {/*
       là chưa ri sẽ báo lỗi Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
       */}
      {/* nên t phải cleanup lại setInterval bên component Con  */}
      {showClock && <Clock />}
      <button onClick={() => setShowClock(false)}>Hide clock</button>
      <p>-----------------------------------------</p>
    </div>
  );
}

export default App;
