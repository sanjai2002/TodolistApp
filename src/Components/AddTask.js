import React, { useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import '../Components/Style/Todolist.css'
import 'bootstrap/dist/css/bootstrap.css'

// icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function AddTask(){
//view task
const [data, setData] = useState([])
useEffect(() => {
    axios.get('http://localhost:3001/todolist')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
}, [])

//add Task
//find current date 
let today = new Date();
today.setDate(today.getDate()); 
let month = String(today.getMonth() + 1).padStart(2, '0');
let day = String(today.getDate()).padStart(2, '0');
let date = day +'-'+ month+'-' +today.getFullYear();


//find current Time 
let currentDate = new Date();
let Time = currentDate.toLocaleTimeString();

const [values, setValues] = useState({
        Taskname: '',
        Date:date,
        Time:Time,
    })
  
const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/todolist', values)
            .then(res => {
                console.log(res);  
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

//Delele Task 


const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete('http://localhost:3001/todolist/'+ id)
          .then(res => {  
              window.location.reload();
          }).catch(err => console.log(err));
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
 
}

 const handleCheckboxChange = (id) => {
    setData(data.map(task => {
      if (task.id === id) {
        return { ...task, isChecked: !task.isChecked };
      }
      return task;
    }));
  };

return(
        <div className="">
        <div className="AddTask">
        <h2>TodoList App</h2>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div >
          <input type="text" name="Taskname" placeholder="Enter Task"
            onChange={e => setValues({ ...values, Taskname: e.target.value })} />
          </div>
          <button>Add</button>
        </form>
      </div>

    {/* view task */}
      <div className="ViewTask">
        <table>
          <tbody>
            {data.map((task) => (
              task.Date==date?<>
              <tr key={task.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={task.isChecked}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                </td>
                <td style={{ textDecoration: task.isChecked ? 'line-through' : 'none' }}>
                  {task.Taskname} <br></br>
                  {task.Date} {task.Time}
                </td>
                <div className="Editdeletebtn">
                <td>
                  <Link to={`/EditTask/${task.id}`}><EditIcon/></Link>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(task.id)}><DeleteOutlineIcon/></button>
                </td>
                </div>  
              </tr>
              </>:<>
              <tr key={task.id} className="Overduealert">
                <td>
                  <input
                    type="checkbox"
                    checked={task.isChecked}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                </td>
                <td style={{ textDecoration: task.isChecked ? 'line-through' : 'none' }}>
                  {task.Taskname} <br></br>
                  {task.Date} {task.Time}
                </td>
                <div className="Editdeletebtn">
                <td>
                  <Link to={`/EditTask/${task.id}`}><EditIcon/></Link>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(task.id)}><DeleteOutlineIcon/></button>
                </td>
                </div>  
              </tr>
              </>
              
            ))}
          </tbody>
        </table>
      </div>
      </div>
    )
}

export default AddTask;