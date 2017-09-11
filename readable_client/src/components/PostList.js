import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import CommentList from './CommentList'

class PostList extends React.Component {
	componentWillMount() {
    this.props.addPost()
  }
	componentWillReceiveProps(nextProps) {
		this.setState({
			post: nextProps.post,
		})
	}
	render() {
		const { categoryName, post } = this.props
		return (
			<div>
				<ul>
				{post && (post.map((item) => (
					<div>
					{categoryName === item['category'] && (
						<div className='postComponent'>
							<div className='postList'>
								<p>Post id: { item['id'] }</p>
								<p>Post timestamp: { item['timestamp'] }</p>
								<p>Post title: { item['title'] }</p>
								<p>Category body: { item['body'] }</p>
								<Link to={`/${item['id']}`}>Edit</Link>
							</div>
							<div>
								<CommentList/>
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
	console.log('props', props)
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
