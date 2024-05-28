import { useEffect, useState,useRef } from "react"
import Navbar from "./components/Navbar"
import {v4 as uuidv4} from 'uuid'
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";


function App() {

  const [todo,setTodo] = useState("");
  const [todos,setTodos] = useState([]);
  const [showfinished , setShowFinished] = useState(true);
  const inputRef = useRef(null);


  useEffect(()=>{
    let todoNotNull = localStorage.getItem("todos");
    if(todoNotNull){
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  },[]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todo]);

  const saveTodo = () => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const toggleFinished = () => {
    setShowFinished(!showfinished);
  }

  const handleEdit = (e,id) => {
    let t = todos.filter(i=>(i.id === id))
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {return item.id !== id});
    setTodos(newTodos);
    saveTodo();
  }

  const handleDelete = (e,id) => {
    let newTodos = todos.filter(item => {return item.id !== id});
    setTodos(newTodos);
    saveTodo();
  }

  const handleAdd = () => {
    setTodos([...todos,{id:uuidv4(),todo , isCompleted:false}])
    setTodo("");
    console.log(todos)
    saveTodo();
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
    e.preventDefault();
  }

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {return item.id === id});
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTodo();
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };



  return (
    <>
      <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <h1 className="flex items-center justify-center mb-2 font-bold text-4xl">Todo App</h1>
        <div className="addTodo">
          <h2 className="mx-2 mb-1 text-xl font-bold">Add a Todo</h2>
          <input ref={inputRef} onKeyPress={handleKeyPress} onChange={handleChange} value={todo} type="text" className="p-1 w-3/5 rounded-lg" />
          <button onClick={handleAdd} disabled={todo.length<1} className="bg-violet-600 hover:bg-violet-800 font-bold p-1 px-2 text-white
          rounded-md mx-5">Save a Todo</button>
        </div>
        <div className="mt-4">
          <input className=" size-4" onChange={toggleFinished} type="checkbox" checked={showfinished} />
          <label className="mx-2 text-xl font-bold">Show Finished Todos</label>
        </div>
        <div className="h-[1px] bg-black opacity-30 mx-auto my-5"></div>
        <h2 className="mx-2 mb-2 text-xl font-bold">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <p className="text-center my-6 font-serif">No todos yet</p>}
          {todos.map(item=>{
            return((showfinished|| !item.isCompleted) &&
                <div key= {item.id} className="todo flex p-2 bg-violet-200 my-2 rounded-md  justify-between items-center">
                  <input  name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} />
                  <span className={item.isCompleted?"line-through":""}>{item.todo}</span>
                  <div className="flex">
                    <button onClick={(e)=>{handleEdit(e,item.id)}} className="bg-violet-600 hover:bg-violet-800 font-bold p-1 px-2 text-white
                    rounded-md mx-2"><FaRegEdit /></button>
                    <button onClick={(e)=>{handleDelete(e,item.id)}} className="bg-violet-600 hover:bg-violet-800 font-bold p-1 px-2 text-white
                    rounded-md"><MdDeleteForever/></button>
                  </div>
              </div>
            )
          })}
        </div>

      </div>
    </>
  )
}

export default App