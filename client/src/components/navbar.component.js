import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    const handleLogout = () => {
            localStorage.removeItem("token");
            window.location.reload();
          };
    const user = localStorage.getItem("token");
    return (
      <nav className="navbar navbar-dark bg-success navbar-expand-lg">
        <Link to="/" className="navbar-brand">Task Managment</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav ms-auto">
        
          <li className="navbar-item">
          <Link to="/" className="nav-link">Tasks</Link>
          </li>
          <li className="navbar-item ml-auto">
          <Link to="/create" className="nav-link">New Task</Link>
          </li>
          <li className="navbar-item">
          <Link to="/complete" className="nav-link">Completed-Task</Link>
          </li>
          <li className="navbar-item">
          <Link to="/incomplete" className="nav-link">Incomplete-Task</Link>
          </li>
          <button onClick={handleLogout} className='btn btn-primary bg-success'>
					Logout
				  </button>
          
        </ul>
        </div>
      </nav>
    );
  }
}
