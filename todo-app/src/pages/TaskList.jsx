import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskContext from '../context/TaskContext';
import { formatDate } from '../helper/index';
import{FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import{faEye , faPenToSquare , faTrash} from '@fortawesome/free-solid-svg-icons'
import Popup from '../components/Popup';

const reducer = (state,action) =>{
    switch(action.type){
        case "VIEW": return{type:"view" , data: action.payload};
        case "EDIT": return{type:"edit" , data: action.payload};
        case "DELETE": return{type:"delete" , data: action.payload};
        default: return state;
    }
}

function TaskList(props) {
    const init = {type:null , data:null}
    const{ allTasks } = useContext(TaskContext);
    const[state,dispatch] = useReducer(reducer,init);
    const[filteredTasks,setFilteredTasks]=useState(null);

    useEffect(()=>{
        setFilteredTasks(allTasks);
    },[allTasks])


    const handleSearch = (e)=>{
        let{ value }=e.target;
        let filteredValue = allTasks.filter((task)=>(
            task.title.toLowerCase().includes(value.toLowerCase())
        ))
        setFilteredTasks(filteredValue);


    }

    return (
        <div className='container'>
            <div className='p-4 bg-primary text-white mt-5'>
                <div className='d-flex justify-content-between p-2'>
                    <h3 className='mb-0'>Task List</h3>
                    <Link className='btn btn-info' to='/create-task'>Create Task</Link>
                </div>

                <div className='py-2'>
                    <input type='text' className='form-control' placeholder='Search Task' onChange={handleSearch}/>
                </div>

                <div className='p-2'>
                    <div className='row bg-dark rounded-1 py-2 mb-1'>
                        <div className='col-lg-1'>Sr. No.</div>
                        <div className='col-lg-2'>Title</div>
                        <div className='col-lg-4'>Description</div>
                        <div className='col-lg-2'>DueDate</div>
                        <div className='col-lg-3'>Actions</div>
                    </div>
                    {
                        filteredTasks?.map((task)=>(
                      <div key={task.id} className='row bg-dark rounded-1 py-2 mb-1'>
                        <div className='col-lg-1'>{task.id}</div>
                        <div className='col-lg-2'>{task.title}</div>
                        <div className='col-lg-4'>{task.description}</div>
                        <div className='col-lg-2'>{formatDate(task.duedate)}</div>
                        <div className='col-lg-3'>
                            <span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type:"VIEW" , payload : task})}}>
                                <FontAwesomeIcon icon={faEye}/>
                            </span>
                            <span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type:"EDIT" , payload : task})}}>       
                                <FontAwesomeIcon icon={faPenToSquare}/>
                            </span>
                            <span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type:"DELETE" , payload : task})}}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </span>
                        </div>
                    </div>

                        ))
                    }

                </div>

            </div>
            <Popup task={state}/>
        </div>
    );
}

export default TaskList;