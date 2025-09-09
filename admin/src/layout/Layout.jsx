import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {


  return (
    <div className='flex min-h-screen'>
        <Sidebar/>
        <div className="flex flex-col flex-1">
            <Navbar/>
            <main className='pt-16 px-5 overflow-y-auto flex-1 lg:ml-32'>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default Layout