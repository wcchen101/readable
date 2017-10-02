import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { addComment, upVoteScore, downVoteScore } from '../actions'
import CommentForm from './CommentForm'
import { fetchComment, deleteComment, upVoteComment, downVoteComment } from '../utils/readableAPI'
import RaisedButton from 'material-ui/FlatButton';
import './App.css'

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
		this.setState({
			editCommentMode: true,
			editComment: comment,
		})
	}
	onUpVote = (commentId, index) => {
		this.props.upVoteScore(index)
		upVoteComment(commentId)
	}
	onDownVote = (commentId, index) => {
		this.props.downVoteScore(index)
		downVoteComment(commentId)
	}
	render() {
		const { postId, match } = this.props
		const { comment, learnMoreMode } = this.props
		const { editCommentMode } = this.state
		let category = match.url.slice(1, match.url.length - 1)

		console.log('this props', this.props)
		return (
			<div>
					{editCommentMode !== true ? (
						<div>
								<h2>Comment</h2>
								<h4>Number of comment: {comment.length}</h4>
								<div className='comment-container'>
									{comment && (comment.map((item, i) => (
										<div>
											<p>id: {item.id} </p>
											<p>Timestamp: {item.timestamp} </p>
											<p>Body: {item.body} </p>
											<p>Author: {item.author} </p>
											<p>Post Id: {item.parentId} </p>
											<p>Vote Score: {item.voteScore} </p>
											<div className='button-container'>
											<RaisedButton label="Upvote" primary={true} onClick={() => this.onUpVote(item.id, i)}/>
											<RaisedButton label="Downvote" secondary={true} onClick={() => this.onDownVote(item.id, i)}/>
											<RaisedButton label="Delete Comment" secondary={true} onClick={() => this.onDelete(item.id) }/>
											<RaisedButton label="Edit Comment" primary={true} onClick={() => this.onEditComment(item)}></RaisedButton>
											</div>
										</div>
										))
									)
								}
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
					{learnMoreMode === true ? (
						<div>
							<h3>Add New Comment</h3>
							<CommentForm
								postId={postId}
								commentId={this.props.match.params.comment}
							/>
						</div>
					) : (
						<div>
						</div>
					)}
			</div>
		)
	}
}

function mapStateToProps (state, props) {
	if (props.match.params.comment && state.comment.length !== 0) {
		return {
			comment: [state.comment.find(item => item.id === props.match.params.comment)]
		}
	}
	return {
		comment: state.comment,
	}
}
export default connect(mapStateToProps, { addComment, upVoteScore, downVoteScore })(CommentList)
