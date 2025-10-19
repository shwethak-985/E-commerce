import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './adminSidebar'

const AdminLayout = () => {
    const [issidebaropen, setsidebaropen] = React.useState(false);
    const handlesidebaropen = () => {
        setsidebaropen(!issidebaropen)
    }
  return (
    <div className='min-h-screen flex flex-col md:flex-row relative'>
        {/* mobile toggle button */}
        <div className='flex md:hidden p-4 bg-gray-900 text-white z-20'>
            <button onClick={handlesidebaropen} className='flex items-center'>
                <i className="ri-menu-2-line text-2xl"></i>
                
            </button>
            <h1 className='text-xl font-bold ml-2'>Admin Dashboard</h1>

        </div>
        {/* overlay for mobile sidebar */}
        {issidebaropen && <div className='fixed inset-0 bg-black opacity-50 z-10' onClick={handlesidebaropen}></div>}
        {/* sidebar */}
        <div className={`fixed top-0 left-0 w-64 bg-gray-800 text-white h-full transition-transform duration-300 transform 
            ${issidebaropen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-20`}>
            {/* sidebar */}
            <AdminSidebar />
            </div>
            {/* main content */}
            <div className='flex-grow p-6 overflow-auto md:ml-64'>
                <Outlet/>
                </div>

    </div>
  )
}

export default AdminLayout 