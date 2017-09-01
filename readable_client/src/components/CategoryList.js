import React, { Component } from 'react'

import * as CategoriesAPI from '../utils/readableAPI'

export default function CategoryList ({ categoryList }) {

	return (
		<div>
			<ul>
			{categoryList.length !== 0 && (categoryList.map((category) => (
				<li>
					<div>
						<p>Name: { category['name'] }</p>
						<p>Category: { category['path'] }</p>
					</div>
				</li>
				))
			)}
			</ul>
		</div>
	)
}
