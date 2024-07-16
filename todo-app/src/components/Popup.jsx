import React, { useContext, useRef } from 'react';
import { formatDate } from '../helper';
import TaskForm from './TaskForm';
import TaskContext from '../context/TaskContext';

function Popup(props) {
    const{task} = props;
    const{type,data} = task;
    const btnClose = useRef(null);
    const{deleteTask , tmessage} = useContext(TaskContext)

    const delTask = ()=>{
      deleteTask(data)     
    }
    
    return (
        <div className="modal" tabindex="-1" id='task-modal'>
  <div className="modal-dialog">
    <div className="modal-content bg-primary text-white">
      <div className="modal-header">
        <button ref={btnClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {
          type === "view" ?
                <div className='p-2'>
                  <h3>{data?.title}</h3>
                  <p>{data?.description}</p>
                  <div className='d-flex justify-content-between'>
                    <p className='mb-0 me-2'>Modified On:{formatDate(data?.modifiedon)}</p>
                    <p className='mb-0'>Due Date:{formatDate(data?.duedate)}</p>
                  </div>
                </div> :
          type === "edit" ?
                <div><TaskForm isUpdate={true} data={data} btnClose={btnClose} isPopup={true}/></div> : 
                <div className='p-2'>
                  <p>Do you want to delete the task?</p>
                  
                  <div className='d-flex'>
                  <p>{tmessage}</p> 
                  
                 <button className='btn btn-light ms-auto' onClick={delTask}  >Yes</button>            
                    <button className='btn btn-info ms-2' data-bs-dismiss="modal">No</button>
                
                  </div>
                </div>
        }
      </div>
    </div>
  </div>
</div>
    );
}

export default Popup;