import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import AddTask from './Components/AddTask'
import EditTask from './Components/EditTask'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<BrowserRouter>
<Routes>
<Route path='/' element={< AddTask/>}></Route>
<Route path='/EditTask/:id' element={< EditTask/>}></Route>
</Routes>
</BrowserRouter>

);

