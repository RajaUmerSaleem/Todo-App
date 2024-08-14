import { useState, useEffect } from 'react'
import './index.css'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar'
import Footer from './components/footer'
function App() {
  const [form, setform] = useState("")
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [isfinished, setFinished] = useState(false)
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
      const currentDate = new Date().toLocaleDateString();
      setTodos(prevTodos => {
        const newTodos = [...prevTodos, { id: uuidv4(), Todo, isCompleted: true, status: false, Date: currentDate }];
        localStorage.setItem('todos', JSON.stringify(newTodos));
        return newTodos;
      });
      setTodo("")
      setform("")
    }
  };

  const handlestrike = (e, t) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(item => item.id === t.id ? { ...item, status: !item.status } : item);
      store(updatedTodos);
      return updatedTodos;
    });
  }
  const handleDelete = (e, t) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.filter(item => item.id !== t.id);
      store(updatedTodos);
      return updatedTodos;
    });
  }

  const handlereset = () => {
    setTodos(() => {
      const updatedTodos = [];
      store(updatedTodos);
      return updatedTodos;
    });
  }


  const handleedit = (e, t) => {
    console.log(t.Todo)
    setform(t.Todo)
    handleDelete(e, t)
  }
  const handleFinish = () => {
    setFinished(prevState => {
      const newState = !prevState;
      console.log(newState);
      return newState;
    });
  }
  const filteredTodos = isfinished ? Todos.filter(items => items.status) : Todos;
  return (
    <>
      <div><Navbar /></div>
      <div className='container sm:w-[50%] w-full h-[80vh] rounded-lg  mx-auto shadow-black shadow-sm'>
        <div className='w-full h-full bg-gray-800'>
          <div className='w-full h-[60px] bg-black flex justify-center px-[5px] items-center'>
            <input onChange={handleChange} value={form} className='w-[80%] h-[80%]  bg-white border-black rounded-[20px] px-2' type="text" placeholder='Write Your Task...' >
            </input>
            <button onClick={handleAdd} className='w-[20%] mx-[8px] h-[80%] bg-green-700 hover:bg-green-400  font-bold hover:font-extrabold border-black rounded-[20px] text-white material-symbols-outlined' >Add</button>
          </div>
          <div className='w-[98%] mx-auto h-[10%] bg-white flex justify-around rounded-xl px-[5px] items-center text-[25px] font-mono font-bold'>
            {Todos.length !== 0 ? " Tasks List" : "Make your Tasks List"}
          </div>
          <div className='w-[98%] mx-auto h-[10%] bg-black rounded-lg flex justify-center items-center text-[25px]'>
            <button onClick={(e) => { handlereset(e, Todos) }} className={`w-[50%] mx-[2px] h-[80%]  rounded-lg font-semibold duration-75 border-black c ${Todos.length === 0 ? "hidden" : "bg-red-700 text-white"}`}>{Todos.length === 0 ? "Empty" : "Clear All"}</button>
            <button onClick={handleFinish} className={`w-[50%] mx-[2px] h-[80%]  duration-75 border-black font-semibold rounded-lg ${isfinished ? "bg-white text-black" : "bg-red-700 text-white"}`}>{isfinished ? "Show All " : "Show Done"}</button>
          </div>
          <div className='w-[98%] h-[50vh] mx-auto my-2 overflow-y-auto overflow-x-hidden'>
            {filteredTodos.map(items => (<div key={items.id} className='w-full h-[15%] bg-white flex justify-center rounded-sm my-[2px] px-[5px] items-center'>
              <button className='w-[5%] mx-[5px] h-[50%] flex border-black  text-white'>
                <input type="checkbox" checked={items.status} onClick={(e) => { handlestrike(e, items) }} />
              </button>
              <div className='w-[72%] h-full flex flex-col bg-white'>
                <div className={`w-full h-[77%] border-black text-black  flex pt-2 px-1  overflow-scroll overflow-x-hidden decoration-red-700 ${items.status ? "line-through text-green-800" : ""} `}>
                  {items.Todo}
                </div>
                <div className='w-full h-[10%] font-extralight mx-1 p-[1px] flex items-center text-[13px]'>{items.Date}</div>
              </div>
              <div className='w-[20%] h-[100%] flex justify-center items-center'>
                <button onClick={(e) => { handleDelete(e, items) }} className='w-[40%] mx-[2px] h-[80%] bg-blue-600 duration-75 hover:bg-blue-400  font-bold hover:font-extrabold border-black rounded-sm material-symbols-outlined text-white'>Delete</button>
                <button onClick={(e) => { handleedit(e, items) }} className='w-[40%] mx-[2px] h-[80%] bg-black hover:bg-gray-600 font-bold hover:font-extrabold border-black rounded-sm text-white material-symbols-outlined '>edit</button>
              </div>
            </div>))}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}
export default App