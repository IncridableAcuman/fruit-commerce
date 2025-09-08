import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
    <ToastContainer position={"bottom-right"} />
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<Home/>} />
    </Routes>
    </>
  )
}

export default App