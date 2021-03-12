import React, {useState} from 'react'
import {isEmpty, size} from 'lodash'
import shortid, { isValid } from 'shortid'


function App() {
const [task, setTask] = useState('')
const [tasks, setTasks] = useState([])
const [editMode, setEditMode] = useState(false)
const [id, setId] = useState("")
const [error, setError] = useState(null)

const validForm = ()=> {
  let isValid = true
  setError (null)

  if (isEmpty(task)) {
      setError("Debes ingresar una tarea.")
      isValid = false
    }

    return isValid
}


  const addTask = (e) => {
    e.preventDefault()
    
    if (!validForm()){
      return
    }

    const newTask = {
      id: shortid.generate(), 
      name: task
    }   

    setTasks([...tasks, newTask])
    setTask('')
  }



  const saveTask = (e) => {
    e.preventDefault()

    if (!validForm()){
      return
    }

   

    // el === id (es el id hoock de estado que obtine el valor actualizado al hacer click en editar tarea) 
    const editedTasks = tasks.map(item => item.id === id ? {id, name: task} : item)

    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setId("")
  }




  const deleteTask = (id) => {
    const filteredTasks = tasks.filter( x => x.id !== id)
    setTasks(filteredTasks)
  }

  const editTask = (theTask) => {
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)
  }

 


  return (
    <div className="container mt-5">      
      <h1>Tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          {
           size(tasks) === 0 ? (
           <li className="list-group-item">No hay tareas programadas</li>
           ) : (
          <ul className="list-group">
            {
              tasks.map((mitask)=> (
              <li className="list-group-item" key={mitask.id}>
                <span>{mitask.name}</span>
                <button
                 className="btn btn-danger btn-sm float-right mx-2"
                 onClick={() => deleteTask(mitask.id)}>
                   Eliminar
                </button>
                <button
                 className="btn btn-success btn-sm float-right"
                 onClick= { ()=> editTask(mitask)} >
                   Editar
                   </button>
              </li>
              ))
            }
          </ul>
            )
          }
        </div>
        <div className="col-4">
        <h4 className="text-center">
          { editMode ? "Modificar Tarea" : "Agregar Tarea"}
        </h4>          
        <form onSubmit={editMode ? saveTask : addTask}>      
        {         
        error && <span className="text-danger"> {error}</span>
        }
          <input
          onChange={(x) => setTask(x.target.value)}            
          value={task}
            type="text"
             className="form-control mb-2"
              placeholder="Ingrese la tarea">              
           </input>         
          <button
           type="submit"
            className={editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"}>
              { editMode ? "Guardar" : "Agregar"}
              </button>
        </form>
        </div>
      </div>
    </div>
  );
}


export default App;
