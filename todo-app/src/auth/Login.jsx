import React, { useContext, useEffect, useState } from 'react';
import AuthContext from './AuthContext';

function Login(props) {
    const[formData , setFormData ] = useState(null);
    const{message , loginUser , setMessage} = useContext(AuthContext);

    useEffect(()=>{
        setMessage("");
    },[])

    const handleChange = (e) =>{
        let{name , value} = e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }
        ))
    } 

    const submitForm = (e) =>{
        e.preventDefault();
        loginUser(formData);
    }
    
    return (
        <form>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input type="email" name="email" className='form-control' onChange={handleChange}/>
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type="password" name="password" className='form-control' onChange={handleChange}/>
            </div>
            <p>{message}</p>
            <button onClick={submitForm} className='btn btn-primary'>Login</button>
        </form>
    );
}

export default Login;