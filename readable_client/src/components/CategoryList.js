import React, { Component } from 'react'
import PostList from './PostList'
import PostForm from './PostForm'

export default function CategoryList ({ category, post }) {
	return (
		<div>
			<ul>
			{category && (category.map((item) => (
				<li>
					<div>
						<p>Category name: { item['name'] }</p>
						<p>Category path: { item['path'] }</p>
					</div>
					<div className='postList'>
            <h1>Post</h1>
            <PostList
							categoryName = {item['name']}
              post={post}
            />
            <div classNmae='post'>
              <PostForm/>
            </div>
          </div>
				</li>
				))
			)}
			</ul>

		</div>
	)
}
