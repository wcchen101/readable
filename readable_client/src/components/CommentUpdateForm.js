import React, { Component } from 'react'
import { updateComment } from '../utils/readableAPI'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class CommentUpdateForm extends React.Component {
   state = {
      preTimestamp: '',
      preBody: '',
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
    updateComment(this.state.id, this.state)
    window.location.reload()
  }
  updatePreComment(newcomment) {
    this.setState({
      preTimestamp: newcomment.timestamp,
      preBody: newcomment.body,
    })
  }
  render() {
    const { comment } = this.props
    let newcomment = comment.shift()
    if (newcomment) {
      this.updatePreComment(newcomment)
    }
    console.log('comment list c', newcomment)

    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      <div>
        <label>
          timestamp:
        </label>
        <div key=''>
        <input type="this.state.stamp" name='timestamp' ref='oldCommentTimestamp' value={this.state.preTimestamp} onChange={this.handleChange} />
        </div>
      </div>
      <div>
        <label>
          body:
        </label>
        <div key='this.state.body'>
        <input type="text" name='body' ref='oldCommentBody' value={this.state.preBody} onChange={this.handleChange} />
        </div>
      </div>
        <input type="submit" value="Update" />
      </form>
      </div>
    )
  }
}

export default CommentUpdateForm
