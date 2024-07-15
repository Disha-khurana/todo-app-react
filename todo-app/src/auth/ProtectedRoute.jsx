import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const[isLoggedIn , setIsLoggedIn ] = useState(false);
    const navigate = useNavigate();

    const checkUserStatus = async(email) =>{
        const response = await fetch(`http://localhost:5000/users?email=${email}` , {method:"GET"});
        if(response.ok){
            const userData = await response.json();
            if(userData.length > 0){
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
                localStorage.removeItem("user");
                navigate("/login");
            }       
        }else{
            console.log('something went wrong')
        }
    }

    useEffect(() => { 
        let localUser = JSON.parse(localStorage.getItem("user"));
        if(localUser){
            checkUserStatus(localUser.email);
        }else{
            setIsLoggedIn(false);
            navigate("/login");
        }
    } , [])

    return (isLoggedIn ? children : null);
}

export default ProtectedRoute;