import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Signup from "./components/Singup/index";
import Login from "./components/Login/index";

import Navbar from "./components/navbar.component"
import TaskList from "./components/tasks-list.component";
import EditTask from "./components/edit-task.component";
import CreateTask from "./components/create-task.component";
import CompleteTask from './components/completed-task.component';
import IncompleteTask from './components/incomplete-task.component';

function App() {
	const user = localStorage.getItem("token");
	return (
	  <BrowserRouter>
		<Navbar />
		<Routes> 
		  {user && <Route path="/" element={<TaskList />} />}
		  {user && <Route path="/edit/:id" element={<EditTask />} />}
		  {user && <Route path="/create" element={<CreateTask />} />}
		  {user && <Route path="/complete" element={<CompleteTask />} />}
		  {user && <Route path="/incomplete" element={<IncompleteTask />} />}
		  <Route path="/signup" element={<Signup />} />
		  <Route path="/login" element={<Login />} />
		  <Route path="/" element={<Navigate replace to="/login" />} />
		  <Route path="/edit/:id" element={<Navigate replace to="/login" />} />
		  <Route path="/create" element={<Navigate replace to="/login" />} />
		  <Route path="/complete" element={<Navigate replace to="/login" />} />
		  <Route path="/incomplete" element={<Navigate replace to="/login" />} />
		</Routes>
	  </BrowserRouter>
	);
}


export default App;

