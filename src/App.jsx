import { useState, useEffect } from 'react'
import './index.css'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar'
import Footer from './components/footer'
import InstallPrompt from './components/InstallPrompt'
// Import electron-store
const Store = window.require ? window.require('electron-store') : null;
const store = Store ? new Store() : null;

function App() {
  const [form, setform] = useState("")
  const [Todo, setTodo] = useState("")
  const [Deadline, setDeadline] = useState("")
  const [Todos, setTodos] = useState([])
  const [isfinished, setFinished] = useState(false)

  const getPriority = (deadline) => {
    if (!deadline) return 4
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dl = new Date(deadline + 'T00:00:00')
    const diffDays = Math.floor((dl - today) / (1000 * 60 * 60 * 24))
    if (diffDays < 0) return 0
    if (diffDays === 0) return 1
    if (diffDays <= 3) return 2
    return 3
  }

  const priorityLabel = (deadline) => {
    const p = getPriority(deadline)
    if (p === 0) return { text: 'Overdue', color: 'bg-red-600' }
    if (p === 1) return { text: 'Due Today', color: 'bg-orange-500' }
    if (p === 2) return { text: 'Urgent', color: 'bg-yellow-500 text-black' }
    if (p === 3) return { text: 'Upcoming', color: 'bg-gray-600' }
    return { text: 'No Deadline', color: 'bg-gray-700' }
  }

  const formatDeadline = (deadline) => {
    if (!deadline) return ''
    const parts = deadline.split('-')
    if (parts.length !== 3) return deadline
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${parseInt(parts[2])} ${months[parseInt(parts[1]) - 1]} ${parts[0]}`
  }

  // Helper to get/set todos using electron-store or fallback to localStorage
  const getTodos = () => {
    if (store) {
      return store.get('todos') || []
    } else {
      const localTodos = localStorage.getItem('todos')
      return localTodos ? JSON.parse(localTodos) : []
    }
  }
  const saveTodos = (todos) => {
    if (store) {
      store.set('todos', todos)
    } else {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }

  useEffect(() => {
    setTodos(getTodos())
  }, [])

  const handleChange = (e) => {
    setTodo(e.target.value)
    setform(e.target.value)
  }

  const handleAdd = () => {
    if (Todo !== "") {
      const currentDate = new Date().toLocaleDateString();
      setTodos(prevTodos => {
        const newTodos = [...prevTodos, { id: uuidv4(), Todo, isCompleted: true, status: false, Date: currentDate, Deadline }];
        saveTodos(newTodos);
        return newTodos;
      });
      setTodo("")
      setform("")
      setDeadline("")
    }
  };

  const handlestrike = (e, t) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(item => item.id === t.id ? { ...item, status: !item.status } : item);
      saveTodos(updatedTodos);
      return updatedTodos;
    });
  }

  const handleDelete = (e, t) => {
    alert("Are you sure to delete?(yes/no)")
    let response = prompt("");
    if (response === 'yes') {
      setTodos(prevTodos => {
        const updatedTodos = prevTodos.filter(item => item.id !== t.id);
        saveTodos(updatedTodos);
        return updatedTodos;
      });
    } else {
      alert("Data not deleted")
    }
  }

  const handlereset = () => {
    alert("Your are going empty you todo list.. Are you sure about this?")
    let response = prompt("Write you response(yes/no)")
    if (response === 'yes') {
      setTodos(() => {
        const updatedTodos = [];
        saveTodos(updatedTodos);
        return updatedTodos;
      });
    } else {
      alert("Data not deleted")
    }
  }

  const handleedit = (e, t) => {
    setform(t.Todo)
    setDeadline(t.Deadline || "")
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.filter(item => item.id !== t.id);
      saveTodos(updatedTodos);
      return updatedTodos;
    });
  }

  const handleFinish = () => {
    setFinished(prevState => !prevState);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAdd();
    }
  };

  const filteredTodos = isfinished ? Todos.filter(items => items.status) : Todos.filter(items => !items.status);
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    const pa = getPriority(a.Deadline)
    const pb = getPriority(b.Deadline)
    if (pa !== pb) return pa - pb
    if (a.Deadline && b.Deadline) return new Date(a.Deadline) - new Date(b.Deadline)
    return 0
  });

  return (
    <>
      <div><Navbar /></div>
      <div className='container sm:w-[50%] w-full h-[80vh] rounded-lg  mx-auto shadow-black shadow-sm'>
        <div className='w-full h-full bg-gray-800'>
          <div className='w-full h-[60px] bg-black flex justify-center px-[5px] items-center'>
            <input onChange={handleChange} onKeyPress={handleKeyPress} value={form} className='w-[60%] h-[80%] bg-white border-black rounded-[20px] px-2' type="text" placeholder='Write Your Task...' />
            <input onChange={(e) => setDeadline(e.target.value)} value={Deadline} className='w-[22%] mx-[6px] h-[80%] bg-white border-black rounded-[20px] px-2 text-[14px]' type='date' title='Deadline' />
            <button onClick={handleAdd} className='w-[18%] mx-[8px] h-[80%] bg-green-700 hover:bg-green-400  font-bold hover:font-extrabold border-black rounded-[20px] text-white material-symbols-outlined' >Add</button>
          </div>
          <div className='w-[98%] mx-auto h-[10%] bg-white flex justify-around rounded-xl px-[5px] items-center text-[25px] font-mono font-bold'>
            {Todos.length !== 0 ? " Tasks List" : "Make your Tasks List"}
          </div>
          <div className='w-[98%] mx-auto h-[10%] bg-black rounded-lg flex justify-center items-center text-[25px]'>
            <button onClick={(e) => { handlereset(e, Todos) }} className={`w-[50%] mx-[2px] h-[80%]  rounded-lg font-semibold duration-75 border-black c ${Todos.length === 0 ? "hidden" : "bg-red-700 text-white"}`}>{Todos.length === 0 ? "Empty" : "Clear All"}</button>
            <button onClick={handleFinish} className={`w-[50%] mx-[2px] h-[80%]  duration-75 border-black font-semibold rounded-lg ${Todos.length === 0 ? "disabled" : ""} ${isfinished ? "bg-white text-black" : "bg-red-700 text-white"}`}>{isfinished ? "Show Pending" : "Show Done"} </button>
          </div>
          <div className='w-[98%] h-[50vh] mx-auto my-2 overflow-y-auto overflow-x-hidden'>
            {sortedTodos.map(items => { const p = getPriority(items.Deadline); const badge = priorityLabel(items.Deadline); const border = p === 0 ? 'border-l-4 border-l-red-600' : p === 1 ? 'border-l-4 border-l-orange-500' : p === 2 ? 'border-l-4 border-l-yellow-500' : 'border-l-4 border-l-gray-300'; return (<div key={items.id} className={`w-full h-[15%] bg-white flex justify-center rounded-sm my-[2px] px-[5px] items-center ${border}`}>
              <button className='w-[5%] mx-[5px] h-[50%] flex border-black  text-white'>
                <input type="checkbox" checked={items.status} onClick={(e) => { handlestrike(e, items) }} readOnly />
              </button>
              <div className='w-[72%] h-full flex flex-col bg-white'>
                <div className={`w-full h-[57%] border-black text-black  flex pt-2 px-1  overflow-scroll overflow-x-hidden decoration-red-700 ${items.status ? "line-through text-green-800" : ""} `}>
                  {items.Todo}
                </div>
                <div className='w-full h-[20%] font-extralight mx-1 p-[1px] flex items-center gap-2'>
                  <span className='text-[11px] text-gray-500'>{items.Date}</span>
                  {items.Deadline && <span className={`text-[11px] px-2 rounded-full text-white ${badge.color}`}>
                    <span className='material-symbols-outlined text-[12px] align-middle'>event</span> {badge.text}: {formatDeadline(items.Deadline)}
                  </span>}
                </div>
              </div>
              <div className='w-[20%] h-[100%] flex justify-center items-center'>
                <button onClick={(e) => { handleDelete(e, items) }} className='w-[40%] mx-[2px] h-[80%] bg-blue-600 duration-75 hover:bg-blue-400  font-bold hover:font-extrabold border-black rounded-sm material-symbols-outlined text-white'>Delete</button>
                <button onClick={(e) => { handleedit(e, items) }} className='w-[40%] mx-[2px] h-[80%] bg-black hover:bg-gray-600 font-bold hover:font-extrabold border-black rounded-sm text-white material-symbols-outlined '>edit</button>
              </div>
            </div>)})}
            {Todos.length === 0 && <div className='w-full h-[100%] flex justify-center text-white items-center text-[25px]'>No Tasks Found</div>}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
      <InstallPrompt />
    </>
  )
}
export default App