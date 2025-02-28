import React, { useState } from 'react';

export default function ToDo() {
    const [todo, setTodo] = useState([]);
    const [status, setStatus] = useState({});
    const [editing, setEditing] = useState(null);
    const [editValue, setEditValue] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        let task = event.target.work.value;
        if (task.length === 0 || todo.includes(task)) {
            alert("Invalid Input");
            return;
        }
        setTodo([...todo, task]);
        event.target.reset();
    };

    const toggleStatus = (task) => {
        setStatus((prevStatus) => ({
            ...prevStatus,
            [task]: !prevStatus[task]
        }));
    };

    const handleDelete = (task) => {
        setTodo(todo.filter((t) => t !== task));
        setStatus((prevStatus) => {
            const updatedStatus = { ...prevStatus };
            delete updatedStatus[task];
            return updatedStatus;
        });
    };

    const handleEdit = (task) => {
        setEditing(task);
        setEditValue(task);
    };

    const handleEditChange = (event) => {
        setEditValue(event.target.value);
    };

    const handleEditSubmit = (task) => {
        if (editValue.trim() === "" || todo.includes(editValue)) {
            alert("Invalid or Duplicate Task");
            return;
        }
        setTodo(todo.map((t) => (t === task ? editValue : t)));
        setStatus((prevStatus) => {
            const updatedStatus = { ...prevStatus };
            updatedStatus[editValue] = updatedStatus[task];
            delete updatedStatus[task];
            return updatedStatus;
        });
        setEditing(null);
    };

    return (
        <div className='container my-5 d-flex align-items-center justify-content-center'>
            <div className=' rounded border p-4 ' style={{ width: '600px', backgroundColor: 'rgb(15, 199, 232)' }}>
                <h3 className='text-white text-center mb-5'>Todo List</h3>
                <form className='d-flex' onSubmit={handleSubmit}>
                    <input className='form-control me-2' style={{ border: 'none' }} placeholder='Add New Task' name='work' />
                    <button className='btn btn-outline-light' type='submit'>Add</button>
                </form>

                {todo.map((to_do , index) => (
                    <div key={index} className='container mt-4 p-2 d-flex ' style={{ backgroundColor: status[to_do] ? 'rgb(130, 227, 113)' : 'rgb(242, 242, 242)' }}>
                        {editing === to_do ? (
                            <input 
                                className='form-control me-2' 
                                value={editValue} 
                                onChange={handleEditChange} 
                                onBlur={() => handleEditSubmit(to_do)}
                                onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit(to_do)}
                                autoFocus
                            />
                        ) : (
                            <div className='me-auto' style={{ cursor: 'pointer' }}>
                                {to_do}
                            </div>
                        )}
                        <div className='d-flex align-items-center'>
                            <i className={status[to_do] ? 'bi bi-check-square' : 'bi bi-square'} style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => toggleStatus(to_do)}></i>
                            <i className='bi bi-pencil' style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => handleEdit(to_do)}></i>
                            <i className='bi bi-trash' style={{ cursor: 'pointer' }} onClick={() => handleDelete(to_do)}></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
