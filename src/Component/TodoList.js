import { useState } from 'react';
import cross from '../Assets/cross.png';
import tick from '../Assets/tick.png';
import untick from '../Assets/untick.png';

function TodoList(props) {

    const [cutLine, setCutLine] = useState('taskIncomplete');
    
    const handleTick = (no) =>{
        let todos = JSON.parse(localStorage.getItem('Todos'));

        for(let i=0; i< todos.length; i++){
            if(todos[i].no === no){
                if(todos[i].status === 'incomplete'){
                    todos[i].status = 'complete';
                    setCutLine('taskComplete');
                }
                else{
                    todos[i].status = 'incomplete';
                    setCutLine('taskIncomplete');
                }
                
                break;
            }
        }

        props.setTodos(todos);
    }

    const handleDelete = (no)=> {
        let todos = JSON.parse(localStorage.getItem('Todos'));

        todos = todos.filter((todo) => todo.no !== no );

        props.setTodos(todos);
    }

  return (
    <div className="todoTask">
        <div className='tickUntick' onClick={() =>{handleTick(props.no)}}>
            {props.status === 'incomplete'?<img src={untick} alt='' />:<img src={tick} alt='' />}

            <div className={cutLine}>{props.task}</div>
        </div>


        <div className='deleteTick' onClick={() => {handleDelete(props.no)}}>
            <img src={cross} alt=''/>
        </div>

    </div>
  )
}

export default TodoList