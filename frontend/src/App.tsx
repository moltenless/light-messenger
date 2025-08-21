import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Chats from './pages/Chats';
import Users from './pages/Users';
import Chat from './pages/Chat';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<Layout />}>
          <Route path='/chats' element={<Chats />}/>
          <Route path='/users' element={<Users />}/>
          <Route path='/chats/:convoId' element={<Chat />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
