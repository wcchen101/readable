import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default function PostList ({ categoryName, post }) {

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
						<Link to={`/post/${item['id']}`}>Edit</Link>
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
	if (props.params._id) {
		return {
			post: state.post.find(item => item._id === props.params._id )
		}
	}
	return {
		post: null,
	}
}
