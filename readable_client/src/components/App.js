import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCategory, addPost } from '../actions'
import CategoryList from './CategoryList'
import PostList from './PostList'
import PostForm from './PostForm'

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
  // handleSubmit(event) {
  //   if (!this.state.value) {
  //     return
  //   }
  //   console.log(this.state.value)
  //   writePost(this.state.value)
  //   event.preventDefault()
  // }
  // handleChange(event) {
  //   console.log(event.target.value)
  //   this.setState({value: event.target.value})
  // }
  // createPost = (e) => {
  //   if (!this.input.value) {
  //     return
  //   }

  //   e.preventDefault()
  //   console.log('post create')
  //   writePost(this.state.value)
  // }

  render() {
    const { category, post } = this.props
    console.log(category)
    console.log(post)
    return (
      <div className="App">
        <div className='categoryList'>
          <h1>Category</h1>
          <CategoryList
            category={category}
          />
          </div>
        <div className='postList'>
          <h1>Post</h1>
          <PostList
            post={post}
          />
          <div classNmae='post'>
            <PostForm/>
          </div>
        </div>
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
