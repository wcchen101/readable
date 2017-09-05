import React, { Component } from 'react'

export default function CategoryList ({ category }) {
	return (
		<div>
			<ul>
			{category && (category.map((item) => (
				<li>
					<div>
						<p>Category name: { item['name'] }</p>
						<p>Category path: { item['path'] }</p>
					</div>
				</li>
				))
			)}
			</ul>
		</div>
	)
}
