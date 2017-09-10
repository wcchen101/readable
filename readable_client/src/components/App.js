import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCategory, addPost } from '../actions'
import CategoryList from './CategoryList'
import PostList from './PostList'
import PostForm from './PostForm'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class App extends Component {
  componentDidMount() {
    this.props.addCategory()
    this.props.addPost()
    // fetchCategories().then((category) =>
    //   this.setState({category: category})
    // )
    // fetchPosts().then((post) =>
    //   this.setState({post: post})
    // )
  }

  render() {
    const { category, post } = this.props
    console.log(category)
    console.log(post)
    return (
      <div className="App">
        <Route exact path='/' render={() => (
            <div className='categoryList'>
              <h1>Category</h1>
              <CategoryList
                category={category}
                post={post}
              />
            </div>

        )
      }/>
        <Route exact path='/post' render={() => (
          <div className='postList'>
            <h1>Post</h1>
            <PostList
              post={post}
            />
            <div classNmae='post'>
              <PostForm/>
            </div>
          </div>
        )
      }/>

      </div>
    )
  }
}

App.propTypes = {
  category: React.PropTypes.array.isRequired,
  addCategory: React.PropTypes.func.isRequired,
}

function mapStateToProps (state) {
  return {
    category: state.category,
    post: state.post
  }
}
function mapDispatchToProps(dispatch) {
  return {
    // addCategory: () => dispatch(fetchCategories()),
  }
}
// export function addCategory() {
// 	return dispatch => {
// 		fetch(`${api}/categories`, { headers, method: 'GET' })
// 		.then(res => res.json())
// 		.then(data => dispatch(setCategory(data)));
// 	}
// }
export default connect(mapStateToProps, { addCategory, addPost })(App)
