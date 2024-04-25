import { useState,useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate} from "react-router-dom";
function EditTask(){   
//find current date 
let today = new Date();
today.setDate(today.getDate()); // Add 5 days
let month = String(today.getMonth() + 1).padStart(2, '0');
let day = String(today.getDate()).padStart(2, '0');
let date1 = day +'-'+ month+'-' +today.getFullYear();
//find current Time 

let currentDate = new Date();
let Time1 = currentDate.toLocaleTimeString(); 
  const {id}=useParams();
  const [values, setValues] = useState({
    Taskname: '',
    Date:date1,
    Time:Time1,
})
    useEffect(() => {
        axios.get('http://localhost:3001/todolist/'+ id)
            .then(res => {
                    setValues(res.data)
                })
                .catch(err => console.log(err));
        }, [])

const navigate = useNavigate();
const handleUpdate = (event) => {
    event.preventDefault();
    axios.put('http://localhost:3001/todolist/' + id, values)
        .then(res => {
            navigate('/')
        })
        .catch(err => console.log(err));
}
    return(
        <>
        <div className="AddTask">
        <h2>TodoList App</h2>
        <form onSubmit={handleUpdate}>
          <div >
            <input type="text" name="Taskname" value={values.Taskname}
            onChange={e => setValues({ ...values, Taskname: e.target.value })} />
          </div>
          <button>Update Task</button>
        </form>
      </div>
        </>
    )
}


export default EditTask;