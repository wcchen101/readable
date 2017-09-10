import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'


export function PostList ({ categoryName, post }) {
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

function mapStateToProps(state, props) {
	if (props.params && state.post) {
		return {
			post: state.post.find(item => item.id === props.params.id )
		}
	}
	return {
		post: state.post,
	}
}
export default connect(mapStateToProps)(PostList)
