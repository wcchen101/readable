import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost } from '../actions'
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
		console.log('delete', postId)
		deletePost(postId)
		fetchPost(postId).then((post) =>
			this.setState(() => ({
				post: post,
			}))
		)
    window.location.reload()
	}
	onUpVote = (postId) => {
		upVotePost(postId)
    window.location.reload()
	}
	onDownVote = (postId) => {
		downVotePost(postId)
    window.location.reload()
	}
	onEdit = (item) => {
		this.setState({
			editPostMode: true,
			editItem: item,
		})
	}
	changeMode = (e) => {
		if (this.state.learnMoreMode === true) {
			return
		}
		console.log('change mode')
		this.setState({
			learnMoreMode: true,
		})
	}
	render() {
		const { categoryName, post } = this.props
		const { match } =  this.props
		const { editPostMode, learnMoreMode } = this.state
		post.sort((a, b) => {
			return b.voteScore - a.voteScore;
		})
		return (
			<div>

				<div>
				{editPostMode !== true ? (
					<div>
					<ul>
					{post && (post.map((item) => (
						<div>
						{categoryName === item['category'] && (
							<div className='postComponent'>
							{ learnMoreMode !== true ? (
								<div>
								<RaisedButton onClick={() => this.changeMode()}><Link to={`/${item['category']}/${item['id']}`}>Learn more</Link></RaisedButton>
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
									<p>Category body: { item['body'] }</p>
									<p>Vote Score: { item['voteScore'] }</p>
								</div>

									<RaisedButton label="Upvote" primary={true} onClick={() => this.onUpVote(item['id'])}/>
									<RaisedButton label="Downvote" secondary={true} onClick={() => this.onDownVote(item['id'])}/>
									<div>
										<CommentList
											postId={ item['id'] }
											match={match}
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
export default connect(mapStateToProps, { addPost })(PostList)
