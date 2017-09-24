import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import CommentList from './CommentList'
import { deletePost } from '../utils/readableAPI'

class PostList extends React.Component {
	componentWillMount() {
    this.props.addPost()
  }
	deletePost = (postId) => {
		console.log('click', postId);
		deletePost(postId)
    window.location.reload()
	}
	render() {
		const { categoryName, post } = this.props
		const { match } =  this.props
		post.sort((a, b) => {
			return b.voteScore - a.voteScore;
		})
		return (
			<div>
				<ul>
				{post && (post.map((item) => (
					<div>
					{categoryName === item['category'] && (
						<div className='postComponent'>
							<button><Link to={`/${item['category']}/${item['id']}/`}>Edit Post</Link></button>
							<button onClick={() => this.deletePost(item['id'])}>Delete Post</button>
							<div className='postList'>
								<p>Post id: { item['id'] }</p>
								<p>Post timestamp: { item['timestamp'] }</p>
								<p>Post title: { item['title'] }</p>
								<p>Category body: { item['body'] }</p>
								<p>Vote Score: { item['voteScore'] }</p>
							</div>
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
		)
	}
}

function mapStateToProps(state, props) {
	console.log('props: ', props)
	console.log('state: ', state)
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
