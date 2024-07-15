import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import AuthContext from "../auth/AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const[tmessage , setTmessage] = useState("");
    const{user} = useContext(AuthContext);

    const[allTasks , setAllTasks] = useState(null);
    const[recentTasks , setRecentTasks] = useState(null);
    const[latestTask , setLatestTask] = useState(null);

    //save task
    const saveTask = async (formData) =>{             //formdata(parameter)
        const config = {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body  : JSON.stringify(formData)                //formdata(argument)
        }                                                   

        try{
        const response = await fetch(`http://localhost:5000/tasks` , config)
        if(!response.ok){
            throw new Error(`!Http Error status:${response.status}`);            
        }
        setTmessage("Task created successfully");
        getAllTasks(user.id);


    }catch(error){
        console.log(error.message);

    }
}

const getAllTasks = async(id) =>{
    try{
        const response = await fetch(`http://localhost:5000/tasks?userid=${id}`,{method:"GET"});
        if(!response.ok){
            throw new Error(`!HTTP error status:${response.status}`)
        }
        const tasks = await response.json();                //json-manual fxn in fetch for response data
        setAllTasks(tasks);
        let recent = tasks.slice(-3);
        setRecentTasks(recent);
        let latest = tasks[tasks.length - 1];
        setLatestTask(latest);

    }catch(error){
        console.log(error.message)             //(white color err msg)
        //console.error()                       (red color err msg)

    }
}

const updateTask = async(formData) =>{
    const config = {
        method:"PATCH",                     //will replace the updated data and existing will still be there
        headers:{
            "Content-Type" : "application/json"
        },
        body  : JSON.stringify(formData)                //formdata(argument)
    } 
    try{
        const response = await fetch(`http://localhost:5000/tasks/${formData.id}`,config)
        if(!response.ok){
            throw new Error(`!HTTP error status:${response.status}`)
        }
        setTmessage("Task updated successfully")
        getAllTasks(user.id);                  //get updated value

    }catch(error){
        console.error(error)
    }


}

//to del task
const deleteTask = async(formData) =>{
    const config = {
        method:"DELETE"                     //will replace the updated data and existing will still be there
    } 
    try{
        const response = await fetch(`http://localhost:5000/tasks/${formData.id}`,config)
        if(!response.ok){
            throw new Error(`!HTTP error status:${response.status}`)
        }
        setTmessage("Task deleted successfully")
        getAllTasks(user.id);                  //get updated value

    }catch(error){
        console.error(error)
    }


}


//useEffect runs one time when no dependency added
    useEffect(()=>{
        if(user){
           getAllTasks(user.id);
        }
    },[user]);


    return(
        <TaskContext.Provider value={{
            saveTask,
            tmessage,
            allTasks,
            recentTasks,
            latestTask,
            setTmessage,
            updateTask ,
            deleteTask  
        }}>
            {children}
        </TaskContext.Provider>
    )

}
export default TaskContext;