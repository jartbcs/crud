import React, {useState} from 'react'
import {isEmpty} from 'lodash'
import shortid from 'shortid'

//const [currentState, setNewState] =  useState({

function App() {
const [task, setTask] = useState('')
const [tasks, setTasks] = useState([])

  const addTask = (e) => {
    e.preventDefault()
    if (isEmpty(task)) {
      console.log("Task empty")
      return
    }

    const newTask = {
      id: shortid.generate(), 
      name: task
    }

    setTasks([...tasks, newTask])
    setTask('')
  }

  return (
    <div className="container mt-5">      
      <h1>Tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {
              tasks.map((mitask)=> (
              <li className="list-group-item" key={mitask.id}>
                <span>{mitask.name}</span>
                <button className="btn btn-danger btn-sm float-right mx-2">Eliminar</button>
                <button className="btn btn-success btn-sm float-right">Editar</button>
              </li>
              ))
            }
          </ul>
        </div>
        <div className="col-4">
        <h4 className="text-center">Formulario</h4>          
        <form onSubmit={addTask}>
          <input
          onChange={(x) => setTask(x.target.value)}            
          value={task}
            type="text"
             className="form-control mb-2"
              placeholder="Ingrese la tarea">              
           </input>
          <button type="submit" className="btn btn-dark btn-block">Agregar</button>
        </form>
        </div>
      </div>
    </div>
  );
}


export default App;
