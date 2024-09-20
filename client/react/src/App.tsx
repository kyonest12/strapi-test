import './App.css'
import Login from './Login'
import TodoList from './TodoList'
import NavBar from './NavBar'
import { Routes, Route} from 'react-router-dom'
import EditTodo from './Edit'
import Add from './Add'
import Register from './Register'

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/add" element={<Add />}/>
        <Route path='register' element={<Register/>} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/todo/:id" element={<EditTodo/>} />
      </Routes> 
    </div>
  )
}

export default App
