import React, { Component } from 'react'

export default function CategoryList ({ category }) {
	return (
		<div>
			<ul>
			{category.length !== 0 && (category.map((item) => (
				<li>
					<div>
						<p>Name: { item['name'] }</p>
						<p>Category: { item['path'] }</p>
					</div>
				</li>
				))
			)}
			</ul>
		</div>
	)
}
