import React from 'react'
import { writePost } from '../utils/readableAPI'
import { connect } from 'react-redux'
import { postNewPost } from '../actions'

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
		const { history } = this.props
    let categoryCheck = this.state.category
    if (categoryCheck !== 'react' && categoryCheck !== 'redux' && categoryCheck !== 'udacity') {
      window.alert('No match cateogry, Please enter new one')
      return
    }
    const id = this.refs.id.value
    const timestamp = this.refs.timestamp.value
    const title = this.refs.title.value
    const body = this.refs.body.value
    const author = this.refs.author.value
    const category = this.state.category
    this.props.postNewPost(id, timestamp, title, body, author, category)
    writePost(this.state)
    this.refs.postForm.reset()
    if (history) {
      history.push('/' + category)
    }
  }
  render() {
    return (
      <div>
      <form ref='postForm' onSubmit={this.handleSubmit}>
      <div>
				<h3>New Post</h3>
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
        <input type="text" name='title' ref='title' value={this.state.title} onChange={this.handleChange} />
      </div>
      <div>
        <label>
          body:
        </label>
        <input type="text" name='body' ref='body' value={this.state.body}  onChange={this.handleChange} />
      </div>
      <div>
        <label>
          author:
        </label>
          <input type="text" name='author' ref='author' value={this.state.author}  onChange={this.handleChange} />
      </div>
      <div>
        <label>
          category:
        </label>
        <select name='category' ref='category' value={this.state.category} onChange={this.handleChange}>
          <option value='none'>None</option>
          <option value='react'>React</option>
          <option value='redux'>Redux</option>
          <option value='udacity'>Udacity</option>
        </select>
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
export default connect(mapStateToProps, { postNewPost })(PostForm)
