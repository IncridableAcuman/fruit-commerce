import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import Layout from './layout/Layout';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <>
    <ToastContainer position={"bottom-right"} />
    <Routes>
      <Route path='/' element={<Layout/>} >
          <Route index element={<Home/>} />  
          <Route path='add' element={<Dashboard/>} />      
      </Route>
          <Route path='/login' element={<Login/>} />
    </Routes>
    </>
  )
}

export default App