import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { addComment } from '../actions'
import CommentForm from './CommentForm'
import CommentUpdateForm from './CommentUpdateForm.js'
import { fetchComment, deleteComment } from '../utils/readableAPI'
import RaisedButton from 'material-ui/FlatButton';

class CommentList extends React.Component {
	state = {
		editCommentMode: false,
		editComment: null,
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
		deleteComment(id)
		fetchComment(this.props.postId).then((comment) =>
			this.setState(() => ({
				comment: comment
			}))
		)
    window.location.reload()
	}
	onEditComment = (comment) => {
		console.log('click on edit', comment)
		this.setState({
			editCommentMode: true,
			editComment: comment,
		})
	}
	render() {
		const { postId, match } = this.props
		const { comment } = this.props
		const { editCommentMode } = this.state
		let category = match.url.slice(1, match.url.length - 1)
		console.log('match comment', this.props.match.params.comment)
		console.log('commentlist props', this.props)
		return (
			<div>
					{editCommentMode !== true ? (
						<div>
								<div>
									<h2>Comment</h2>
									<h4>Number of comment: {comment.length}</h4>
									{comment && (comment.map((item) => (
										<div>
											<p>id: {item.id} </p>
											<p>Timestamp: {item.timestamp} </p>
											<p>Body: {item.body} </p>
											<p>Author: {item.author} </p>
											<p>Post Id: {item.parentId} </p>
											<RaisedButton label="Delete Comment" secondary={true} onClick={() => this.onDelete(item.id) }/>
											<RaisedButton label="Edit Comment" primary={true} onClick={() => this.onEditComment(item)}></RaisedButton>
										</div>
										))
									)}
								</div>
								<div>
									<h3>Add New Comment</h3>
									<CommentForm
										postId={postId}
										commentId={this.props.match.params.comment}
									/>
								</div>
						</div>
					) : (
						<div>
							<h3>Update Comment</h3>
							<CommentForm
							postId={postId}
							commentId={this.props.match.params.comment}
							comment={this.state.editComment}/>
						</div>
					)}

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
