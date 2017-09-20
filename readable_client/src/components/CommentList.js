import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { addComment } from '../actions'
import CommentForm from './CommentForm'
import CommentUpdateForm from './CommentUpdateForm.js'
import { fetchComment, deleteComment } from '../utils/readableAPI'

class CommentList extends React.Component {
	state = {
		comment: null,
	}
	componentWillMount() {
    	this.props.addComment(this.props.postId)
      fetchComment(this.props.postId).then((comment) =>
				this.setState(() => ({
					comment: comment
			}))
		)
  }
	onDelete = (id) => {
		console.log('id', id)
		deleteComment(id)
		fetchComment(this.props.postId).then((comment) =>
			this.setState(() => ({
				comment: comment
			}))
		)
		console.log('comment complete')
	}
	render() {

		const { postId, match } = this.props
		const { comment } = this.props
		let matchComment = undefined
		if (this.props.match.params.comment) {
			matchComment = this.props.match.params.comment
		}
		let category = match.url.slice(1, match.url.length - 1)
		console.log('match comment', this.props.match.params.comment)
		console.log('commentlist props', this.props)
		return (
			<div>
					<div>
					{comment.length !== 0 }
							<div>
								<h2>Comment</h2>
								{comment && (comment.map((item) => (
									<div>
										<p>id: {item.id} </p>
										<p>Timestamp: {item.timestamp} </p>
										<p>Body: {item.body} </p>
										<p>Author: {item.author} </p>
										<p>Post Id: {item.parentId} </p>
										<button onClick={() => this.onDelete(item.id) }>Delete</button>
										<button><Link to={`/${category}/${postId}/${item.id}/`}>Edit Comment</Link></button>
									</div>
									))
								)}
							</div>
							{matchComment === undefined ? (
								<div>
									<h2>Add New Comment</h2>
									<CommentForm
										postId={postId}
										commentId={this.props.match.params.comment}
									/>
								</div>
							) : (
								<div>
									<h2>Update Comment</h2>
									<CommentUpdateForm
										comment={comment}
									/>
								</div>
							)}
						</div>
			</div>
		)
	}
}
function mapStateToProps (state, props) {
	console.log('props comment', props.comment)
	if (props.match.params.comment && state.comment.length !== 0) {
		return {
			comment: [state.comment.find(item => item.id === props.match.params.comment)]
		}
	}
	return {
		comment: state.comment,
	}
}
export default connect(mapStateToProps, { addComment })(CommentList)
