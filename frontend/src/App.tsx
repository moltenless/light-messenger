import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Chats from './pages/Chats';
import Users from './pages/Users';
import Chat from './pages/Chat';
import ProtectedRoute from './state/ProtectedRoute';
import { useAuthStore } from './state/useAuthStore';
import { useEffect } from 'react';


function App() {
  const fetchMe = useAuthStore(state => state.fetchMe)
  useEffect(() => {
    fetchMe()
  }, [fetchMe])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<Layout />}>
          <Route path='/chats' element={<ProtectedRoute><Chats /></ProtectedRoute>}/>
          <Route path='/users' element={<ProtectedRoute><Users /></ProtectedRoute>}/>
          <Route path='/chats/:convoId' element={<ProtectedRoute><Chat /></ProtectedRoute>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
