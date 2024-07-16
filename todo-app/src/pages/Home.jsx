import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import illustration from '../assets/illustration.png';

function Home(props) {
    return (
        <div className='container-fluid h-100'>
            <div className='row h-100'>
                <div className='col-lg-6 justify-content-center align-items-center bg-primary h-100 d-flex flex-column'>
                    <h1 className='display-5 text-center text-white text-uppercase'>An App to<br/>
                        make your life<br/>
                        <span className='display-2'>easy</span></h1>

                        <img className='img-fluid mt-5' src={illustration} alt=""/>

                </div>
                <div className='col-lg-6 justify-content-center align-items-center h-100 d-flex flex-column'>
                    <div className='card w-50'>
                        <div className='card-header d-flex rounded-0 '>
                            <Link to="/login" className=' py-3 px-2 w-50 text-decoration-none'>Login</Link>
                            <Link to="/register" className=' py-3 px-2 w-50 text-decoration-none'>Register</Link>
                        </div>
                        <div className='card-body'>
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;