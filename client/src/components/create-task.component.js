import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateTask extends Component{
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      description: '',
      complete: false,
      date: new Date()
    }
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

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }
  


  onSubmit(e) {
    e.preventDefault();

    const task = {
      title: this.state.title,
      description: this.state.description,
      complete: this.state.complete,
      date: this.state.date
    }

    console.log(task);

    axios.post('http://localhost:3003/api/tasks/add', task)
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

        <div className="form-group"> 
          <label><h2>Due Date: </h2></label>
          <div>
          <DatePicker
           selected = {this.state.date}
           onChange = {this.onChangeDate}
           />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Task" className="btn btn-primary bg-success" style={{marginTop : 10 + 'px'}}/>
        </div>
      </form>
    </div>
    )
  }
}
