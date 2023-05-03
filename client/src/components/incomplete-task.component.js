import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Task = props => (
  props.task.complete ? "" :
    <div  className='bg-light' style={{marginTop : 10 + 'px', marginBottom: 10 + 'px', paddingLeft: 10 + '%', paddingRight: 10 + '%'}}>
    <details>
    
    <summary style={{fontSize: 30 + 'px'}}>{props.task.title}</summary>
    
    <p style={{fontSize: 20 + 'px'}}>{props.task.description}</p>
    <p style={{fontSize: 20 + 'px'}}>Due Date: {props.task.date.substring(0,10)}</p>
    <button onClick={() => { props.deleteTask(props.task._id) }} className='btn btn-primary bg-success'>
					Delete
				  </button>
    <button className='btn btn-primary bg-success' style={{marginLeft: 10 + 'px'}}> <Link to={"/edit/"+props.task._id} style={{color: "white", textDecoration: 'none'}}> edit</Link> 
    </button> 
    </details>
    </div>
)


export default class IncompleteTask extends Component{

  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this)

    this.state = {tasks: []};
  }

  componentDidMount() {
    axios.get('http://localhost:3003/api/tasks/')
      .then(response => {
        this.setState({ tasks: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  taskList() {
    return this.state.tasks.map(currenttask => {
      return <Task task={currenttask} deleteTask={this.deleteTask} key={currenttask._id}/>;
    })
  }

  deleteTask(id) {
    axios.delete('http://localhost:3003/api/tasks/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      tasks: this.state.tasks.filter(el => el._id !== id)
    })
  }

  render() {
    return (
      <div>

            { this.taskList() }

      </div>
    )
  }
}


