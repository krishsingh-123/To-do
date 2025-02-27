import React, { useState } from 'react'

export default function To_do() {

    const [todo , settodo] = useState([]) ;
    const [status , setstatus] = useState({}) ; 

    const handleSubmit = (event) => {
        event.preventDefault();
        let task = event.target.work.value ;
        if(task.length === 0 || todo.includes(task)){
            alert("Invalid Input") ;
            return ;
        }
        settodo([...todo , task]) ;
        event.target.reset() ;
        
      }

      const toggleStatus = (task) => {
        setstatus((prevStatus) => ({
           ...prevStatus , [task] : !prevStatus[task]
        })) ;  
    };

    const handleDelete = (task) => {
        settodo(todo.filter((t)=> t!==task)) ;
        setstatus((prevStatus) =>{
            const updatedStatus = { ...prevStatus };
            delete updatedStatus[task]; 
            return updatedStatus;
        });
    };

  return (
    <>
    <div className='container my-5'>
         <div className='mx-auto rounded border p-4 ' style={{width:'600px', backgroundColor:'rgb(15, 199, 232)'}}>
            <h3 className='text-white text-center mb-5'>Todo List</h3>
            <form className="d-flex" onSubmit={handleSubmit}>
               <input className="form-control me-2" style={{border:'none'}} placeholder="Add New Task" name='work'/>
               <button className="btn btn-outline-light" type="submit">add</button>
            </form>

             {
                todo.map((to_do) => {
                    return (
                     <div className='container mt-4 p-2 d-flex' style={{backgroundColor : status[to_do] ? 'rgb(130, 227, 113)' :'rgb(242, 242, 242)'}} onClick={()=> handleEdit(to_do)}>
                           <div className='me-auto'>
                               {to_do}
                            </div>
                            <div className="d-flex align-items-center">
                               <i className={status[to_do] ? 'bi bi-check-square' : 'bi bi-square'} style={{ marginRight: '15px', cursor: 'pointer' }}onClick={()=>toggleStatus(to_do)}></i>
                               <i className="bi bi-trash" style={{ cursor: 'pointer' }} onClick={() => handleDelete(to_do)}></i>
                            </div>        
                        </div>
                    )
                    
                })
                  
             }
         </div>
    </div>
    </>
  )
}


