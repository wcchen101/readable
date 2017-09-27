import React, { Component } from 'react'
import { writePost } from '../utils/readableAPI'
import { connect } from 'react-redux'

class PostForm extends React.Component {
   state = {
     id: this.props.post && this.props.post.id,
     timestamp: this.props.post && this.props.post.timestamp,
     title: this.props.post && this.props.post.title,
     body: this.props.post && this.props.post.body,
     author: this.props.post && this.props.post.author,
     category: this.props.post && this.props.post.category,
    }

  handleChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let categoryCheck = this.state.category
    let categoryPool = ['react', 'redux', 'udacity']
    if (categoryCheck !== 'react' && categoryCheck !== 'redux' && categoryCheck !== 'udacity') {
      window.alert('No match cateogry, Please enter new one')
      return
    }
    writePost(this.state)
    window.location.reload()
  }
  render() {
    console.log('post', this.props.post)
    const { post } = this.props
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
        <input type="text" name='body' value={this.state.body}  onChange={this.handleChange} />
      </div>
      <div>
        <label>
          author:
        </label>
          <input type="text" name='author' value={this.state.author}  onChange={this.handleChange} />
      </div>
      <div>
        <label>
          category:
        </label>
          <input type="text" name='category'  value={this.state.category} onChange={this.handleChange} />
      </div>
      <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}
export default PostForm
