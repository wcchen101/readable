import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost, postUpVoteScore, postDownVoteScore } from '../actions'
import CommentList from './CommentList'
import { deletePost, upVotePost, downVotePost, fetchPost } from '../utils/readableAPI'
import RaisedButton from 'material-ui/FlatButton';
import PostForm from './PostForm'

class PostList extends React.Component {
	state = {
		editPostMode: false,
		learnMoreMode: false,
		editItem: this.props.post,
	}
	componentWillMount() {
    this.props.addPost()
		fetchPost(this.props.postId).then((post) =>
			this.setState(() => ({
				post: post
		}))
	)
  }
	deletePost = (postId) => {
		const { history } = this.props
		deletePost(postId)
		fetchPost(postId).then((post) =>
			this.setState(() => ({
				post: post,
			}))
		)
		history.push(`/`)
	}
	onUpVote = (postId, index) => {
		this.props.postUpVoteScore(index)
		upVotePost(postId)
	}
	onDownVote = (postId, index) => {
		this.props.postDownVoteScore(index)
		downVotePost(postId)
	}
	onEdit = (item) => {
		this.setState({
			editPostMode: true,
			editItem: item,
		})
	}
	changeMode = (item) => {
		const { history } = this.props
		if (this.state.learnMoreMode === true) {
			return
		}
    history.push(`/${item.category}/${item.id}`)
		this.setState({
			learnMoreMode: true,
		})
	}
	sortVoteScore = (post) => {
		let oldPost = this.props.post
		oldPost.sort((a, b) => {
			return b.voteScore - a.voteScore;
		})
		this.setState({
			post: oldPost,
		})
	}
	sortTimeStamp = (post) => {
		let oldPost = this.props.post
		oldPost.sort((a, b) => {
			return b.timestamp - a.timestamp
		})
		this.setState({
			post: oldPost,
		})
	}

	render() {
		const { categoryName, post } = this.props
		const { match } =  this.props
		const { editPostMode, learnMoreMode } = this.state

		return (
			<div>
				<div>
				{editPostMode !== true ? (
					<div>
					<ul>
					{post && (post.map((item, index) => (
						<div>
						{item !== undefined && item && categoryName === item['category'] && (
							<div className='postComponent'>
							{ learnMoreMode !== true ? (
								<div>
								<RaisedButton onClick={() => this.changeMode(item)}>Learn more</RaisedButton>
								</div>
							) : (
								<div>
								<RaisedButton onClick={() => this.onEdit(item)}>Edit Post</RaisedButton>
								<RaisedButton label="Delete Post" secondary={true} onClick={() => this.deletePost(item['id'])}/>
								</div>
							)}
								<div className='postList'>
									<p>Post id: { item['id'] }</p>
									<p>Post timestamp: { item['timestamp'] }</p>
									<p>Post title: { item['title'] }</p>
									<p>Post author: { item['author']}</p>
									<p>Category body: { item['body'] }</p>
									<p>Vote Score: { item['voteScore'] }</p>
								</div>
									<RaisedButton label="Upvote" primary={true} onClick={() => this.onUpVote(item['id'], index)}/>
									<RaisedButton label="Downvote" secondary={true} onClick={() => this.onDownVote(item['id'], index)}/>
									<RaisedButton label="Sort by timestamp" onClick={() => this.sortTimeStamp(item)}/>
									<RaisedButton label="Sort by votescore" onClick={() => this.sortVoteScore(item)}/>
									<div>
										<CommentList
											postId={ item['id'] }
											match={match}
											learnMoreMode={learnMoreMode}
										/>
									</div>
							</div>
						)}
						</div>
						))
					)}
					</ul>
					</div>
				) : (
					<div>
						<PostForm post={this.state.editItem}/>
					</div>
				)}
				</div>
		</div>
		)
	}
}

function mapStateToProps(state, props) {
	if (props.match.params.post && state.post.length !== 0) {
		return {
			post: [state.post.find(item => item.id === props.match.params.post)]
		}
	}
	return {
		post: state.post,
	}
}
export default connect(mapStateToProps, { addPost, postUpVoteScore, postDownVoteScore })(PostList)
