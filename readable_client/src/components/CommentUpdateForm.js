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
    updateComment(this.props.comment[0].id, this.state)
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
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      <div>
        <label>
          timestamp:
        </label>
        <input type="text" name='preTimestamp' value={this.state.preTimestamp} onChange={this.handleChange} />
      </div>
      <div>
        <label>
          body:
        </label>
        <input type="text" name='preBody' value={this.state.preBody} onChange={this.handleChange} />
      </div>
        <input type="submit" value="Update" />
      </form>
      </div>
    )
  }
}

export default CommentUpdateForm
