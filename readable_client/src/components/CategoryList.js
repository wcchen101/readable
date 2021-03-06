import React from 'react'
import PostList from './PostList'
import PostForm from './PostForm'
import { connect } from 'react-redux'
import { addCategory } from '../actions'
import RaisedButton from 'material-ui/FlatButton';
import NotFoundPage from './NotFoundPage'

class CategoryList extends React.Component {
	state = {
		newPostMode: false,
	}
	componentWillMount() {
    this.props.addCategory()
  }
	linkToMainPage = () => {
		const { history } = this.props
		this.setState({
			newPostMode: false,
		})
		history.push(`/`)
	}
	linkToReactPage = () => {
		const { history } = this.props
		history.push(`/react/`)
	}
	linkToReduxPage = () => {
		const { history } = this.props
		history.push(`/redux/`)
	}
	linkToUdacityPage = () => {
		const { history } = this.props
		history.push(`/udacity/`)
	}
	showNewPost() {
		const { history } = this.props
		history.push(`/newpost/`)
	}
	render () {

		const { category } = this.props
		const { match, history } =  this.props
		const { newPostMode } = this.state

		try {
			return (
				<div>
					<div>
						<RaisedButton onClick={() => this.linkToMainPage()}>Main Page</RaisedButton>
						<RaisedButton onClick={() => this.linkToReactPage()}>React</RaisedButton>
						<RaisedButton onClick={() => this.linkToReduxPage()}>Redux</RaisedButton>
						<RaisedButton onClick={() => this.linkToUdacityPage()}>Udacity</RaisedButton>
						<RaisedButton onClick={() => this.showNewPost()}>New Post</RaisedButton>
					</div>
					<div>
						{newPostMode === false ? (
							<div>
								<ul>
								{category !== undefined && match.params.category !== 'newpost' && category && category.length !== 0 && (category.map((item) => (
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
									))
								)}
								</ul>
							</div>
						) : (
							<PostForm
								newPostMode={newPostMode}
								/>
						)}
					</div>
				</div>
			)
		}
		catch (error) {
			return (
				<NotFoundPage/>
			)
		}

	}
}
function mapStateToProps (state, props) {
	if (props.match.params.category && state.category.length !== 0) {
		return {
			category: [state.category.find(item => item.name === props.match.params.category )]
		}
	}
  return {
    category: state.category
  }
}
export default connect(mapStateToProps, { addCategory })(CategoryList)
