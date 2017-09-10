import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost } from '../actions'

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
							<div>
								<p>Post id: { item['id'] }</p>
								<p>Post timestamp: { item['timestamp'] }</p>
								<p>Post title: { item['title'] }</p>
								<p>Category body: { item['body'] }</p>
								<Link to={`post/${item['id']}`}>Edit</Link>
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
	// if (props.params && state.post) {
	// 	return {
	// 		post: state.post.find(item => item.category === props.params.categoryName )
	// 	}
	// }
	return {
		post: state.post,
	}
}
export default connect(mapStateToProps, { addPost })(PostList)
