import React, { Component } from 'react'
import PostList from './PostList'
import PostForm from './PostForm'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { addCategory, addPost } from '../actions'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/FlatButton';


class CategoryList extends React.Component {
	componentWillMount() {
    this.props.addCategory()
  }
	linkToMainPage = () => {
		const { history } = this.props
		history.push(`/`)
	}
	linkToMainPage = () => {
		const { history } = this.props
		history.push(`/react/`)
	}
	linkToMainPage = () => {
		const { history } = this.props
		history.push(`/redux/`)
	}
	linkToMainPage = () => {
		const { history } = this.props
		history.push(`/udacity/`)
	}

	render () {
		const { category } = this.props
		const { match, history } =  this.props
		const { comment } = this.props.match.params

		return (
			<div>
					<div>
						<RaisedButton onClick={() => this.linkToMainPage()}>Main Page</RaisedButton>
	          <RaisedButton onClick={() => this.linkToMainPage()}>React</RaisedButton>
	          <RaisedButton onClick={() => this.linkToMainPage()}>Redux</RaisedButton>
	          <RaisedButton onClick={() => this.linkToMainPage()}>Udacity</RaisedButton>
	          <RaisedButton href='#addNewPost'>New Post</RaisedButton>
						<ul>
						{category && category.length !== 0 && (category.map((item) => (
							<Route path='' render={() => (
								<div>
									<h1>Category</h1>
									<div>
										<p>Category name: { item['name'] }</p>
										<p>Category path: { item['path'] }</p>
									</div>
									<div className='postList'>
										<h1>Post</h1>
										<PostList
											categoryName = {item['name']}
											match = {match}
											history={history}
										/>
									</div>
								</div>
							)}/>
							))
						)}
						</ul>
						<div id='addNewPost'>
							<h3> Add new post</h3>
							<PostForm/>
						</div>
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
  }
}
export default connect(mapStateToProps, { addCategory })(CategoryList)
