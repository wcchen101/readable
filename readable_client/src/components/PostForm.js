import React, { Component } from 'react'
import { writePost } from '../utils/readableAPI'
import { connect } from 'react-redux'

class PostForm extends React.Component {
   state = {
      id: '',
      timestamp: '',
      title: '',
      body: '',
      author: '',
      category: '',
    }

  handleChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('state', this.state)
    writePost(this.state)
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      <div>
        <label>
          id:
        </label>
        <input type="text" name='id' value={this.state.id} onChange={this.handleChange} />
      </div>
      <div>
        <label>
          timestamp:
        </label>
        <input type="text" name='timestamp' value={this.state.timestamp} onChange={this.handleChange} />
      </div>
      <div>
        <label>
          title:
        </label>
        <input type="text" name='title' value={this.state.title} onChange={this.handleChange} />
      </div>
      <div>
        <label>
          body:
        </label>
        <input type="text" name='body' value={this.state.body} onChange={this.handleChange} />
      </div>
      <div>
        <label>
          author:
        </label>
          <input type="text" name='author' value={this.state.author} onChange={this.handleChange} />
      </div>
      <div>
        <label>
          category:
        </label>
          <input type="text" name='category' value={this.state.category} onChange={this.handleChange} />
      </div>
      <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}
export default PostForm
