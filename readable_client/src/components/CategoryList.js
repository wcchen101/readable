import React, { Component } from 'react'
import PostList from './PostList'
import PostForm from './PostForm'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { addCategory, addPost } from '../actions'

class CategoryList extends React.Component {

	componentWillMount() {
    this.props.addCategory()
  }

	render () {
		const { category } = this.props
		const { match } =  this.props
		const { comment } = this.props.match.params
		console.log('category: ', this.props.match.params)
		return (
			<div>
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
											match = {match}
										/>
										<div className='post'>
											<h2> Add new post</h2>
											<PostForm/>
										</div>
									</div>
								</div>
							)}/>
							))
						)}
						</ul>
					</div>
			</div>
		)
	}
}
CategoryList.propTypes = {
  category: React.PropTypes.array.isRequired,
  addCategory: React.PropTypes.func.isRequired,
}

function mapStateToProps (state, props) {
	console.log('category props', props)
	if (props.match.params.category && state.category.length !== 0) {
		return {
			category: [state.category.find(item => item.name === props.match.params.category )]
		}
	}
  return {
    category: state.category
  }
}
function mapDispatchToProps(dispatch) {
  return {
    // addCategory: () => dispatch(fetchCategories()),
  }
}
export default connect(mapStateToProps, { addCategory })(CategoryList)
