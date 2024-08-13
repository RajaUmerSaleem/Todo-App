import { useState, useEffect } from 'react'
import './index.css'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar'
function App() {
  const [form, setform] = useState("")
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  useEffect(() => {
    const localTodos = localStorage.getItem('todos')
    console.log(localTodos)
    if (localTodos) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
      store(todos)
    }
  }, [])

  const store = (Todos) => {
    localStorage.setItem("todos", JSON.stringify(Todos))

  }
  const handleChange = (e) => {
    setTodo(e.target.value)
    setform(e.target.value)
  }

  const handleAdd = () => {
    if (Todo !== "") {
      setTodos(prevTodos => {
        const newTodos = [...prevTodos, { id: uuidv4(), Todo, isCompleted: true, status: false }];
        localStorage.setItem('todos', JSON.stringify(newTodos));
        return newTodos;
      });
      setTodo("")
      setform("")

    }
  };

  const handlestrike = (e, t) => {
    setTodos(prevTodos =>
      prevTodos.map(item =>
        item.id === t.id
          ? { ...item, status: !item.status }
          : item
      )
    );
    store(Todos)
  }
  const handleDelete = (e, t) => {
    setTodos(prevTodos => prevTodos.filter(item => item.id !== t.id))
    store(Todos)
  }

  const handleedit = (e, t) => {
    console.log(t.Todo)
    setform(t.Todo)
    handleDelete(e, t)
    store(Todos)
  }


  return (
    <>
      <div><Navbar /></div>
      <div className='container sm:w-[50%] w-full h-full my-[20px] rounded-lg p-[12px] mx-auto shadow-black shadow-2xl'>
        <div className='w-full h-full bg-yellow-500'>
          <div className='w-full h-[60px] bg-black flex justify-center px-[5px] items-center'>
            <input onChange={handleChange} value={form} className='w-[80%] h-[80%]  bg-white border-black rounded-[20px] px-2' type="text"  >
            </input>
            <button onClick={handleAdd} className='w-[20%] mx-[8px] h-[80%] bg-green-500 hover:bg-green-400  font-bold hover:font-extrabold border-black rounded-[20px] text-white material-symbols-outlined' >Add</button>
          </div>
          <div className='w-[98%] h-[480px] mx-auto my-2 overflow-y-auto overflow-x-hidden'>
            <div className='w-full h-[15%] bg-white flex justify-around rounded-xl px-[5px] relative items-center text-[25px]  font-bold'>
              {Todos.length !== 0 ? " Todo List" : "Make your Todo list"}
            </div>
            {Todos.map(items => (<div key={items.id} className='w-full h-[13%] bg-white flex justify-center rounded-sm my-[2px] px-[5px] items-center'>
              <div className={`w-[72%] h-[100%] bg-white border-black text-black  flex p-[5px]  overflow-scroll overflow-x-hidden decoration-red-700 ${items.status ? "line-through text-green-800" : ""} `}>
                {items.Todo}
              </div>
              <div className='w-[28%] h-[100%] flex justify-center items-center'>
                <button className='w-[20%] mx-[5px] h-[80%]   font-bold hover:font-extrabold border-black  text-white'>
                  <input type="checkbox" onClick={(e) => { handlestrike(e, items) }} />
                </button>
                <button onClick={(e) => { handleDelete(e, items) }} className='w-[40%] mx-[2px] h-[80%] bg-blue-600 duration-75 hover:bg-blue-400  font-bold hover:font-extrabold border-black rounded-sm material-symbols-outlined text-white'>Delete</button>
                <button onClick={(e) => { handleedit(e, items) }} className='w-[40%] mx-[2px] h-[80%] bg-black hover:bg-gray-600 font-bold hover:font-extrabold border-black rounded-sm text-white material-symbols-outlined '>edit</button>
              </div>
            </div>))}
          </div>
        </div>
      </div>
      <div></div>
    </>
  )
}

export default App
