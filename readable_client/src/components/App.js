import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCategory } from '../actions'
import { fetchCategories, fetchPosts, writePost  } from '../utils/readableAPI'
import CategoryList from './CategoryList'
import PostList from './PostList'
import PostForm from './PostForm'

class App extends Component {
  state = {
    category: null,
    post: null,
    value: '',
  }

  componentDidMount() {
    fetchCategories().then((category) =>
      this.setState({category: category})
    )
    fetchPosts().then((post) =>
      this.setState({post: post})
    )        
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
    const { category, post } = this.state

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

function mapStateToProps (category, post) {
  return {
    category: category,
    post: post,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    showCategory: (data) => dispatch(addCategory(data),)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
