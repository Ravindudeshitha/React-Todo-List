import { useEffect, useRef, useState } from "react";
import TodoList from "./TodoList";
import './TodoStyle.css';



let taskNum =0;

function Todo() {
    

    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null);
    const [filterStatus, setFilterStatus] = useState(['', 'complete', 'incomplete']);

    const taskAdd = () =>{
        setTodos([...todos , {no:taskNum++ , task: inputRef.current.value , status:'incomplete'}]);

        localStorage.setItem('taskNum', taskNum);

        inputRef.current.value = '';
        
    }

    useEffect(() =>{
        setTodos(JSON.parse(localStorage.getItem('Todos')));
        
        taskNum = localStorage.getItem('taskNum');
    },[]);

    useEffect(() =>{
        setTimeout(() =>{
            localStorage.setItem('Todos' , JSON.stringify(todos));
            
        },100);
    }, [todos]);
    

  return (
    <div className='todoList'>
        <div className='header'>
            <h1>ToDo List</h1>
        </div>

        <div className='todoAdd'>
            <input ref={inputRef} type='text' name='inputTask' className='inputTask'/>

            <button type='submit' className='addBtn' onClick={() => {taskAdd()}}>ADD</button>
        </div>

        <div className='filterButton'>
            <button type='submit' className='allBtn' onClick={() => setFilterStatus(['','complete', 'incomplete'])}>All</button>
            <button type='submit' className='completeBtn' onClick={() => setFilterStatus(['complete'])}>Completed</button>
            <button type='submit' className='incompleteBtn' onClick={() => setFilterStatus(['incomplete'])}>Incomplete</button>
        </div>

        <div className='todoTasks'>
            {todos.map((todo, index) => {
                if(filterStatus.includes(todo.status)){
                    return <TodoList key={index} no={todo.no} task={todo.task} status={todo.status} todos={todos} setTodos={setTodos}/>
                } else {
                    return null; 
                }
            })}
        </div>


    </div>
  )
}

export default Todo