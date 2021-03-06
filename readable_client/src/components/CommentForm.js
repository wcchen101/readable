import React from 'react'
import { writeComment, updateComment } from '../utils/readableAPI'
import { connect } from 'react-redux'
import { postNewComment, addComment, removeComment } from '../actions'

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
  omponentWillMount() {
    this.props.addComment(this.props.postId)
  }
  handleSubmit = (e) => {
    const { history, category, editMode } = this.props
    e.preventDefault()
    let id = this.state.id
    if (editMode !== true) {
      id = this.refs.id.value
    }
    const timestamp = this.refs.timestamp.value
    const body = this.refs.body.value
    const author = this.refs.author.value
    const parentId = this.props.postId
    if (editMode === true) {
  		updateComment(id, timestamp, body, author)
    }
    else {
      this.props.postNewComment(id, timestamp, body, author, parentId)
      writeComment(this.state)
    }
    this.refs.commentForm.reset()
    this.setState({
      id: '',
      timestamp: '',
      body: '',
      author: '',
      parentId: this.props.postId,
    })
    if (editMode === true) {
      history.push('/' + category + '/')
    }
  }
  render() {
    const { editMode } = this.props
    return (
      <div>
      <form onSubmit={this.handleSubmit} ref='commentForm'>
      {editMode !== true ? (
        <div>
          <label>
            id:
          </label>
          <input type="text" name='id' ref='id' value={this.state.id} onChange={this.handleChange} />
        </div>
      ) : (
        <div>
        </div>
      )}
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
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}
function mapStateToProps(state, props) {
  return {
	}
}
export default connect(mapStateToProps, { postNewComment, addComment, removeComment})(CommentForm)
