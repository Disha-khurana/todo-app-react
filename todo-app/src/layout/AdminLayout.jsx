import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function AdminLayout(props) {
    return (
        <div className='container h-100'>
            <div className='row h-100'>
            <div className="col-lg-3 bg-primary h-100">
                <Link to='/admin/dashboard'>Dashboard</Link>
            </div>

            <div className="col-lg-9 bg-secondary h-100">
                <Outlet/>

            </div>
            </div>
            
            
        </div>
    );
}

export default AdminLayout;