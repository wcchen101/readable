import React, { Component } from 'react'
import PostList from './PostList'
import PostForm from './PostForm'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { addCategory } from '../actions'

class CategoryList extends React.Component {
  // state = {
	// 	category: this.props.category ? this.props.category : '',
	// }

	componentWillMount() {
    this.props.addCategory()
  }

	render () {
		const { category } = this.props
		console.log(this.props.match.params.category)
		return (
			<div>
				<ul>
				{category && category.length !== 0 && (category.map((item) => (
					<Route path='' render={() => (
						<div>
							<div>
								<p>Category name: { item['name'] }</p>
								<p>Category path: { item['path'] }</p>
							</div>
							<div className='postList'>
		            <h1>Post</h1>
		            <PostList
									categoryName = {item['name']}
		            />
		            <div classNmae='post'>
		              <PostForm/>
		            </div>
		          </div>
						</div>
					)}/>
					))
				)}
				</ul>
			</div>
		)
	}
}
CategoryList.propTypes = {
  category: React.PropTypes.array.isRequired,
  addCategory: React.PropTypes.func.isRequired,
}

function mapStateToProps (state, props) {
	console.log(state.category)
	if (props.match.params.category && state.category.length !== 0) {
		return {
			category: [state.category.find(item => item.name === props.match.params.category )]
		}
	}
  return {
    category: state.category,
  }

}
function mapDispatchToProps(dispatch) {
  return {
    // addCategory: () => dispatch(fetchCategories()),
  }
}
export default connect(mapStateToProps, { addCategory })(CategoryList)
