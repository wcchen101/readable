import React, { Component } from 'react'

export default function PostList ({ post }) {
	return (
		<div>
			<ul>
			{post && (post.map((item) => (
				<li>
					<div>
						<p>Post id: { item['id'] }</p>
						<p>Post timestamp: { item['timestamp'] }</p>
						<p>Post title: { item['title'] }</p>
						<p>Category body: { item['body'] }</p>
					</div>
				</li>
				))
			)}
			</ul>
		</div>
	)
}
