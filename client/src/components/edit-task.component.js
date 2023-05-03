import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}
class EditTask extends Component{
  
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeComplete = this.onChangeComplete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      description: '',
      complete: false
    }
  }

  componentDidMount(){
    let { id } = this.props.params;

    axios.get('http://localhost:3003/api/tasks/' + id)
    .then(response => {
      this.setState({
        title: response.data.title,
        description: response.data.description,
        complete: response.data.complete
      })
    })
    .catch(function (error){
      console.log(error)
    })
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeComplete(e) {
    this.setState({
      complete: true
    })
  }


  onSubmit(e) {
    e.preventDefault();
    let { id } = this.props.params;

    const task = {
      title: this.state.title,
      description: this.state.description,
      complete: this.state.complete
    }

    console.log(task);

    axios.post('http://localhost:3003/api/tasks/update/' + id, task)
      .then(res => console.log(res.data));

    window.location = '/';
  }


  render() { 
    return (
    <div>
      
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label><h2>Title: </h2></label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />

        </div>
        <div className="form-group"> 
          <label><h2>Description: </h2></label>
          
          <textarea class="form-control" 
          required 
          value={this.state.description} 
          onChange={this.onChangeDescription} 
          rows="3">
          </textarea>
        </div>
        <button onClick={this.onChangeComplete} className='btn btn-primary bg-success' style={{marginBottom: 10 + 'px', marginTop : 10 + 'px'}}>click to mark complete</button>

        <div className="form-group m-auto">
          <input type="submit" value="Edit Task" className="btn btn-primary bg-success" />
        </div>
      </form>
    </div>
    )
  }
}

export default withParams(EditTask);
