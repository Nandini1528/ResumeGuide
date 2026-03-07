import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const DashboardLayout = ({ activeMenu, children}) => {

    const { user, loading } = useContext(UserContext);

  return (
    <div>
        <Navbar activeMenu={activeMenu} />
        {loading && (
          <div className='container mx-auto pt-8 pb-4 text-slate-600'>Loading...</div>
        )}
        {!loading && !user && (
          <div className='container mx-auto pt-8 pb-4'>
            <p className='text-slate-700'>Session expired. Please sign in again.</p>
            <Link to='/' className='text-violet-600 font-semibold'>Go to Home</Link>
          </div>
        )}
        {!loading && user && <div className='container mx-auto pt-4 pb-4'>{children}</div>}
    </div>
  )
}

export default DashboardLayout
