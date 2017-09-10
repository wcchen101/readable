import React, { Component } from 'react'
import { writePost } from '../utils/readableAPI'

class PostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    console.log('state value', this.state.value)

    writePost(this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          id:
          <input type="text" value={this.state.value.id} onChange={this.handleChange} />
        </label>
        <label>
          timestamp:
          <input type="text" value={this.state.value.timestamp} onChange={this.handleChange} />
        </label>
        <label>
          title:
          <input type="text" value={this.state.value.title} onChange={this.handleChange} />
        </label>
        <label>
          body:
          <input type="text" value={this.state.value.body} onChange={this.handleChange} />
        </label>
        <label>
          author:
          <input type="text" value={this.state.value.author} onChange={this.handleChange} />
        </label>
        <label>
          category:
          <input type="text" value={this.state.value.category} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}
export default PostForm