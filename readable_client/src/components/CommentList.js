import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { addComment } from '../actions'
import CommentForm from './CommentForm'
import { fetchComment, deleteComment } from '../utils/readableAPI'

class CommentList extends React.Component {
	state = {
		comment: null,
	}
	componentWillMount() {
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
		const { comment } = this.state

		console.log('comment', comment)
		console.log('commentlist props', this.props)
		return (
			<div>
				<div>
					<h2>Comment</h2>
					{comment && (comment.map((item) => (
						<div>
							<p>id: {item.id} </p>
							<p>Timestamp: {item.timestamp} </p>
							<p>Body: {item.body} </p>
							<p>Author: {item.author} </p>
							<p>Post Id: {item.parentId} </p>
							<p>Deleted: {item.deleted} </p>
							<button onClick={ () => this.onDelete(item.id) }>Delete</button>
						</div>
					  ))
					)}
				</div>
				<div>
					<h2>Add New Comment</h2>
	        <CommentForm
						postId={postId}
					/>
				</div>
			</div>
		)
	}
}
function mapStateToProps (state, props) {
	console.log('props comment', props.comment)
	if (props.match.params.post && state.post.length !== 0) {
		return {
			comment: [state.comment.find(item => item.id === props.match.params.comment)]
		}
	}
	return {
		comment: state.comment,
	}
}
export default connect(mapStateToProps, { addComment })(CommentList)
