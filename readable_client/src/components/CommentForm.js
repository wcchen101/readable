import React, { Component } from 'react'
import { writeComment } from '../utils/readableAPI'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/FlatButton';
import { postNewComment } from '../actions'

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
    const id = this.refs.id.value
    const timestamp = this.refs.timestamp.value
    const body = this.refs.body.value
    const author = this.refs.author.value
    const parentId = this.props.postId
    this.props.postNewComment(id, timestamp, body, author, parentId)
    writeComment(this.state)
    this.refs.commentForm.reset()
  }
  render() {
    const { postId } = this.props

    return (
      <div>
      <form ref='commentForm' onSubmit={this.handleSubmit}>
      <div>
        <label>
          id:
        </label>
        <input type="text" name='id' ref='id' value={this.state.id} onChange={this.handleChange} />
      </div>
      <div>
        <label>
          timestamp:
        </label>
        <input type="text" name='timestamp' ref='timestamp' value={this.state.timestamp} onChange={this.handleChange} />
      </div>
      <div>
        <label>
          title:
        </label>
        <input type="text" name='body' ref='body' value={this.state.body} onChange={this.handleChange} />
      </div>
      <div>
        <label>
          body:
        </label>
        <input type="text" name='author' ref='author' value={this.state.author} onChange={this.handleChange} />
      </div>
        <RaisedButton primary={true}><input type="submit" value="Submit" /></RaisedButton>
      </form>
      </div>
    )
  }
}
function mapStateToProps(state, props) {
  return {
		comment: state.comment,
	}
}
// export default CommentForm
export default connect(mapStateToProps, { postNewComment })(CommentForm)
