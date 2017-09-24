import React, { Component } from 'react'
import { writeComment } from '../utils/readableAPI'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/FlatButton';

class CommentForm extends React.Component {
   state = {
      id: this.props.comment && this.props.comment.id,
      timestamp: this.props.comment && this.props.comment.timestamp,
      body: this.props.comment && this.props.comment.body,
      author: this.props.comment && this.props.comment.author,
      parentId: this.props.postId,
    }

  handleChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    writeComment(this.state)
    window.location.reload()
  }
  render() {
    const { postId } = this.props
    console.log(postId)
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
        <input type="text" name='body' value={this.state.body} onChange={this.handleChange} />
      </div>
      <div>
        <label>
          body:
        </label>
        <input type="text" name='author' value={this.state.author} onChange={this.handleChange} />
      </div>
        <RaisedButton primary={true}><input type="submit" value="Submit" /></RaisedButton>
      </form>
      </div>
    )
  }
}

export default CommentForm
