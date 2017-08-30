import React, { Component } from 'react'

import * as CategoriesAPI from '../utils/readableAPI'

class Categories extends Component {
	state = {
		categories: []
	}

	componentDidMount() {
		CategoriesAPI.getAllCategories().then((categories) => {
			this.setState({categories})
		})
	}
	render() {
		const { categories } = this.state
		console.log(Object.values(categories))
		return (
			<div>
				<ul>
				{categories.length !== 0 && (categories.map((category) => (
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
}

export default Categories