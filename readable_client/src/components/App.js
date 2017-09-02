import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCategory } from '../actions'
import { fetchCategories, fetchPosts  } from '../utils/readableAPI'
import { CategoryList } from './CategoryList'

class App extends Component {
  state = {
    category: null,
    posts: null,
  }

  componentDidMount() {
    fetchCategories().then((category) =>
      this.setState({category: category})
    )
    fetchPosts().then((posts) =>
      this.setState({posts: posts})
    )        
  }
  // getCategoryList = (e) => {
  //   e.preventDefault()
  //   fetchCategories().then((category) =>
  //     this.setState({category: category}))
  // }

  // getPostList = (e) => {
  //   e.preventDefault()
  //   fetchPosts().then((posts) =>
  //     this.setState({posts: posts})
  //   )
  // }

  render() {
    const { category } = this.state
    console.log('props', this.props)
    console.log(this.state.category)
    console.log(this.state.posts)
    this.getCategoryList
    this.getPostList
    return (
      <div className="App">
        <CategoryList
          category={category}
        />
      </div>
    )
  }
}

function mapStateToProps () {
  return {
    abc: 'abc',
  }
}

function mapDispatchToProps (dispatch) {
  return {
    showCategory: (data) => dispatch(addCategory(data),)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
