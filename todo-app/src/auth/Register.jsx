import React, { useContext, useEffect, useState } from 'react';
import AuthContext from './AuthContext';

function Register(props) {
    const [formData , setFormData ] = useState(null);
    const {registerUser , message , setMessage} = useContext(AuthContext);

    useEffect(()=>{
        setMessage("");
    },[])                             //without array leads to infinite loop

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
        registerUser(formData);
    }


    return (
        <form>
            <div className='mb-3'>
                <label className='form-label'>Name</label>
                <input type="text" name="name" className='form-control' onChange={handleChange} />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input type="email" name="email" className='form-control' onChange={handleChange}/>
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type="password" name="password" className='form-control' onChange={handleChange}/>
            </div>
            <p>{message}</p>
            <button onClick={submitForm} className='btn btn-primary'>Register</button>
        </form>
    );
}

export default Register;