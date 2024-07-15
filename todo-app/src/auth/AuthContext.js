import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
     //stringfy - to(json)         //parse - to{obj}
    const[user,setUser] = useState(null);                 //user info
    const[message , setMessage] = useState("");
    const navigate = useNavigate();            //to redirect via function


    const checkUserStatus = async(email) =>{
        const response = await fetch(`http://localhost:5000/users?email=${email}` , {method:"GET"});
        if(response.ok){
            const userData = await response.json();
            if(userData.length > 0){
                setUser(userData[0])
            }else{
                console.log('user doesnot exist')
                setUser(null)
                localStorage.removeItem("user")
            }       
        }else{
            console.log('something went wrong')
        }
    }

      //check user locked in state on page load
    useEffect(() =>{
        let localUser = JSON.parse(localStorage.getItem("user"));
        if(localUser){
            checkUserStatus(localUser.email)
        }
     } , []);

     //register user
     const registerUser = async (formData) =>{       
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        const checkUser = await fetch(`http://localhost:5000/users?email=${formData.email}` , {method:"GET"})
         
        if(checkUser.ok){
            const user = await checkUser.json();            //convert
            //console.log(user)
            if(user.length > 0){
                setMessage('user already exists!')
            }else{
                const response = await fetch("http://localhost:5000/users",config);

                if(response.status === 201){
                    const user = await response.json();
                    localStorage.setItem("user" , JSON.stringify(user))
                    setUser(user);
                    setMessage('Registered Successfully!')
                    navigate("/task-list");
                }else{
                    setMessage('something went wrong')
                }
            }
        }else{
            setMessage('something went wrong , try again!')
        }
    }

    //login user
    const loginUser = async (formData) => {
        const response = await fetch(`http://localhost:5000/users?email=${formData.email}&password=${formData.password}`,{method:"GET"})
        if(response.ok){
            const user= await response.json();
            if(user.length > 0){
                localStorage.setItem("user",JSON.stringify(user[0]));           //localstorage saves token(encrypted)
                setUser(user[0]);
                setMessage('Successfully logged in!')
                navigate("/task-list");
            }else{
                setMessage('email/password incorrect')
            }
        }else{
            setMessage('something went wrong')
        }
    }

    const updateUser = async(formData) =>{
        const config = {
            method:"PATCH",                     //will replace the updated data and existing will still be there
            headers:{
                "Content-Type" : "application/json"
            },
            body  : JSON.stringify(formData)                //formdata(argument)
        } 
        try{
            const response = await fetch(`http://localhost:5000/users/${formData.id}`,config)
            if(!response.ok){
                throw new Error(`!HTTP error status:${response.status}`)
            }
            const updatedUser = await response.json();
            setUser(updatedUser);
            setMessage("User updated successfully")
    
        }catch(error){
            console.error(error)
            setMessage("Failed to update user"); 
        }  
    }

    const logout = (e) =>{
        e.preventDefault();                          //to not show # in route
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    }


    return(
        <AuthContext.Provider value={{
            user,
            registerUser,
            loginUser,
            message,
            logout,
            setMessage,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;